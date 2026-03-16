import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserCreate from "./pages/users/UserCreate";
import UserDetail from "./pages/users/UserDetail";
import UserEdit from "./pages/users/UserEdit";
import UserList from "./pages/users/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />
        <Route path="/create" element={<UserCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
