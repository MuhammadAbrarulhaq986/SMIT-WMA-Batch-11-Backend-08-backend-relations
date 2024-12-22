
import express from "express"

import { addStudent, allStudents, getStudent } from "../controllers/student.cotrollers.js"

const router = express.Router();

router.post("/student", addStudent);
router.get("/student/:id", getStudent);
router.get("/students", allStudents);

export default router;