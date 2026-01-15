import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { User, UserRole, PermissionName, PermissionState, DEFAULT_ROLE_PERMISSIONS } from '@fullbright/types/permission';
import { getSupabase } from '@fullbright/lib/supabase';

interface PermissionContextValue extends PermissionState {
  /** Check if user has specific permission */
  hasPermission: (permission: PermissionName) => boolean;
  /** Check if user has any of the permissions */
  hasAnyPermission: (permissions: PermissionName[]) => boolean;
  /** Check if user has all of the permissions */
  hasAllPermissions: (permissions: PermissionName[]) => boolean;
  /** Check if user has specific role */
  hasRole: (role: UserRole) => boolean;
  /** Get all permissions for current user */
  getPermissions: () => PermissionName[];
  /** Refresh permissions from server */
  refreshPermissions: () => Promise<void>;
  /** Set user manually (for testing or SSO) */
  setUser: (user: User | null) => void;
}

const PermissionContext = createContext<PermissionContextValue | undefined>(undefined);

interface PermissionProviderProps {
  children: ReactNode;
  /** Default role permissions mapping */
  defaultRolePermissions?: Record<UserRole, PermissionName[]>;
  /** Custom function to fetch permissions from server */
  fetchPermissions?: (userId: string) => Promise<PermissionName[]>;
}

export function PermissionProvider({
  children,
  defaultRolePermissions,
  fetchPermissions,
}: PermissionProviderProps) {
  const [state, setState] = useState<PermissionState>({
    user: null,
    permissions: [],
    isLoading: true,
    error: null,
  });

  // Get permissions based on role
  const getPermissionsForRole = useCallback((role: UserRole): PermissionName[] => {
    if (defaultRolePermissions) {
      return defaultRolePermissions[role] || [];
    }
    // Default fallback
    const defaults: Record<UserRole, PermissionName[]> = {
      student: ['exam:take', 'exam:view_result', 'dashboard:view'],
      teacher: ['student:view', 'student:view_detail', 'exam:validate', 'question:view', 'package:view', 'dashboard:view'],
      admin: [
        'exam:take', 'exam:view_result', 'dashboard:view',
        'student:view', 'student:view_detail', 'exam:validate',
        'question:create', 'question:edit', 'question:delete', 'question:view',
        'package:create', 'package:edit', 'package:delete', 'package:view', 'package:publish',
        'user:manage', 'permission:manage',
      ],
    };
    return defaults[role] || [];
  }, [defaultRolePermissions]);

  // Load permissions from server or use role-based defaults
  const loadPermissions = useCallback(async (userId: string, role: UserRole) => {
    try {
      let permissions: PermissionName[];

      if (fetchPermissions) {
        permissions = await fetchPermissions(userId);
      } else {
        // Use role-based default permissions
        permissions = getPermissionsForRole(role);
      }

      setState(prev => ({
        ...prev,
        permissions,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        permissions: getPermissionsForRole(role), // Fallback to defaults
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load permissions',
      }));
    }
  }, [fetchPermissions, getPermissionsForRole]);

  // Initialize - check for existing auth session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabase = getSupabase();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          // Fetch user role from database
          const { data: userData, error } = await supabase
            .from('users')
            .select('id, email, role, created_at, updated_at')
            .eq('id', session.user.id)
            .single();

          if (userData && !error) {
            const user: User = {
              id: userData.id,
              email: userData.email,
              role: userData.role as UserRole,
              createdAt: userData.created_at,
              updatedAt: userData.updated_at,
            };
            setState(prev => ({ ...prev, user }));
            await loadPermissions(user.id, user.role);
          } else {
            // User not in database, default to student
            const user: User = {
              id: session.user.id,
              email: session.user.email || '',
              role: 'student',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setState(prev => ({ ...prev, user, isLoading: false }));
            await loadPermissions(user.id, user.role);
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Auth initialization failed',
        }));
      }
    };

    initAuth();

    // Listen for auth changes
    try {
      const supabase = getSupabase();
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const { data: userData } = await supabase
              .from('users')
              .select('id, email, role, created_at, updated_at')
              .eq('id', session.user.id)
              .single();

            if (userData) {
              const user: User = {
                id: userData.id,
                email: userData.email,
                role: userData.role as UserRole,
                createdAt: userData.created_at,
                updatedAt: userData.updated_at,
              };
              setState(prev => ({ ...prev, user }));
              await loadPermissions(user.id, user.role);
            }
          } else if (event === 'SIGNED_OUT') {
            setState({
              user: null,
              permissions: [],
              isLoading: false,
              error: null,
            });
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Supabase not initialized, skip auth listener
    }
  }, [loadPermissions]);

  // Permission check functions
  const hasPermission = useCallback((permission: PermissionName): boolean => {
    return state.permissions.includes(permission);
  }, [state.permissions]);

  const hasAnyPermission = useCallback((permissions: PermissionName[]): boolean => {
    return permissions.some(p => state.permissions.includes(p));
  }, [state.permissions]);

  const hasAllPermissions = useCallback((permissions: PermissionName[]): boolean => {
    return permissions.every(p => state.permissions.includes(p));
  }, [state.permissions]);

  const hasRole = useCallback((role: UserRole): boolean => {
    return state.user?.role === role;
  }, [state.user]);

  const getPermissions = useCallback((): PermissionName[] => {
    return [...state.permissions];
  }, [state.permissions]);

  const refreshPermissions = useCallback(async () => {
    if (state.user) {
      setState(prev => ({ ...prev, isLoading: true }));
      await loadPermissions(state.user.id, state.user.role);
    }
  }, [state.user, loadPermissions]);

  const setUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user }));
    if (user) {
      loadPermissions(user.id, user.role);
    } else {
      setState(prev => ({ ...prev, permissions: [] }));
    }
  }, [loadPermissions]);

  const value: PermissionContextValue = {
    ...state,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    getPermissions,
    refreshPermissions,
    setUser,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext(): PermissionContextValue {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissionContext must be used within a PermissionProvider');
  }
  return context;
}

export { PermissionContext };
