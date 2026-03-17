import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "../icons";
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
      {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  );
}
