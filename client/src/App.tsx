// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Profile from './Profile';
import Users from './Users';
import Signup from './signup/SignIn';
import Login from './Login';

const App: React.FC = () => {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

      </Routes>
    </div>
  );
};

export default App;
