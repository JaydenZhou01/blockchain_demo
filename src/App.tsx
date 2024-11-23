import React from 'react';
import Dashboard from './Dashboard.tsx';
import Loginpage from "./app_login.tsx";
import SignUp from "./app_signup.tsx"
import Realname from "./real_name.tsx"
import DashboardD from "./DashboardD.tsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App : React.FC = () => {
  return(
  <Router>
  <Routes>
    <Route path="/login" element={<Loginpage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/realname" element={<Realname />} />
    <Route path="/home" element={<Dashboard />} />
    <Route path="/Dhome" element={<DashboardD />} />
  </Routes>
</Router>
  );

};

export default App;
