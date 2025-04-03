const Course = require("../models/Course");
const User = require("../models/User");

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { title, description, level, videoUrl } = req.body;
        const instructor = req.user.id; // From auth middleware

        // Create initial lesson with the video URL
        const initialLesson = {
            title: "Introduction",
            description: "Course introduction",
            videoUrl,
            duration: "0:00",
            order: 1
        };

        const course = new Course({
            title,
            description,
            instructor,
            level,
            lessons: [initialLesson],
            enrolledStudents: [],
            status: 'Published'
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        console.log('Fetching all published courses...');
        const courses = await Course.find({ status: 'Published' })
            .populate('instructor', 'firstName lastName');
        console.log('Found courses:', courses);
        res.json(courses);
    } catch (error) {
        console.error('Error in getAllCourses:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get courses by instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;
        console.log('Fetching courses for instructor:', instructorId); // Debug log
        
        const courses = await Course.find({ instructor: instructorId })
            .populate('instructor', 'firstName lastName');
            
        console.log('Found courses:', courses); // Debug log
        res.json(courses);
    } catch (error) {
        console.error('Error in getInstructorCourses:', error); // Debug log
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get enrolled courses for a student
exports.getEnrolledCourses = async (req, res) => {
    try {
        const studentId = req.user.id;
        const courses = await Course.find({ enrolledStudents: studentId })
            .populate('instructor', 'firstName lastName');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        course.enrolledStudents.push(studentId);
        await course.save();

        res.json({ message: "Successfully enrolled in course" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Add lesson to course
exports.addLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, videoUrl, duration, order } = req.body;
        const instructorId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.instructor.toString() !== instructorId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        course.lessons.push({ title, description, videoUrl, duration, order });
        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Add assignment to course
exports.addAssignment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, dueDate, totalMarks } = req.body;
        const instructorId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.instructor.toString() !== instructorId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        course.assignments.push({ title, description, dueDate, totalMarks });
        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}; 