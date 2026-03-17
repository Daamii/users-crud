import { useCallback, useEffect } from "react";
import { selectTheme, toggleTheme } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useTheme() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return { theme, toggleTheme: toggle };
}
