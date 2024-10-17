
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddHabitForm from './components/AddHabitForm'; 
import Profile from './components/Profile';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-habit" element={<AddHabitForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </Router>
  );
};

export default App;

