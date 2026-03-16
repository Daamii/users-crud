import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserById, updateUser, deleteUser, clearSelectedUser } from '../../store/usersSlice';
import { useForm } from '../../hooks/useForm';
import { FormInput } from '../../components/FormInput';
import { FormSelect } from '../../components/FormSelect';
import { AvatarSelector } from '../../components/AvatarSelector';
import { FiArrowLeft, FiSave, FiTrash2 } from 'react-icons/fi';
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

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedUser, loading, error } = useAppSelector((state) => state.users);
  const { values, errors, handleChange, validateAll, setValue } = useForm(initialValues, validationRules);
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setValue('firstName', selectedUser.firstName);
      setValue('lastName', selectedUser.lastName);
      setValue('email', selectedUser.email);
      setValue('phone', selectedUser.phone);
      setValue('role', selectedUser.role);
      setAvatar(selectedUser.avatar || "");
    }
  }, [selectedUser, setValue]);

  const handleAvatarChange = (_file: File | null, preview: string) => {
    setAvatar(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id && validateAll()) {
      await dispatch(updateUser({ id, data: { ...values, avatar } }));
      navigate('/');
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      await dispatch(deleteUser(id));
      navigate('/');
    }
  };

  if (loading && !selectedUser) return <div className="app__loading">Cargando usuario...</div>;
  if (error) return <div className="app__error">{error}</div>;
  if (!selectedUser) return <div className="app__error">Usuario no encontrado</div>;

  return (
    <div className="user-form">
      <div className="user-form__header">
        <button onClick={() => navigate('/')} className="user-form__back">
          <FiArrowLeft size={18} /> Volver
        </button>
        <h1 className="user-form__title">Editar Usuario</h1>
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

        <AvatarSelector
          label="Avatar"
          name="avatar"
          value={avatar}
          onChange={handleAvatarChange}
        />

        <div className="user-form__actions">
          <button type="submit" className="form-btn form-btn--primary" disabled={loading}>
            <FiSave size={18} /> {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>

      <div className="user-form__delete">
        <button 
          type="button" 
          className="form-btn form-btn--danger" 
          onClick={handleDelete}
          disabled={loading}
        >
          <FiTrash2 size={18} /> Eliminar usuario
        </button>
      </div>
    </div>
  );
};

export default UserEdit;