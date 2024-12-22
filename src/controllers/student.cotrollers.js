import Student from "../models/students.model.js";
import Course from "../models/course.model.js";
import mongoose from "mongoose";


const addStudent = async (req, res) => {
    const { fullName, email, enrolledCourse } = req.body;

    if (!fullName) return res.status(400).json({
        message: "Fullname is required",
    });
    if (!email) return res.status(400).json({
        message: "Email  is required",
    });

    const student = await Student.create({
        fullName,
        email,
        enrolledCourse,
    });

    const course = await Course.findByIdAndUpdate(enrolledCourse, {
        $push: { enrolledStudents: student._id },
    });
    res.json({ message: "student added successfully" });
};

const getStudent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Type.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Not Valid Id" });
    }

    const student = await Student.findById(id).populate("enrolledCourse");
    if (!student) {
        res.status(404).json({
            message: "No Student found!",
        });
        return;
    }
    res.status(200).json(student);
}

const allStudents = async (req, res) => {
    try {
        // Fetch all students and populate their enrolledCourse field
        const students = await Student.find().populate("enrolledCourse");

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving students", error: error.message });
    }
};


export { addStudent, getStudent, allStudents }