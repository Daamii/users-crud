import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  resources: {
    es: {
      translation: {
        "users.list.table.avatar": "Avatar",
        "users.list.table.name": "Nombre",
        "users.list.table.email": "Email",
        "users.list.table.phone": "Teléfono",
        "users.list.table.role": "Rol",
        "users.list.table.actions": "Acciones",
        "users.detail.edit": "Editar",
        "users.roles.Usuario": "Usuario",
        "users.roles.Administrador": "Administrador",
        "users.roles.Editor": "Editor",
        "users.roles.Moderador": "Moderador",
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
