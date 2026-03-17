import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface AppState {
  theme: Theme;
  toasts: Toast[];
}

type RootState = { app: AppState };

export const selectTheme = (state: RootState) => state.app.theme;
export const selectToasts = (state: RootState) => state.app.toasts;

let toastId = 0;

const initialState: AppState = {
  theme: (() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) || "light";
  })(),
  toasts: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      document.documentElement.setAttribute("data-theme", state.theme);
    },
    showToast(
      state,
      action: PayloadAction<{ message: string; type?: Toast["type"] }>,
    ) {
      const id = ++toastId;
      state.toasts.push({
        id,
        message: action.payload.message,
        type: action.payload.type || "success",
      });
    },
    removeToast(state, action: PayloadAction<number>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { toggleTheme, showToast, removeToast } = appSlice.actions;
export default appSlice.reducer;
