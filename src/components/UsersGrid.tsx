import { forwardRef } from "react";
import { User } from "../types/user";
import { UserCard } from "./UserCard";
import "./UsersGrid.scss";

interface UsersGridProps {
  users: User[];
  hasOverflowBottom?: boolean;
}

export const UsersGrid = forwardRef<HTMLDivElement, UsersGridProps>(
  ({ users, hasOverflowBottom }, ref) => (
    <div
      ref={ref}
      className={`users-grid ${hasOverflowBottom ? "users-grid--overflow-bottom" : ""}`}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  ),
);

UsersGrid.displayName = "UsersGrid";
