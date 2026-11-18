
import { Router } from "express";
import { checkDatabase } from "../controllers/health.controller.js";

const router = Router();

// Endpoint untuk memeriksa koneksi database
router.get("/db", checkDatabase);

export default router;
