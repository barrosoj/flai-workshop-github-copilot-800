import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-3 fw-bold text-primary">
            <i className="bi bi-trophy-fill me-3"></i>
            OctoFit Tracker
          </h1>
          <p className="lead text-muted">
            Track your fitness journey with Marvel & DC superheroes!
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <Link to="/users" className="text-decoration-none">
            <div className="card h-100 shadow-sm border-primary" style={{cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center">
                <i className="bi bi-people-fill text-primary" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title mt-3">Users</h5>
                <p className="card-text text-muted">
                  View all registered superhero athletes and their teams
                </p>
                <span className="btn btn-primary">
                  View Users
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/teams" className="text-decoration-none">
            <div className="card h-100 shadow-sm border-success" style={{cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center">
                <i className="bi bi-shield-fill-check text-success" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title mt-3">Teams</h5>
                <p className="card-text text-muted">
                  Check out Team Marvel and Team DC competing for glory
                </p>
                <span className="btn btn-success">
                  View Teams
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/activities" className="text-decoration-none">
            <div className="card h-100 shadow-sm border-info" style={{cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center">
                <i className="bi bi-activity text-info" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title mt-3">Activities</h5>
                <p className="card-text text-muted">
                  Explore workout activities logged by superheroes
                </p>
                <span className="btn btn-info">
                  View Activities
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/leaderboard" className="text-decoration-none">
            <div className="card h-100 shadow-sm border-warning" style={{cursor: 'pointer', transition: 'transform 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center">
                <i className="bi bi-trophy text-warning" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title mt-3">Leaderboard</h5>
                <p className="card-text text-muted">
                  See who's leading the fitness competition
                </p>
                <span className="btn btn-warning">
                  View Leaderboard
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-danger">
            <div className="card-body text-center">
              <i className="bi bi-lightning-charge-fill text-danger" style={{fontSize: '3rem'}}></i>
              <h5 className="card-title mt-3">Workouts</h5>
              <p className="card-text text-muted">
                Browse superhero-themed workout programs
              </p>
              <Link to="/workouts" className="btn btn-danger">
                View Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            <div>
              <strong>Team Battle:</strong> Marvel vs DC! Track your activities and climb the leaderboard!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
