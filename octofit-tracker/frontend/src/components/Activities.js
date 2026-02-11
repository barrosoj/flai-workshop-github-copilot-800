import React, { useState, useEffect } from 'react';

// API URL Configuration
// Codespace URL: https://{CODESPACE_NAME}-8000.app.github.dev/api/activities
// Local URL: http://localhost:8000/api/activities
const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch(`${API_URL}/activities/`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch activities');
        return response.json();
      })
      .then(data => {
        setActivities(data);
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
        <div className="spinner-border text-info" role="status">
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

  const activityTypes = ['all', ...new Set(activities.map(a => a.activity_type))];
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.activity_type === filter);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-activity text-info me-2"></i>
          Activity Log
        </h2>
        <span className="badge bg-info rounded-pill">{filteredActivities.length} Activities</span>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3">
              <label htmlFor="activityFilter" className="form-label fw-semibold">
                <i className="bi bi-funnel me-1"></i>Filter by Type:
              </label>
            </div>
            <div className="col-md-9">
              <div className="btn-group" role="group">
                {activityTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`btn btn-sm ${filter === type ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => setFilter(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.slice(0, 50).map((activity, index) => (
                  <tr key={activity.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="fw-semibold">{activity.user_name}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {activity.activity_type}
                      </span>
                    </td>
                    <td>
                      <i className="bi bi-clock me-1 text-muted"></i>
                      {activity.duration} min
                    </td>
                    <td>
                      <i className="bi bi-fire me-1 text-danger"></i>
                      {activity.calories} cal
                    </td>
                    <td className="text-muted">
                      {activity.date ? new Date(activity.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredActivities.length > 50 && (
        <div className="alert alert-info mt-3" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          Showing first 50 activities. Total: {filteredActivities.length}
        </div>
      )}
    </div>
  );
}

export default Activities;
