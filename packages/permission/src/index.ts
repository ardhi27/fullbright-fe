// Context
export { PermissionProvider, usePermissionContext, PermissionContext } from './context/PermissionContext';

// Hooks
export {
  usePermission,
  useAnyPermission,
  useAllPermissions,
  useRole,
  useGetPermissions,
  useCurrentUser,
  useRefreshPermissions,
} from './hooks';

// Components
export { PermissionGate, withPermission, withRole } from './components/PermissionGate';

// Re-export types for convenience
export type {
  User,
  UserRole,
  PermissionName,
  Permission,
  RolePermission,
  PermissionState,
} from '@fullbright/types/permission';

export { DEFAULT_ROLE_PERMISSIONS } from '@fullbright/types/permission';
