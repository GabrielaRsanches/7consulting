export type Guid = string;

export interface User {
  id: Guid;
  name: string;
}

export interface UserDetailsProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}
