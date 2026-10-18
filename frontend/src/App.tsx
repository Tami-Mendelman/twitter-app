import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from './components/ProtectedLayout';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import {
  CreatePostPage,
  CreateUserPage,
  EditPostPage,
  FeedPage,
  UsersPage,
} from './pages';



const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedLayout />}>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<FeedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<CreateUserPage />} />
      <Route path="/posts/new" element={<CreatePostPage />} />
      <Route path="/posts/:postId/edit" element={<EditPostPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/posts" replace />} />
  </Routes>
);

export default App;
