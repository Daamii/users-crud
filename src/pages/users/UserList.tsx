import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "../../components/Pagination";
import { useSearchFilter } from "../../components/SearchInput";
import { UserTable } from "../../components/UserTable";
import { UsersGrid } from "../../components/UsersGrid";
import { GridIcon, ListIcon } from "../../icons";
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
  const [scrollState, setScrollState] = useState({ top: false, bottom: true });
  const contentRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const hasOverflow = scrollHeight > clientHeight;
        setScrollState({
          top: hasOverflow && scrollTop > 0,
          bottom: hasOverflow && scrollTop + clientHeight < scrollHeight - 1,
        });
      }
    };

    const content = contentRef.current;
    if (content) {
      checkScroll();
      content.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        content.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [users, viewMode]);

  const handleRoleChange = useCallback(
    (role: string) => {
      dispatch(setFilters({ role }));
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        dispatch(setPage(newPage));
      }
    },
    [dispatch, totalPages],
  );

  const handlePageInputSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newPage = parseInt(pageInput, 10);
      if (!isNaN(newPage)) {
        handlePageChange(newPage);
      }
      setPageInput("");
    },
    [pageInput, handlePageChange],
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      dispatch(setLimit({ limit: newLimit }));
    },
    [dispatch],
  );

  const handleSortChange = useCallback(
    (newSort: string) => {
      dispatch(setSort(newSort));
    },
    [dispatch],
  );

  const handlePageInputChange = useCallback((value: string) => {
    setPageInput(value);
  }, []);

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
              <GridIcon />
            </button>
            <button
              className={`user-list__view-btn ${viewMode === "table" ? "user-list__view-btn--active" : ""}`}
              onClick={() => setViewMode("table")}
              title="Table view"
            >
              <ListIcon />
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
            <UsersGrid
              ref={contentRef}
              users={users}
              hasOverflowBottom={scrollState.bottom}
            />
          ) : (
            <div
              ref={contentRef}
              className={`user-list__table ${scrollState.bottom ? "user-list__table--overflow-bottom" : ""}`}
            >
              <UserTable users={users} />
            </div>
          )}

          {users.length === 0 && (
            <div className="user-list__empty">{t("users.list.empty")}</div>
          )}

          {users.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
              pageInput={pageInput}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              onPageInputSubmit={handlePageInputSubmit}
              onPageInputChange={handlePageInputChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
