import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserById, clearSelectedUser } from '../../store/usersSlice';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import './UserDetail.scss';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedUser, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  if (loading) return <div className="app__loading">Cargando usuario...</div>;
  if (error) return <div className="app__error">{error}</div>;
  if (!selectedUser) return <div className="app__error">Usuario no encontrado</div>;

  return (
    <div className="user-detail">
      <div className="user-detail__header">
        <button onClick={() => navigate('/')} className="user-detail__back">
          <FiArrowLeft size={18} /> Volver
        </button>
        <Link to={`/edit/${selectedUser.id}`} className="user-detail__edit">
          <FiEdit2 size={18} /> Editar
        </Link>
      </div>
      
      <div className="user-detail__card">
        <img src={selectedUser.avatar} alt={selectedUser.firstName} className="user-detail__avatar" />
        <div className="user-detail__content">
          <h1 className="user-detail__name">{selectedUser.firstName} {selectedUser.lastName}</h1>
          <span className="user-detail__role">{selectedUser.role}</span>
          
          <div className="user-detail__section">
            <div className="user-detail__row">
              <span className="user-detail__label">Email:</span>
              <span className="user-detail__value">{selectedUser.email}</span>
            </div>
            <div className="user-detail__row">
              <span className="user-detail__label">Teléfono:</span>
              <span className="user-detail__value">{selectedUser.phone}</span>
            </div>
            <div className="user-detail__row">
              <span className="user-detail__label">Creado:</span>
              <span className="user-detail__value">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="user-detail__row">
              <span className="user-detail__label">ID:</span>
              <span className="user-detail__value">{selectedUser.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;