import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import {
  CreatePostPage,
  CreateUserPage,
  EditPostPage,
  FeedPage,
  UserProfilePage,
  UsersPage,
} from './pages';

const App: FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<FeedPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:userId" element={<UserProfilePage />} />
      <Route path="/users/new" element={<CreateUserPage />} />
      <Route path="/posts/new" element={<CreatePostPage />} />
      <Route path="/posts/:postId/edit" element={<EditPostPage />} />
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  </>
);

export default App;
