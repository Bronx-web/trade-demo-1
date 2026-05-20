
import React, { useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NextStepBar from './components/NextStepBar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Booking from './pages/Booking';

const App: React.FC = () => {
  // Shared ref to track the footer element
  const footerRef = useRef<HTMLElement>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        
        {/* Pass the ref to Footer so we know when it's on screen */}
        <Footer ref={footerRef} />
        
        {/* The bar that slides up when Footer ref enters the viewport */}
        <NextStepBar footerRef={footerRef} />
      </div>
    </Router>
  );
};

export default App;
