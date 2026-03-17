import { useEffect, useRef } from "react";
import { removeToast, selectToasts } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function ToastContainer() {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();
  const toastIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!toastIds.current.has(toast.id)) {
        toastIds.current.add(toast.id);
        setTimeout(() => {
          dispatch(removeToast(toast.id));
          toastIds.current.delete(toast.id);
        }, 3000);
      }
    });
  }, [toasts, dispatch]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => dispatch(removeToast(toast.id))}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
