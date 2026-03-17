import { useTranslation } from "react-i18next";
import { FaEdit } from "../icons";
import { User } from "../types/user";
import { KeepSearchParamsLink } from "./KeepSearchParamsLink";
import "./UserCard.scss";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="user-card">
      <KeepSearchParamsLink to={`/user/${user.id}`} className="user-card__link">
        <img
          src={user.avatar}
          alt={user.firstName}
          className="user-card__avatar"
        />
        <div className="user-card__info">
          <h2 className="user-card__name">
            {user.firstName} {user.lastName}
          </h2>
          <p className="user-card__email">{user.email}</p>
          <p className="user-card__phone">{user.phone}</p>
          <span
            className={`user-card__role user-card__role--${user.role.toLowerCase()}`}
          >
            {t(`users.roles.${user.role}`)}
          </span>
        </div>
      </KeepSearchParamsLink>
      <KeepSearchParamsLink
        to={`/user/${user.id}/edit`}
        className="user-card__edit"
        title={t("users.detail.edit")}
      >
        <FaEdit size={18} />
      </KeepSearchParamsLink>
    </div>
  );
};
