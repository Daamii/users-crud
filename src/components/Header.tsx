import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiPlus } from "../icons";
import "./Header.scss";
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
        <Link to="/" className="app-header__title">
          <h1>{t("users.list.title")}</h1>
        </Link>
        <div className="app-header__actions">
          <LanguageSelector />
          <ThemeToggle />
          {showCreateButton && (
            <Link to="/create" className="app-header__create-btn">
              <FiPlus size={18} /> {t("users.list.create")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
