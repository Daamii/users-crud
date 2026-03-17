import { useTranslation } from "react-i18next";
import { PlusIcon } from "../icons";
import "./Header.scss";
import { KeepSearchParamsLink } from "./KeepSearchParamsLink";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

export function Header({
  showCreateButton = true,
}: {
  showCreateButton?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <div className="app-header__content">
        <KeepSearchParamsLink to="/" className="app-header__title">
          <h1>{t("users.list.title")}</h1>
        </KeepSearchParamsLink>
        <div className="app-header__actions">
          <LanguageSelector />
          <ThemeToggle />
          {showCreateButton && (
            <KeepSearchParamsLink
              to="/create"
              className="app-header__create-btn"
            >
              <PlusIcon size={18} /> {t("users.list.create")}
            </KeepSearchParamsLink>
          )}
        </div>
      </div>
    </header>
  );
}
