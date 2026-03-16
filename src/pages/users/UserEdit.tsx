import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserById, updateUser, deleteUser, clearSelectedUser } from '../../store/usersSlice';
import { useForm } from '../../hooks/useForm';
import { FiArrowLeft, FiSave, FiTrash2 } from '../../icons';
import { UserForm } from './UserForm';
import { USER_FORM_INITIAL_VALUES, USER_FORM_VALIDATION_RULES } from './userConstants';
import '../../components/Form.scss';
import './UserForm.scss';

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedUser, loading, error } = useAppSelector((state) => state.users);
  const { values, errors, handleChange, validateAll, setValue } = useForm(
    USER_FORM_INITIAL_VALUES,
    USER_FORM_VALIDATION_RULES
  );
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
      await dispatch(updateUser({ id, data: { ...values, avatar } as import('../../types/user').UserFormData }));
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
        <UserForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          avatar={avatar}
          onAvatarChange={handleAvatarChange}
        >
          <div className="user-form__actions">
            <button 
              type="button" 
              className="form-btn form-btn--danger" 
              onClick={handleDelete}
              disabled={loading}
            >
              <FiTrash2 size={18} /> Eliminar usuario
            </button>
            <button type="submit" className="form-btn form-btn--primary" disabled={loading}>
              <FiSave size={18} /> {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </UserForm>
      </form>
    </div>
  );
};

export default UserEdit;
