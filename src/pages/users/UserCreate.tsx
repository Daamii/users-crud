import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KeepSearchParamsLink } from "../../components/KeepSearchParamsLink";
import { useForm } from "../../hooks/useForm";
import { useToast } from "../../hooks/useToast";
import { FiArrowLeft, FiSave } from "../../icons";
import { useAppDispatch } from "../../store/hooks";
import { createUser } from "../../store/usersSlice";
import {
  USER_FORM_INITIAL_VALUES,
  USER_FORM_VALIDATION_RULES,
} from "./userConstants";
import { UserForm } from "./UserForm";

import "../../components/Form.scss";
import "./UserForm.scss";

const UserCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { values, errors, handleChange, validateAll } = useForm(
    USER_FORM_INITIAL_VALUES,
    USER_FORM_VALIDATION_RULES,
  );
  const [avatar, setAvatar] = useState<string>("");

  const handleAvatarChange = (_file: File | null, preview: string) => {
    setAvatar(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      await dispatch(
        createUser({
          ...values,
          avatar: avatar || undefined,
        } as import("../../types/user").UserFormData),
      );
      showToast(t("users.toast.createSuccess"));
      navigate(`/?${searchParams.toString()}`);
    }
  };

  return (
    <div className="user-form">
      <div className="user-form__header">
        <KeepSearchParamsLink to="/" className="user-form__back">
          <FiArrowLeft size={18} /> {t("users.form.cancel")}
        </KeepSearchParamsLink>
        <h1 className="user-form__title">{t("users.form.create")}</h1>
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
            <button
              type="submit"
              className="form-btn form-btn--primary form-btn--full"
            >
              <FiSave size={18} /> {t("users.form.create")}
            </button>
          </div>
        </UserForm>
      </form>
    </div>
  );
};

export default UserCreate;
