import React from 'react';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IPOForm from './pages/ipoform';

function App() {
  return(
  <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={<IPOForm />} />
  </Routes>
</Router>
);

}

export default App;







