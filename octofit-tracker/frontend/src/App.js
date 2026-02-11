import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <img 
                src="/logo.png" 
                alt="OctoFit Logo" 
                height="40" 
                className="d-inline-block align-middle"
              />
              <span className="ms-2">OctoFit Tracker</span>
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end>
                    <i className="bi bi-house-fill me-1"></i>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    <i className="bi bi-people-fill me-1"></i>
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">
                    <i className="bi bi-shield-fill-check me-1"></i>
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">
                    <i className="bi bi-activity me-1"></i>
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy me-1"></i>
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">
                    <i className="bi bi-lightning-charge-fill me-1"></i>
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="footer bg-dark text-white text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">
              <i className="bi bi-trophy-fill text-warning me-2"></i>
              OctoFit Tracker &copy; 2026 - Marvel vs DC Fitness Challenge
            </p>
            <small className="text-muted">
              Built with Django REST Framework & React
            </small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
