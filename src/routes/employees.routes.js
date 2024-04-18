import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all quotation
router.get("/quotation", getEmployees);

// GET An quotation by id
router.get("/quotation/:id", getEmployee);

// DELETE An Employee
router.delete("/quotation/:id", deleteEmployee);

// INSERT An quotation
router.post("/quotation", createEmployee);

router.patch("/quotation/:id", updateEmployee);

export default router;
