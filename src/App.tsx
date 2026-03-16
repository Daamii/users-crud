import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import UserCreate from "./pages/users/UserCreate";
import UserDetail from "./pages/users/UserDetail";
import UserEdit from "./pages/users/UserEdit";
import UserList from "./pages/users/UserList";

function AppContent() {
  const location = useLocation();
  const showCreateButton = location.pathname === "/" || location.pathname === "";

  return (
    <>
      <Header showCreateButton={showCreateButton} />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />
        <Route path="/create" element={<UserCreate />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
