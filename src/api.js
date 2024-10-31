import axios from "axios";
const API = axios.create({ 
    baseURL: "http://localhost:8080",
});

export const executeCode = async (language, sourceCode, taskId) => {
    const response = await API.post("/Assignment/submit", { 
        code: sourceCode, 
        taskId: taskId, 
        language: language, 
    });
    return response.data;
};


export const fetchAssignments = async () => {
    const response = await API.get("/Assignment/all");
    return response.data;
};

export const fetchAssignmentById = async (assignmentId) => {
    const response = await API.get(`/Assignment/${assignmentId}`);
    return response.data;
};

export const fetchLessons = async () => {
    const response = await API.get("/Lessons/all");
    return response.data;
};

export const fetchCourses = async () => {
    const response = await API.get("/Courses/all");
    return response.data;
};

export const fetchSolutionsByAssignmentId = async (assignmentId) => {
    const response = await API.get(`/solutions/assignment/${assignmentId}`);
    return response.data;
};