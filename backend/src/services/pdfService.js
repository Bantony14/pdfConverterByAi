import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

export const createPdfFromImages = async (files) => {
    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
        let image;

        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 1200 })
            .jpeg({ quality: 70 })
            .toBuffer();

        image = await pdfDoc.embedJpg(optimizedBuffer);

        const width = image.width;
        const height = image.height;

        const page = pdfDoc.addPage([width, height]);

        page.drawImage(image, {
            x: 0,
            y: 0,
            width,
            height,
        });
    }

    return await pdfDoc.save();
};