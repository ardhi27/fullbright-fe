/**
 * Permission Types
 * Tipe data untuk sistem permission
 */

/** Role pengguna */
export type UserRole = 'admin' | 'teacher' | 'student';

/** Permission yang tersedia */
export type PermissionName =
  // Student permissions
  | 'exam:take'
  | 'exam:view_result'
  | 'dashboard:view'
  // Teacher permissions
  | 'student:view'
  | 'student:view_detail'
  | 'exam:validate'
  // Admin permissions
  | 'question:create'
  | 'question:edit'
  | 'question:delete'
  | 'question:view'
  | 'package:create'
  | 'package:edit'
  | 'package:delete'
  | 'package:view'
  | 'package:publish'
  | 'user:manage'
  | 'permission:manage';

/** Permission definition */
export interface Permission {
  id: string;
  name: PermissionName;
  description: string;
}

/** User dengan role */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/** Role dengan permission */
export interface RolePermission {
  role: UserRole;
  permissions: PermissionName[];
}

/** Permission context state */
export interface PermissionState {
  user: User | null;
  permissions: PermissionName[];
  isLoading: boolean;
  error: string | null;
}

/** Default permissions per role */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, PermissionName[]> = {
  student: [
    'exam:take',
    'exam:view_result',
    'dashboard:view',
  ],
  teacher: [
    'student:view',
    'student:view_detail',
    'exam:validate',
    'question:view',
    'package:view',
    'dashboard:view',
  ],
  admin: [
    // All permissions
    'exam:take',
    'exam:view_result',
    'dashboard:view',
    'student:view',
    'student:view_detail',
    'exam:validate',
    'question:create',
    'question:edit',
    'question:delete',
    'question:view',
    'package:create',
    'package:edit',
    'package:delete',
    'package:view',
    'package:publish',
    'user:manage',
    'permission:manage',
  ],
};
