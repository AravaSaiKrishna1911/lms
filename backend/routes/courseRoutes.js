const express = require("express");
const { 
    createCourse, 
    getAllCourses, 
    getInstructorCourses, 
    getEnrolledCourses, 
    enrollInCourse,
    addLesson,
    addAssignment
} = require("../controllers/courseController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

// Public routes
router.get("/", getAllCourses);

// Protected routes
router.post("/", auth, checkRole(['instructor', 'admin']), createCourse);
router.get("/instructor", auth, checkRole(['instructor']), getInstructorCourses);
router.get("/enrolled", auth, checkRole(['student']), getEnrolledCourses);
router.post("/:courseId/enroll", auth, checkRole(['student']), enrollInCourse);
router.post("/:courseId/lessons", auth, checkRole(['instructor']), addLesson);
router.post("/:courseId/assignments", auth, checkRole(['instructor']), addAssignment);

module.exports = router; 