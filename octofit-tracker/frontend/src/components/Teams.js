import React, { useState, useEffect } from 'react';

// API URL Configuration
// Codespace URL: https://{CODESPACE_NAME}-8000.app.github.dev/api/teams
// Local URL: http://localhost:8000/api/teams
const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/teams/`).then(r => r.ok ? r.json() : Promise.reject('Failed to fetch teams')),
      fetch(`${API_URL}/users/`).then(r => r.ok ? r.json() : Promise.reject('Failed to fetch users'))
    ])
      .then(([teamsData, usersData]) => {
        setTeams(teamsData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-shield-fill-check text-success me-2"></i>
          Competing Teams
        </h2>
        <span className="badge bg-success rounded-pill">{teams.length} Teams</span>
      </div>

      <div className="row g-4">
        {teams.map((team) => {
          const memberCount = users.filter(u => u.team === team.name).length;
          return (
          <div key={team.id} className="col-md-6">
            <div className={`card h-100 shadow-sm border-${team.name === 'Team Marvel' ? 'danger' : 'primary'}`}>
              <div className="card-header bg-transparent">
                <h5 className="card-title mb-0 fw-bold">
                  <i className={`bi bi-shield-fill me-2 text-${team.name === 'Team Marvel' ? 'danger' : 'primary'}`}></i>
                  {team.name}
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{team.description}</p>
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="bi bi-calendar-event me-1"></i>
                      Created: {new Date(team.created_at).toLocaleDateString()}
                    </small>
                    <span className={`badge ${team.name === 'Team Marvel' ? 'bg-danger' : 'bg-primary'}`}>
                      <i className="bi bi-people-fill me-1"></i>
                      {memberCount} {memberCount === 1 ? 'Member' : 'Members'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button className={`btn btn-sm btn-outline-${team.name === 'Team Marvel' ? 'danger' : 'primary'}`}>
                  View Members
                </button>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Team Statistics</h5>
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0">
                  <thead>
                    <tr>
                      <th>Team Name</th>
                      <th>Description</th>
                      <th>Members</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => {
                      const memberCount = users.filter(u => u.team === team.name).length;
                      return (
                      <tr key={team.id}>
                        <td className="fw-semibold">{team.name}</td>
                        <td className="text-muted">{team.description}</td>
                        <td>
                          <span className="badge bg-info">
                            <i className="bi bi-people-fill me-1"></i>
                            {memberCount}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success">Active</span>
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
      </div>
    </div>
  );
}

export default Teams;
