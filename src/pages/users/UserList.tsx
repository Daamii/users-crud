import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSearchFilter } from "../../components/SearchInput";
import { PAGE_OPTIONS } from "../../constants";
import { FaEdit, FiGrid, FiList } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUsers,
  setFilters,
  setLimit,
  setPage,
  setSort,
} from "../../store/usersSlice";
import { isMobile } from "../../utils";

import "./UserList.scss";

const UserList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    users,
    total,
    page,
    limit,
    totalPages,
    loading,
    error,
    filters,
    sort,
  } = useAppSelector((state) => state.users);

  const [pageInput, setPageInput] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">(() => {
    if (isMobile()) return "grid";
    const saved = localStorage.getItem("viewMode");
    return saved === "table" ? "table" : "grid";
  });
  const { searchInput, setSearchInput, debouncedSearch } = useSearchFilter();

  useEffect(() => {
    if (!isMobile()) {
      localStorage.setItem("viewMode", viewMode);
    } else if (viewMode !== "grid") {
      setViewMode("grid");
    }
  }, [viewMode]);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        limit,
        search: filters.search,
        role: filters.role,
        sort,
      }),
    );
  }, [dispatch, page, limit, filters.search, filters.role, sort]);

  const handleRoleChange = (role: string) => {
    dispatch(setFilters({ role }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPage = parseInt(pageInput, 10);
    if (!isNaN(newPage)) {
      handlePageChange(newPage);
    }
    setPageInput("");
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit({ limit: newLimit }));
  };

  const handleSortChange = (newSort: string) => {
    dispatch(setSort(newSort));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="user-list">
      <div className="user-list__filters">
        <div className="user-list__search-toggle">
          <div className="user-list__search">
            <input
              type="text"
              placeholder={t("users.list.search")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="user-list__search-input"
            />
          </div>

          <div className="user-list__view-toggle">
            <button
              className={`user-list__view-btn ${viewMode === "grid" ? "user-list__view-btn--active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={`user-list__view-btn ${viewMode === "table" ? "user-list__view-btn--active" : ""}`}
              onClick={() => setViewMode("table")}
              title="Table view"
            >
              <FiList />
            </button>
          </div>

          <div className="user-list__sort">
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="user-list__sort-select"
            >
              <option value="">{t("users.list.sort.default")}</option>
              <option value="name:asc">{t("users.list.sort.nameAsc")}</option>
              <option value="name:desc">{t("users.list.sort.nameDesc")}</option>
              <option value="email:asc">{t("users.list.sort.emailAsc")}</option>
              <option value="email:desc">
                {t("users.list.sort.emailDesc")}
              </option>
              <option value="role:asc">{t("users.list.sort.roleAsc")}</option>
              <option value="role:desc">{t("users.list.sort.roleDesc")}</option>
            </select>
          </div>
        </div>

        <div className="user-list__roles">
          <button
            className={`user-list__role-btn ${filters.role === "" ? "user-list__role-btn--active" : ""}`}
            onClick={() => handleRoleChange("")}
          >
            {t("users.list.filters.all")}
          </button>
          <button
            className={`user-list__role-btn ${filters.role === "Administrador" ? "user-list__role-btn--active" : ""}`}
            onClick={() => handleRoleChange("Administrador")}
          >
            {t("users.list.filters.administrador")}
          </button>
          <button
            className={`user-list__role-btn ${filters.role === "Usuario" ? "user-list__role-btn--active" : ""}`}
            onClick={() => handleRoleChange("Usuario")}
          >
            {t("users.list.filters.usuario")}
          </button>
          <button
            className={`user-list__role-btn ${filters.role === "Editor" ? "user-list__role-btn--active" : ""}`}
            onClick={() => handleRoleChange("Editor")}
          >
            {t("users.list.filters.editor")}
          </button>
          <button
            className={`user-list__role-btn ${filters.role === "Moderador" ? "user-list__role-btn--active" : ""}`}
            onClick={() => handleRoleChange("Moderador")}
          >
            {t("users.list.filters.moderador")}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="app__loading">{t("app.loading")}</div>
      ) : (
        <>
          {error && <div className="user-list__error">{error}</div>}

          {viewMode === "grid" ? (
            <div className="user-list__grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <Link to={`/user/${user.id}`} className="user-card__link">
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="user-card__avatar"
                    />
                    <div className="user-card__info">
                      <h2 className="user-card__name">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="user-card__email">{user.email}</p>
                      <p className="user-card__phone">{user.phone}</p>
                      <span
                        className={`user-card__role user-card__role--${user.role.toLowerCase()}`}
                      >
                        {t(`users.roles.${user.role}`)}
                      </span>
                    </div>
                  </Link>
                  <Link
                    to={`/user/${user.id}/edit`}
                    className="user-card__edit"
                    title={t("users.detail.edit")}
                  >
                    <FaEdit size={18} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="user-list__table">
              <table>
                <thead>
                  <tr>
                    <th>{t("users.list.table.avatar")}</th>
                    <th>{t("users.list.table.name")}</th>
                    <th>{t("users.list.table.email")}</th>
                    <th>{t("users.list.table.phone")}</th>
                    <th>{t("users.list.table.role")}</th>
                    <th>{t("users.list.table.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() =>
                        (window.location.href = `/user/${user.id}`)
                      }
                    >
                      <td>
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="user-list__table-avatar"
                        />
                      </td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span
                          className={`user-card__role user-card__role--${user.role.toLowerCase()}`}
                        >
                          {t(`users.roles.${user.role}`)}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <Link
                          to={`/user/${user.id}/edit`}
                          className="user-list__table-edit"
                          title={t("users.detail.edit")}
                        >
                          <FaEdit size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {users.length === 0 && (
            <div className="user-list__empty">{t("users.list.empty")}</div>
          )}

          {users.length > 0 && (
            <div className="user-list__pagination">
              <div className="user-list__pagination-left">
                <span className="user-list__pagination-label">
                  {t("users.list.pagination.show")}:
                </span>
                <select
                  className="user-list__pagination-select"
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                >
                  {PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="user-list__pagination-label">
                  {t("users.list.pagination.perPage")}
                </span>
              </div>

              <div className="user-list__pagination-center">
                <button
                  className="user-list__page-btn"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  {"<"}
                </button>

                {getPageNumbers().map((p, idx) =>
                  typeof p === "number" ? (
                    <button
                      key={idx}
                      className={`user-list__page-btn ${p === page ? "user-list__page-btn--active" : ""}`}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </button>
                  ) : (
                    <span key={idx} className="user-list__page-ellipsis">
                      {p}
                    </span>
                  ),
                )}

                <button
                  className="user-list__page-btn"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  {">"}
                </button>
              </div>

              <div className="user-list__pagination-right">
                <form
                  onSubmit={handlePageInputSubmit}
                  className="user-list__page-form"
                >
                  <span className="user-list__pagination-label">
                    {t("users.list.pagination.goTo")}
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    className="user-list__page-input"
                    placeholder={String(page)}
                  />
                  <button type="submit" className="user-list__page-go">
                    {t("users.list.pagination.go")}
                  </button>
                </form>
                <span className="user-list__page-info">
                  ({t("users.list.pagination.total", { count: total })})
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
