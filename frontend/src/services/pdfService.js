import axios from "axios";

export const convertToPdf = async (formData) => {
    const response = await axios.post(
        "https://bantony-pdf-api.onrender.com/api/v1/pdf/convert",
        formData,
        {
            responseType: "blob",
        }
    );

    return response.data;
};