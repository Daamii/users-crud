import { useTranslation } from "react-i18next";
import { FiGlobe } from "../icons";
import "./LanguageSelector.scss";

const languages = [
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "en", flag: "🇬🇧", label: "EN" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="language-selector">
      <FiGlobe size={18} />
      <div className="language-selector__flags">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`language-selector__btn ${i18n.language === lang.code ? "language-selector__btn--active" : ""}`}
            title={lang.code === "es" ? "Español" : "English"}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    </div>
  );
}
