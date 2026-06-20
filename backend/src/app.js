import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "https://pdf-converter-by-bantony.vercel.app",
        credentials: true
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server Running",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Server Healthy",
    });
});

app.use("/api/v1/pdf", pdfRoutes);


app.use(errorMiddleware);

export default app;