import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../../components/Form.scss";
import { KeepSearchParamsLink } from "../../components/KeepSearchParamsLink";
import { useForm } from "../../hooks/useForm";
import { useToast } from "../../hooks/useToast";
import { ArrowLeftIcon, SaveIcon, TrashIcon } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearSelectedUser,
  deleteUser,
  fetchUserById,
  updateUser,
} from "../../store/usersSlice";
import { UserForm } from "./UserForm";
import "./UserForm.scss";
import {
  USER_FORM_INITIAL_VALUES,
  USER_FORM_VALIDATION_RULES,
} from "./userConstants";

const UserEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { selectedUser, loading, error } = useAppSelector(
    (state) => state.users,
  );
  const { values, errors, handleChange, validateAll, setValue } = useForm(
    USER_FORM_INITIAL_VALUES,
    USER_FORM_VALIDATION_RULES,
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
      setValue("firstName", selectedUser.firstName);
      setValue("lastName", selectedUser.lastName);
      setValue("email", selectedUser.email);
      setValue("phone", selectedUser.phone);
      setValue("role", selectedUser.role);
      setAvatar(selectedUser.avatar || "");
    }
  }, [selectedUser, setValue]);

  const handleAvatarChange = (_file: File | null, preview: string) => {
    setAvatar(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id && validateAll()) {
      await dispatch(
        updateUser({
          id,
          data: {
            ...values,
            avatar,
          } as import("../../types/user").UserFormData,
        }),
      );
      showToast(t("users.toast.editSuccess"));
      navigate(`/?${searchParams.toString()}`);
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm(t("users.form.deleteConfirm"))) {
      await dispatch(deleteUser(id));
      showToast(t("users.toast.deleteSuccess"));
      navigate(`/?${searchParams.toString()}`);
    }
  };

  if (loading && !selectedUser)
    return <div className="app__loading">{t("app.loading")}</div>;
  if (error) return <div className="app__error">{error}</div>;
  if (!selectedUser)
    return <div className="app__error">{t("users.detail.notFound")}</div>;

  return (
    <div className="user-form">
      <div className="user-form__header">
        <KeepSearchParamsLink to="/" className="user-form__back">
          <ArrowLeftIcon size={18} /> {t("users.detail.back")}
        </KeepSearchParamsLink>
        <h1 className="user-form__title">{t("users.form.edit")}</h1>
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
              <TrashIcon size={18} /> {t("users.form.delete")}
            </button>
            <button
              type="submit"
              className="form-btn form-btn--primary"
              disabled={loading}
            >
              <SaveIcon size={18} />{" "}
              {loading ? t("users.form.saving") : t("users.form.save")}
            </button>
          </div>
        </UserForm>
      </form>
    </div>
  );
};

export default UserEdit;
