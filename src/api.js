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

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  

// Funkcja do rejestracji użytkownika
export const registerUser = async (userData) => {
    try {
        const response = await API.post("api/auth/register", userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

// Funkcja do logowania użytkownika
export const loginUser = async (username, password) => {
    try {
        const response = await API.post("/api/auth/login", { username, password });
        if (response.data.token) {
            // Zapisz token w localStorage
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

// Funkcja do wylogowania (czyści token)
export const logoutUser = () => {
    localStorage.removeItem("token");
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
    try {
        const response = await API.get("/Courses/all");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch courses");
    }
};

export const fetchSolutionsByAssignmentId = async (assignmentId) => {
    const response = await API.get(`/solutions/assignment/${assignmentId}`);
    return response.data;
};