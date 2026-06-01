export type UserRole = "user" | "premium" | "support" | "editor" | "analyst" | "admin" | "super_admin";

export const adminRoles: UserRole[] = ["admin", "super_admin"];

export function canAccessAdmin(role?: string | null) {
  return role === "admin" || role === "super_admin";
}
