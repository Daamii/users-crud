import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { ToastProvider } from "./context/ToastContext";
import UserList from "./pages/users/UserList";

const UserCreate = lazy(() => import("./pages/users/UserCreate"));
const UserDetail = lazy(() => import("./pages/users/UserDetail"));
const UserEdit = lazy(() => import("./pages/users/UserEdit"));

function AppContent() {
  const location = useLocation();
  const { t } = useTranslation();
  const showCreateButton =
    !location.pathname.includes("/create") &&
    !location.pathname.includes("/edit");

  return (
    <>
      <Header showCreateButton={showCreateButton} />
      <Suspense
        fallback={<div className="app__loading">{t("app.loading")}</div>}
      >
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/user/:id/edit" element={<UserEdit />} />
          <Route path="/create" element={<UserCreate />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
