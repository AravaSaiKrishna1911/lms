import React, { useState, useEffect } from 'react';
import './CourseDetail.css';

const CourseDetail = ({ course }) => {
    const [currentLesson, setCurrentLesson] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        if (course && course.lessons) {
            setLessons(course.lessons);
            if (course.lessons.length > 0) {
                setCurrentLesson(course.lessons[0]);
            }
        }
    }, [course]);

    const handleLessonSelect = (lesson) => {
        setCurrentLesson(lesson);
    };

    const getEmbedUrl = (url) => {
        // Handle YouTube URLs
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId[1]}`;
            }
        }
        // Handle Vimeo URLs
        if (url.includes('vimeo.com')) {
            const videoId = url.match(/(?:vimeo\.com\/|video\/)(\d+)/);
            if (videoId) {
                return `https://player.vimeo.com/video/${videoId[1]}`;
            }
        }
        // Return original URL if not YouTube or Vimeo
        return url;
    };

    return (
        <div className="course-detail">
            <div className="course-header">
                <h1>{course.title}</h1>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                    <span className="instructor">Instructor: {course.instructor?.firstName} {course.instructor?.lastName}</span>
                    <span className="level">Level: {course.level}</span>
                </div>
            </div>

            <div className="course-content">
                <div className="video-player">
                    {currentLesson ? (
                        <>
                            <h2>{currentLesson.title}</h2>
                            <div className="video-container">
                                <iframe
                                    src={getEmbedUrl(currentLesson.videoUrl)}
                                    title={currentLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="lesson-description">
                                <h3>About this lesson</h3>
                                <p>{currentLesson.description}</p>
                            </div>
                        </>
                    ) : (
                        <div className="no-lesson">
                            <p>Select a lesson to start learning</p>
                        </div>
                    )}
                </div>

                <div className="lessons-list">
                    <h3>Course Lessons</h3>
                    <ul>
                        {lessons.map((lesson, index) => (
                            <li
                                key={index}
                                className={currentLesson === lesson ? 'active' : ''}
                                onClick={() => handleLessonSelect(lesson)}
                            >
                                <span className="lesson-number">{index + 1}</span>
                                <span className="lesson-title">{lesson.title}</span>
                                <span className="lesson-duration">{lesson.duration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail; 