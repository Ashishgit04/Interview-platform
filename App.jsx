import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CompanySelection from './CompanySelection';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ResumePage from './ResumePage';
import History from './History';
import Analytics from './Analytics';
import Difficulty from './Difficulty';
import Interview from './Interview.jsx';

import DashboardLayout from './DashboardLayout';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/companies" element={<CompanySelection />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </>
  );
}

export default App;