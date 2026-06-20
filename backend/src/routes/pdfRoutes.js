import express from "express";
import { convertImagesToPdf } from "../controllers/pdfController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post(
    "/convert",
    upload.array("images"),
    convertImagesToPdf
);

router.post(
    "/convert",
    upload.array("images", 100),
    convertImagesToPdf
);
export default router;