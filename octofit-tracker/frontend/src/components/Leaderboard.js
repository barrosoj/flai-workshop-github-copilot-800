import React, { useState, useEffect } from 'react';

// API URL Configuration
// Codespace URL: https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
// Local URL: http://localhost:8000/api/leaderboard
const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/leaderboard/`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Error: {error}
        </div>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: '🥇', class: 'bg-warning text-dark' };
    if (rank === 2) return { icon: '🥈', class: 'bg-secondary text-white' };
    if (rank === 3) return { icon: '🥉', class: 'bg-danger text-white' };
    return { icon: rank, class: 'bg-light text-dark' };
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-trophy-fill text-warning me-2"></i>
          Fitness Leaderboard
        </h2>
        <span className="badge bg-warning text-dark rounded-pill">{leaderboard.length} Athletes</span>
      </div>

      <div className="row mb-4">
        {leaderboard.slice(0, 3).map((entry, index) => (
          <div key={entry.id} className="col-md-4 mb-3">
            <div className={`card h-100 shadow border-${index === 0 ? 'warning' : index === 1 ? 'secondary' : 'danger'}`}>
              <div className="card-body text-center">
                <div className="mb-3" style={{fontSize: '3rem'}}>
                  {getRankBadge(entry.rank).icon}
                </div>
                <h5 className="card-title fw-bold">{entry.user_name}</h5>
                <p className="text-muted mb-2">
                  <span className={`badge ${entry.team === 'Team Marvel' ? 'bg-danger' : 'bg-primary'}`}>
                    {entry.team}
                  </span>
                </p>
                <div className="d-flex justify-content-around mt-3">
                  <div>
                    <div className="text-muted small">Calories</div>
                    <div className="fw-bold fs-5">{entry.total_calories.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted small">Activities</div>
                    <div className="fw-bold fs-5">{entry.total_activities}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">
            <i className="bi bi-list-ol me-2"></i>
            Full Rankings
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Team</th>
                  <th scope="col">Total Calories</th>
                  <th scope="col">Total Activities</th>
                  <th scope="col">Avg Calories/Activity</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => {
                  const badge = getRankBadge(entry.rank);
                  return (
                    <tr key={entry.id}>
                      <th scope="row">
                        <span className={`badge ${badge.class} fs-6`}>
                          {badge.icon}
                        </span>
                      </th>
                      <td className="fw-semibold">{entry.user_name}</td>
                      <td>
                        <span className={`badge ${entry.team === 'Team Marvel' ? 'bg-danger' : 'bg-primary'}`}>
                          {entry.team}
                        </span>
                      </td>
                      <td>
                        <i className="bi bi-fire text-danger me-1"></i>
                        <strong>{entry.total_calories.toLocaleString()}</strong>
                      </td>
                      <td>
                        <i className="bi bi-activity text-info me-1"></i>
                        {entry.total_activities}
                      </td>
                      <td className="text-muted">
                        {Math.round(entry.total_calories / entry.total_activities)} cal
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
