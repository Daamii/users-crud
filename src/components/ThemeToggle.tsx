import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { FiMoon, FiSun } from "../icons";
import "./ThemeToggle.scss";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={theme === "light" ? t("theme.dark") : t("theme.light")}
    >
      {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}
