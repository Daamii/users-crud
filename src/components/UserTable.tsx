import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaEdit } from "../icons";
import { User } from "../types/user";

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const { t } = useTranslation();

  return (
    <table>
      <thead>
        <tr>
          <th>{t("users.list.table.avatar")}</th>
          <th>{t("users.list.table.name")}</th>
          <th>{t("users.list.table.email")}</th>
          <th>{t("users.list.table.phone")}</th>
          <th>{t("users.list.table.role")}</th>
          <th>{t("users.list.table.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            onClick={() => (window.location.href = `/user/${user.id}`)}
          >
            <td>
              <img
                src={user.avatar}
                alt={user.firstName}
                className="user-list__table-avatar"
              />
            </td>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <span
                className={`user-card__role user-card__role--${user.role.toLowerCase()}`}
              >
                {t(`users.roles.${user.role}`)}
              </span>
            </td>
            <td onClick={(e) => e.stopPropagation()}>
              <Link
                to={`/user/${user.id}/edit`}
                className="user-list__table-edit"
                title={t("users.detail.edit")}
              >
                <FaEdit size={16} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
