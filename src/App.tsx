import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Header } from "./components/Header";
import { ToastContainer } from "./components/ToastContainer";
import UserList from "./pages/users/UserList";

const UserCreate = lazy(() => import("./pages/users/UserCreate"));
const UserDetail = lazy(() => import("./pages/users/UserDetail"));
const UserEdit = lazy(() => import("./pages/users/UserEdit"));

function AppContent() {
  const location = useLocation();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const useMockData = searchParams.get("mock") === "true";

  const showCreateButton =
    !location.pathname.includes("/create") &&
    !location.pathname.includes("/edit");

  return (
    <>
      {useMockData && (
        <div className="app-header__warning">
          {t("app.usingMockDataWarning")}
        </div>
      )}
      <Header showCreateButton={showCreateButton} />
      <Suspense
        fallback={<div className="app__loading">{t("app.loading")}</div>}
      >
        <Routes>
          <Route path="/" element={<UserList key={location.search} />} />
          <Route
            path="/user/:id"
            element={<UserDetail key={location.search} />}
          />
          <Route
            path="/user/:id/edit"
            element={<UserEdit key={location.search} />}
          />
          <Route
            path="/create"
            element={<UserCreate key={location.search} />}
          />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/users-crud/">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
