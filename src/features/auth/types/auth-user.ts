import type { UserRole } from "@/features/users/types/user";

export interface AuthUser {
  id: string;
  loginId: string;
  name: string;
  nickname: string;
  role: UserRole;
}