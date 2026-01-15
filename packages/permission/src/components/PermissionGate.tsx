import React, { ReactNode } from 'react';
import type { PermissionName, UserRole } from '@fullbright/types/permission';
import { usePermission, useAnyPermission, useAllPermissions, useRole } from '../hooks/usePermission';

interface PermissionGateProps {
  children: ReactNode;
  /** Single permission to check */
  permission?: PermissionName;
  /** Multiple permissions - user needs ANY of these */
  anyPermission?: PermissionName[];
  /** Multiple permissions - user needs ALL of these */
  allPermissions?: PermissionName[];
  /** Role to check */
  role?: UserRole;
  /** Fallback component when permission denied */
  fallback?: ReactNode;
}

/**
 * Component untuk membatasi akses berdasarkan permission
 *
 * @example
 * // Single permission
 * <PermissionGate permission="question:create">
 *   <CreateQuestionButton />
 * </PermissionGate>
 *
 * @example
 * // Any permission
 * <PermissionGate anyPermission={['question:edit', 'question:delete']}>
 *   <ManageQuestionsPanel />
 * </PermissionGate>
 *
 * @example
 * // Role-based
 * <PermissionGate role="admin">
 *   <AdminPanel />
 * </PermissionGate>
 */
export function PermissionGate({
  children,
  permission,
  anyPermission,
  allPermissions,
  role,
  fallback = null,
}: PermissionGateProps) {
  // Check single permission
  const hasSinglePermission = permission ? usePermission(permission) : true;

  // Check any permission
  const hasAny = anyPermission ? useAnyPermission(anyPermission) : true;

  // Check all permissions
  const hasAll = allPermissions ? useAllPermissions(allPermissions) : true;

  // Check role
  const hasRequiredRole = role ? useRole(role) : true;

  // All conditions must pass
  const hasAccess = hasSinglePermission && hasAny && hasAll && hasRequiredRole;

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Higher-order component untuk permission check
 */
export function withPermission<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  permission: PermissionName,
  FallbackComponent?: React.ComponentType
) {
  return function WithPermissionComponent(props: P) {
    return (
      <PermissionGate
        permission={permission}
        fallback={FallbackComponent ? <FallbackComponent /> : null}
      >
        <WrappedComponent {...props} />
      </PermissionGate>
    );
  };
}

/**
 * Higher-order component untuk role check
 */
export function withRole<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  role: UserRole,
  FallbackComponent?: React.ComponentType
) {
  return function WithRoleComponent(props: P) {
    return (
      <PermissionGate
        role={role}
        fallback={FallbackComponent ? <FallbackComponent /> : null}
      >
        <WrappedComponent {...props} />
      </PermissionGate>
    );
  };
}
