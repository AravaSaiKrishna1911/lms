import React from 'react';
import './Admin.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="admin-content">
                <div className="admin-section">
                    <h2>Instructor Management</h2>
                    <button className="admin-btn">Add Instructor</button>
                    <button className="admin-btn">View Instructors</button>
                    <button className="admin-btn">Delete Instructor</button>
                </div>
                <div className="admin-section">
                    <h2>Course Management</h2>
                    <button className="admin-btn">Add Course</button>
                    <button className="admin-btn">View Courses</button>
                    <button className="admin-btn">Update Course</button>
                </div>
                <div className="admin-section">
                    <h2>System Settings</h2>
                    <button className="admin-btn">Manage Users</button>
                    <button className="admin-btn">System Updates</button>
                </div>
            </div>
        </div>
    );
};

export default Admin; 