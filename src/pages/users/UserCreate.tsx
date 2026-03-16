import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { createUser } from '../../store/usersSlice';
import { useForm } from '../../hooks/useForm';
import { FormInput } from '../../components/FormInput';
import { FormSelect } from '../../components/FormSelect';
import '../../components/Form.scss';
import './UserForm.scss';

const ROLES = [
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Usuario', label: 'Usuario' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Moderador', label: 'Moderador' }
];

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: ''
};

const validationRules = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, email: true },
  phone: { required: true, minLength: 9 },
  role: { required: true }
};

const UserCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, validateAll } = useForm(initialValues, validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      await dispatch(createUser(values));
      navigate('/');
    }
  };

  return (
    <div className="user-form">
      <div className="user-form__header">
        <button onClick={() => navigate('/')} className="user-form__back">← Cancelar</button>
        <h1 className="user-form__title">Crear Usuario</h1>
      </div>

      <form onSubmit={handleSubmit} className="user-form__form">
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

        <div className="form-buttons form-buttons--center">
          <button type="submit" className="form-btn form-btn--primary form-btn--full">
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;