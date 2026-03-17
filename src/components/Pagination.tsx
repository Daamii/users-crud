import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PAGE_OPTIONS } from "../constants";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  pageInput: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onPageInputSubmit: (e: React.FormEvent) => void;
  onPageInputChange: (value: string) => void;
}

export const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  pageInput,
  onPageChange,
  onLimitChange,
  onPageInputSubmit,
  onPageInputChange,
}: PaginationProps) => {
  const { t } = useTranslation();

  const getPageNumbers = useMemo(() => {
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
  }, [page, totalPages]);

  return (
    <div className="user-list__pagination">
      <div className="user-list__pagination-left">
        <span className="user-list__pagination-label">
          {t("users.list.pagination.show")}:
        </span>
        <select
          className="user-list__pagination-select"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
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
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>

        {getPageNumbers.map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={idx}
              className={`user-list__page-btn ${p === page ? "user-list__page-btn--active" : ""}`}
              onClick={() => onPageChange(p)}
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
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div>

      <div className="user-list__pagination-right">
        <form onSubmit={onPageInputSubmit} className="user-list__page-form">
          <span className="user-list__pagination-label">
            {t("users.list.pagination.goTo")}
          </span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={pageInput}
            onChange={(e) => onPageInputChange(e.target.value)}
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
  );
};
