import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', team: '' });
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(`${API_URL}/users/`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      team: user.team
    });
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleEditFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const response = await fetch(`${API_URL}/users/${editingUser.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update user');
      }

      setSaveSuccess(true);
      fetchUsers();
      
      // Close modal after a short delay
      setTimeout(() => {
        const modalElement = document.getElementById('editUserModal');
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        setEditingUser(null);
        setSaveSuccess(false);
      }, 1000);
    } catch (err) {
      setSaveError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
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
          <i className="bi bi-people-fill text-primary me-2"></i>
          Superhero Athletes
        </h2>
        <span className="badge bg-primary rounded-pill">{users.length} Users</span>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Joined</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const username = user.email.split('@')[0];
                  return (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="fw-semibold">{user.name}</td>
                    <td>
                      <code className="text-muted">@{username}</code>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email}
                      </a>
                    </td>
                    <td>
                      <span className={`badge ${user.team === 'Team Marvel' ? 'bg-danger' : 'bg-primary'}`}>
                        {user.team}
                      </span>
                    </td>
                    <td className="text-muted">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#editUserModal"
                        onClick={() => handleEditClick(user)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Edit
                      </button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="editUserModalLabel">
                  <i className="bi bi-pencil-square me-2"></i>
                  Edit User Details
                </h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSaveUser}>
                <div className="modal-body">
                  {saveError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {saveError}
                      <button type="button" className="btn-close" onClick={() => setSaveError(null)}></button>
                    </div>
                  )}
                  {saveSuccess && (
                    <div className="alert alert-success" role="alert">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      User updated successfully!
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label fw-semibold">
                      <i className="bi bi-person me-1"></i>
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editName"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editEmail" className="form-label fw-semibold">
                      <i className="bi bi-envelope me-1"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="editEmail"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditFormChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editTeam" className="form-label fw-semibold">
                      <i className="bi bi-shield-fill-check me-1"></i>
                      Team
                    </label>
                    <select
                      className="form-select"
                      id="editTeam"
                      name="team"
                      value={editForm.team}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="Team Marvel">Team Marvel</option>
                      <option value="Team DC">Team DC</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    <i className="bi bi-x-circle me-1"></i>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={saveSuccess}>
                    <i className="bi bi-save me-1"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
