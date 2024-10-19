import axios from "axios";
const API = axios.create({ 
    baseURL: "http://localhost:8080/Assignment",
});

export const executeCode = async (language, sourceCode) => {
    const response = await API.post("/submit", { 
        code: sourceCode, 
        taskId: 1, 
        language: language, 
    });
    return response.data;
};