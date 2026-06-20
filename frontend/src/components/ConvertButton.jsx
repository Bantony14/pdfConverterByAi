import { useState } from "react";
import toast from "react-hot-toast";
import { convertToPdf } from "../services/pdfService";

function ConvertButton({ images }) {
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        try {
            if (images.length === 0) {
                return toast.error("Please upload images first");
            }

            setLoading(true);

            const formData = new FormData();

            images.forEach((image) => {
                formData.append("images", image);
            });

            const pdfBlob = await convertToPdf(formData);

            const url = window.URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");

            link.href = url;
            link.download = `images-to-pdf-${Date.now()}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            toast.success("PDF Downloaded Successfully");
        } catch (error) {
            toast.error("PDF Conversion Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
            {loading ? "Converting..." : "Convert To PDF"}
        </button>
    );
}

export default ConvertButton;