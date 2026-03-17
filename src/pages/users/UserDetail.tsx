import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearSelectedUser,
  deleteUser,
  fetchUserById,
} from "../../store/usersSlice";
import { getUserDisplayData } from "./userConstants";
import "./UserDetail.scss";

const UserDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { selectedUser, loading, error } = useAppSelector(
    (state) => state.users,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (id && window.confirm(t("users.form.deleteConfirm"))) {
      await dispatch(deleteUser(id));
      showToast(t("users.toast.deleteSuccess"));
      navigate("/");
    }
  };

  if (loading) return <div className="app__loading">{t("app.loading")}</div>;
  if (error) return <div className="app__error">{error}</div>;
  if (!selectedUser)
    return <div className="app__error">{t("users.detail.notFound")}</div>;

  const displayData = getUserDisplayData(selectedUser);

  return (
    <div className="user-detail">
      <div className="user-detail__header">
        <button onClick={() => navigate("/")} className="user-detail__back">
          <FiArrowLeft size={18} /> {t("users.detail.back")}
        </button>
        <div className="user-detail__actions">
          <button
            onClick={handleDelete}
            className="user-detail__delete"
            disabled={loading}
          >
            <FiTrash2 size={18} /> {t("users.detail.delete")}
          </button>
          <Link to={`/user/${id}/edit`} className="user-detail__edit">
            <FiEdit2 size={18} /> {t("users.detail.edit")}
          </Link>
        </div>
      </div>

      <div className="user-detail__card">
        <img
          src={displayData.avatar}
          alt={displayData.name}
          className="user-detail__avatar"
        />
        <div className="user-detail__content">
          <h1 className="user-detail__name">{displayData.name}</h1>
          <span className="user-detail__role">
            {t(`users.roles.${displayData.role}`)}
          </span>

          <div className="user-detail__section">
            <div className="user-detail__row">
              <span className="user-detail__label">
                {t("users.detail.email")}:
              </span>
              <span className="user-detail__value">{displayData.email}</span>
            </div>
            <div className="user-detail__row">
              <span className="user-detail__label">
                {t("users.detail.phone")}:
              </span>
              <span className="user-detail__value">{displayData.phone}</span>
            </div>
            <div className="user-detail__row">
              <span className="user-detail__label">
                {t("users.detail.created")}:
              </span>
              <span className="user-detail__value">
                {displayData.createdAt}
              </span>
            </div>
            <div className="user-detail__row">
              <span className="user-detail__label">
                {t("users.detail.id")}:
              </span>
              <span className="user-detail__value">{displayData.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
