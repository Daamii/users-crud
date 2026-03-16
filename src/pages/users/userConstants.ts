import { User } from '../../types/user';

export const ROLES = [
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Usuario', label: 'Usuario' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Moderador', label: 'Moderador' }
];

export const USER_FORM_INITIAL_VALUES: Record<string, string> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: ''
};

export const USER_FORM_VALIDATION_RULES = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, email: true },
  phone: { required: true, minLength: 9 },
  role: { required: true }
};

export const getUserDisplayData = (user: User) => ({
  name: `${user.firstName} ${user.lastName}`,
  email: user.email,
  phone: user.phone,
  role: user.role,
  createdAt: new Date(user.createdAt).toLocaleDateString(),
  avatar: user.avatar,
  id: user.id
});
