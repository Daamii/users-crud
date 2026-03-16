import { useState } from "react";
import { generateRandomAvatars } from "../utils";

interface AvatarSelectorProps {
  label: string;
  name: string;
  value: string;
  onChange: (file: File | null, preview: string) => void;
  error?: string;
}

export function AvatarSelector({
  label,
  name,
  value,
  onChange,
  error,
}: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrls, setAvatarUrls] = useState(() => generateRandomAvatars(12));

  const handleRefresh = () => {
    setAvatarUrls(generateRandomAvatars(12));
  };

  const handleSelect = (url: string) => {
    onChange(null, url);
    setIsOpen(false);
  };

  const handleRemove = () => {
    onChange(null, "");
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-group__label">
        {label}
      </label>
      <div className="avatar-selector">
        {value && (
          <div className="avatar-selector__preview">
            <img
              src={value}
              alt="Avatar seleccionado"
              className="avatar-selector__image"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="avatar-selector__remove"
            >
              ×
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="avatar-selector__button"
        >
          {value ? "Cambiar imagen" : "Seleccionar imagen"}
        </button>

        {isOpen && (
          <div className="avatar-selector__dropdown">
            <div className="avatar-selector__grid">
              {avatarUrls.map((url: string) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => handleSelect(url)}
                  className={`avatar-selector__option ${value === url ? "avatar-selector__option--selected" : ""}`}
                >
                  <img src={url} alt="Opción de avatar" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="avatar-selector__refresh"
            >
              🔄 Obtener nuevas imágenes
            </button>
          </div>
        )}
      </div>
      {error && <span className="form-group__error">{error}</span>}
    </div>
  );
}
