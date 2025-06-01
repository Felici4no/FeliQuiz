import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import { QuizProvider } from './context/QuizContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Manifesto from './pages/ManifestoPage';
import AnimatedRoute from './components/AnimatedRoute';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimatedRoute>
            <Home />
          </AnimatedRoute>
        } />
        <Route path="/quizzes" element={
          <AnimatedRoute>
            <QuizList />
          </AnimatedRoute>
        } />
        <Route path="/quiz/:id" element={
          <AnimatedRoute>
            <QuizDetail />
          </AnimatedRoute>
        } />
        <Route path="/profile/:username" element={
          <AnimatedRoute>
            <Profile />
          </AnimatedRoute>
        } />
        <Route path="/login" element={
          <AnimatedRoute>
            <Auth />
          </AnimatedRoute>
        } />
        <Route path="/manifesto" element={
          <AnimatedRoute>
            <Manifesto />
          </AnimatedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <QuizProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </QuizProvider>
      </UserProvider>
    </Router>
  );
}

export default App;