import { useTranslation } from "react-i18next";
import { FaEdit } from "../icons";
import { User } from "../types/user";
import { KeepSearchParamsLink } from "./KeepSearchParamsLink";

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
          <tr key={user.id}>
            <td>
              <KeepSearchParamsLink to={`/user/${user.id}`}>
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="user-list__table-avatar"
                />
              </KeepSearchParamsLink>
            </td>
            <td>
              <KeepSearchParamsLink to={`/user/${user.id}`}>
                {user.firstName} {user.lastName}
              </KeepSearchParamsLink>
            </td>
            <td>
              <KeepSearchParamsLink to={`/user/${user.id}`}>
                {user.email}
              </KeepSearchParamsLink>
            </td>
            <td>
              <KeepSearchParamsLink to={`/user/${user.id}`}>
                {user.phone}
              </KeepSearchParamsLink>
            </td>
            <td>
              <span
                className={`user-card__role user-card__role--${user.role.toLowerCase()}`}
              >
                {t(`users.roles.${user.role}`)}
              </span>
            </td>
            <td>
              <KeepSearchParamsLink
                to={`/user/${user.id}/edit`}
                className="user-list__table-edit"
                title={t("users.detail.edit")}
              >
                <FaEdit size={16} />
              </KeepSearchParamsLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
