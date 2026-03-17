import { useCallback } from "react";
import {
  removeToast,
  selectToasts,
  showToast as showToastAction,
} from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useToast() {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      dispatch(showToastAction({ message, type }));
    },
    [dispatch],
  );

  const removeToastCallback = useCallback(
    (id: number) => {
      dispatch(removeToast(id));
    },
    [dispatch],
  );

  return { toasts, showToast, removeToast: removeToastCallback };
}
