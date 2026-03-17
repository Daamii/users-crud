import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AvatarSelector } from "../../components/AvatarSelector";
import { FormInput } from "../../components/FormInput";
import { FormSelect } from "../../components/FormSelect";
import { PhoneInput } from "../../components/PhoneInput";
import { FormErrors } from "../../hooks/useForm";
import { ROLES } from "./userConstants";

interface UserFormProps {
  values: Record<string, string>;
  errors: FormErrors;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  avatar: string;
  onAvatarChange: (file: File | null, preview: string) => void;
  children?: ReactNode;
}

export function UserForm({
  values,
  errors,
  handleChange,
  avatar,
  onAvatarChange,
  children,
}: UserFormProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="form-row">
        <FormInput
          label={t("users.form.fields.firstName")}
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
          placeholder={t("users.form.placeholders.firstName")}
        />

        <FormInput
          label={t("users.form.fields.lastName")}
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
          placeholder={t("users.form.placeholders.lastName")}
        />
      </div>

      <FormInput
        label={t("users.form.fields.email")}
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder={t("users.form.placeholders.email")}
      />

      <div className="form-row">
        <FormSelect
          label={t("users.form.fields.role")}
          name="role"
          value={values.role}
          onChange={handleChange}
          options={ROLES}
          error={errors.role}
          required
        />
        <PhoneInput
          label={t("users.form.fields.phone")}
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
      </div>

      <AvatarSelector
        label={t("users.form.fields.avatar")}
        name="avatar"
        value={avatar}
        onChange={onAvatarChange}
      />

      {children}
    </>
  );
}
