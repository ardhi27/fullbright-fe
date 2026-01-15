import { useMemo } from 'react';
import { usePermissionContext } from '../context/PermissionContext';
import type { PermissionName, UserRole } from '@fullbright/types/permission';

/**
 * Hook untuk mengecek permission
 */
export function usePermission(permission: PermissionName): boolean {
  const { hasPermission } = usePermissionContext();
  return useMemo(() => hasPermission(permission), [hasPermission, permission]);
}

/**
 * Hook untuk mengecek multiple permissions (any)
 */
export function useAnyPermission(permissions: PermissionName[]): boolean {
  const { hasAnyPermission } = usePermissionContext();
  return useMemo(() => hasAnyPermission(permissions), [hasAnyPermission, permissions]);
}

/**
 * Hook untuk mengecek multiple permissions (all)
 */
export function useAllPermissions(permissions: PermissionName[]): boolean {
  const { hasAllPermissions } = usePermissionContext();
  return useMemo(() => hasAllPermissions(permissions), [hasAllPermissions, permissions]);
}

/**
 * Hook untuk mengecek role
 */
export function useRole(role: UserRole): boolean {
  const { hasRole } = usePermissionContext();
  return useMemo(() => hasRole(role), [hasRole, role]);
}

/**
 * Hook untuk mendapatkan semua permissions
 */
export function useGetPermissions(): PermissionName[] {
  const { getPermissions } = usePermissionContext();
  return useMemo(() => getPermissions(), [getPermissions]);
}

/**
 * Hook untuk mendapatkan user saat ini
 */
export function useCurrentUser() {
  const { user, isLoading, error } = usePermissionContext();
  return { user, isLoading, error };
}

/**
 * Hook untuk refresh permissions
 */
export function useRefreshPermissions() {
  const { refreshPermissions } = usePermissionContext();
  return refreshPermissions;
}
