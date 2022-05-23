import express from "express";
import { getFiles, getFileById } from "../controllers/fileController.js";

const router = express.Router();

router.route("/").get(getFiles);

router.route("/:id").get(getFileById);

export default router;
