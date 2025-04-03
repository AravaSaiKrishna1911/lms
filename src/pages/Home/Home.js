import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard/CourseCard';
import './Home.css';

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            console.log('Fetching courses from:', `${API_URL}/api/courses`);
            const response = await fetch(`${API_URL}/api/courses`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch courses');
            }
            
            const data = await response.json();
            console.log('Received courses:', data);
            
            if (!Array.isArray(data)) {
                throw new Error('Invalid response format: expected an array of courses');
            }
            
            setCourses(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <section className="hero">
                <h1>Welcome to Our Learning Platform</h1>
                <p>Discover and enroll in courses to enhance your skills</p>
                <div className="cta-buttons">
                    <Link to="/register" className="cta-button primary">Get Started</Link>
                    <Link to="/login" className="cta-button secondary">Login</Link>
                </div>
            </section>

            <section className="featured-courses">
                <h2>Featured Courses</h2>
                {loading ? (
                    <div className="loading">Loading courses...</div>
                ) : error ? (
                    <div className="error">
                        <p>{error}</p>
                        <button onClick={fetchCourses} className="retry-button">Retry</button>
                    </div>
                ) : courses.length === 0 ? (
                    <p className="no-courses">No courses available at the moment.</p>
                ) : (
                    <div className="courses-grid">
                        {courses.map(course => (
                            <CourseCard 
                                key={course._id} 
                                course={course}
                                onClick={() => window.location.href = `/course/${course._id}`}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="features">
                <div className="feature">
                    <h3>Learn from Experts</h3>
                    <p>Access courses created by industry professionals</p>
                </div>
                <div className="feature">
                    <h3>Flexible Learning</h3>
                    <p>Learn at your own pace, anytime, anywhere</p>
                </div>
                <div className="feature">
                    <h3>Interactive Content</h3>
                    <p>Engage with video lessons and assignments</p>
                </div>
            </section>
        </div>
    );
};

export default Home;