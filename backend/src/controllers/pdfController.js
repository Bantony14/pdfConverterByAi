import { createPdfFromImages } from "../services/pdfService.js";

export const convertImagesToPdf = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            throw new Error("Please upload at least one image");
        }

        const pdfBytes = await createPdfFromImages(req.files);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=converted.pdf",
            "Content-Length": pdfBytes.length,
        });

        res.end(pdfBytes);
    } catch (error) {
        next(error);
    }
};