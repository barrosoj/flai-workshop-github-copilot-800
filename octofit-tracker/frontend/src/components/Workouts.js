import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/workouts/`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch workouts');
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
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
        <div className="spinner-border text-danger" role="status">
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

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning text-dark';
      case 'hard': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-lightning-charge-fill text-danger me-2"></i>
          Superhero Workouts
        </h2>
        <span className="badge bg-danger rounded-pill">{workouts.length} Programs</span>
      </div>

      <div className="row g-4 mb-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                  <span className="badge bg-secondary">{workout.category}</span>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold">{workout.name}</h5>
                <p className="card-text text-muted small">{workout.description}</p>
                <div className="d-flex justify-content-between text-muted small mt-3">
                  <div>
                    <i className="bi bi-clock me-1"></i>
                    {workout.duration} min
                  </div>
                  <div>
                    <i className="bi bi-fire me-1 text-danger"></i>
                    ~{workout.calories_estimate} cal
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button 
                  className="btn btn-sm btn-outline-danger w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#workoutModal"
                  onClick={() => setSelectedWorkout(workout)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">
            <i className="bi bi-table me-2"></i>
            All Workouts Overview
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Est. Calories</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={workout.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="fw-semibold">{workout.name}</td>
                    <td>
                      <span className="badge bg-secondary">{workout.category}</span>
                    </td>
                    <td>
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                        {workout.difficulty}
                      </span>
                    </td>
                    <td>
                      <i className="bi bi-clock me-1 text-muted"></i>
                      {workout.duration} min
                    </td>
                    <td>
                      <i className="bi bi-fire me-1 text-danger"></i>
                      {workout.calories_estimate} cal
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Workout Details Modal */}
      {selectedWorkout && (
        <div className="modal fade" id="workoutModal" tabIndex="-1" aria-labelledby="workoutModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title" id="workoutModalLabel">
                  <i className="bi bi-lightning-charge-fill me-2"></i>
                  {selectedWorkout.name}
                </h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6 className="text-muted">Description</h6>
                  <p>{selectedWorkout.description}</p>
                </div>
                <div className="row">
                  <div className="col-6">
                    <h6 className="text-muted">Category</h6>
                    <p><span className="badge bg-secondary">{selectedWorkout.category}</span></p>
                  </div>
                  <div className="col-6">
                    <h6 className="text-muted">Difficulty</h6>
                    <p><span className={`badge ${getDifficultyBadge(selectedWorkout.difficulty)}`}>
                      {selectedWorkout.difficulty}
                    </span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <h6 className="text-muted">Duration</h6>
                    <p><i className="bi bi-clock me-1"></i>{selectedWorkout.duration} minutes</p>
                  </div>
                  <div className="col-6">
                    <h6 className="text-muted">Calories</h6>
                    <p><i className="bi bi-fire me-1 text-danger"></i>~{selectedWorkout.calories_estimate} cal</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger">Start Workout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
