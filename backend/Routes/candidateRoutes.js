import express from "express";
import { body } from "express-validator";
import {
  addCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  getAnalytics,
} from "../controllers/candidateController.js";

const router = express.Router();

// Validation middleware for candidate creation
const validateCandidate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Role must be between 2 and 100 characters"),

  body("experience")
    .isNumeric()
    .withMessage("Experience must be a number")
    .isInt({ min: 0, max: 50 })
    .withMessage("Experience must be between 0 and 50 years"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),

  body("resumeLink")
    .optional()
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
      require_valid_protocol: true,
      allow_underscores: true,
      allow_localhost: true,
    })
    .withMessage("Please provide a valid URL for resume link"),

  body("status")
    .optional()
    .isIn(["Applied", "Interview", "Offer", "Rejected"])
    .withMessage("Status must be one of: Applied, Interview, Offer, Rejected"),
];

// Routes
router.post("/", validateCandidate, addCandidate);
router.get("/", getCandidates);
router.get("/analytics", getAnalytics);
router.get("/:id", getCandidateById);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

export default router;
