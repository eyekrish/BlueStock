import React from 'react';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IPOForm from './pages/ipoform';
import RegisterCompanyForm from './pages/register';
import AdminLogin from './pages/AdminLogin';
function App() {
  return(
  <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={<IPOForm />} />
    <Route path="/register" element={<RegisterCompanyForm />} />
    <Route path="/admin/login" element={<AdminLogin />}/>
  </Routes>
</Router>
);

}

export default App;







