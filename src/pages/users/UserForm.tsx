import { ReactNode } from 'react';
import { FormInput } from '../../components/FormInput';
import { FormSelect } from '../../components/FormSelect';
import { AvatarSelector } from '../../components/AvatarSelector';
import { ROLES } from './userConstants';
import { FormErrors } from '../../hooks/useForm';

interface UserFormProps {
  values: Record<string, string>;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
  children
}: UserFormProps) {
  return (
    <>
      <FormInput
        label="Nombre"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        error={errors.firstName}
        required
      />

      <FormInput
        label="Apellido"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        error={errors.lastName}
        required
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <FormInput
        label="Teléfono"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />

      <FormSelect
        label="Rol"
        name="role"
        value={values.role}
        onChange={handleChange}
        options={ROLES}
        error={errors.role}
        required
      />

      <AvatarSelector
        label="Avatar"
        name="avatar"
        value={avatar}
        onChange={onAvatarChange}
      />

      {children}
    </>
  );
}
