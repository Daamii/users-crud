import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './pages/users/UserList';
import UserDetail from './pages/users/UserDetail';
import UserEdit from './pages/users/UserEdit';
import UserCreate from './pages/users/UserCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="/create" element={<UserCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;