import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/nav';
import Home from './pages/home';
import About from './pages/about';
function App() {
;

  return (
    <Router>
    <div>
        {/* 顶部导航栏，保持不变 */}
        <Navbar />

        {/* 路由切换区域 */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
