export type UserRole = 'admin' | 'staff';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
}
