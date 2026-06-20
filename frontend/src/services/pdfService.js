import axios from "axios";

export const convertToPdf = async (formData) => {
    const response = await axios.post(
        "http://localhost:5000/api/v1/pdf/convert",
        formData,
        {
            responseType: "blob",
        }
    );

    return response.data;
};