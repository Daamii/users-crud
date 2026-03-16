import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { createUser } from '../../store/usersSlice';
import { useForm } from '../../hooks/useForm';
import { FiArrowLeft, FiSave } from '../../icons';
import { UserForm } from './UserForm';
import { USER_FORM_INITIAL_VALUES, USER_FORM_VALIDATION_RULES } from './userConstants';
import '../../components/Form.scss';
import './UserForm.scss';

const UserCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, validateAll } = useForm(
    USER_FORM_INITIAL_VALUES,
    USER_FORM_VALIDATION_RULES
  );
  const [avatar, setAvatar] = useState<string>("");

  const handleAvatarChange = (_file: File | null, preview: string) => {
    setAvatar(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      await dispatch(createUser({ ...values, avatar: avatar || undefined } as import('../../types/user').UserFormData));
      navigate('/');
    }
  };

  return (
    <div className="user-form">
      <div className="user-form__header">
        <button onClick={() => navigate('/')} className="user-form__back">
          <FiArrowLeft size={18} /> Cancelar
        </button>
        <h1 className="user-form__title">Crear Usuario</h1>
      </div>

      <form onSubmit={handleSubmit} className="user-form__form">
        <UserForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          avatar={avatar}
          onAvatarChange={handleAvatarChange}
        >
          <div className="form-buttons form-buttons--center">
            <button type="submit" className="form-btn form-btn--primary form-btn--full">
              <FiSave size={18} /> Crear usuario
            </button>
          </div>
        </UserForm>
      </form>
    </div>
  );
};

export default UserCreate;
