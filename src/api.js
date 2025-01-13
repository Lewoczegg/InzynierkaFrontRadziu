import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:8080",
});

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

export const executeCode = async (language, sourceCode, taskId) => {
    const response = await API.post("/Assignment/run", {
        code: sourceCode,
        taskId: taskId,
        language: language,
    });
    return response.data;
};

export const registerUser = async (userData) => {
    try {
        const response = await API.post("api/auth/register", userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

export const loginUser = async (username, password) => {
    try {
        //wysyła zapytanie do serwera
        const response = await API.post("/api/auth/login", { username, password });
        if (response.data.token) {
            //przechowuje token w localStorage
            localStorage.setItem("token", response.data.token);
        }
        //zwraca dane z odpowiedzi
        return response.data;
    } catch (error) {
        //jeśli wystąpi błąd, zwraca komunikat o błędzie
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

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

export const submitAssignment = async (taskId, language, sourceCode) => {
    try {
        const response = await API.post("/Assignment/submit", {
            taskId: taskId,
            language: language,
            code: sourceCode,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to submit assignment:", error);
        throw error;
    }
};

export const fetchLatestSubmission = async (taskId) => {
    try {
        const response = await API.post("/Submission/latest-submission", {
            taskId: taskId,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch the latest submission.");
    }
};

export const fetchUserInfo = async () => {
    try {
        const response = await API.get("/api/auth/user-info");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch user info.");
    }
};


export const fetchUserProgress = async () => {
    try {
        const response = await API.get("/Assignment/all-submissions");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch user progress.");
    }
};

export const fetchVisibleCourses = async () => {
    try {
        const response = await API.get("/Courses/visible-courses");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch courses.");
    }
};

export const fetchVisibleLessons = async () => {
    const response = await API.get("/Lessons/visible-lessons");
    return response.data;
};

export const fetchVisibleAssignments = async () => {
    const response = await API.get("/Assignment/visible-assignments");
    return response.data;
};

export const fetchDailyQuiz = async () => {
    try {
        const response = await API.get("/Quiz/daily");
        if (response.data.message && response.data.message === "Zrobiłeś już dzisiaj quiz") {
            return response.data;
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitQuizResult = async (quizResult) => {
    const response = await API.post("/QuizResult/submit", quizResult);
    return response.data;
};

export const fetchUserRanking = async () => {
    const response = await API.get("/QuizResult/total-points");
    return response.data;
};

export const fetchTotalPoints = async () => {
    const response = await API.get("/DailyTaskResult/total-points");
    return response.data;
};

export const fetchDailyTask = async () => {
    const response = await API.get("/DailyTask/daily");
    return response.data;
  };

export const submitDailyTask = async (taskId, sourceCode, language, startTime) => {
    const response = await API.post("/DailyTaskResult/complete", {
        userCode: sourceCode,
        taskId: taskId,
        language: language,
        startTime: startTime,
    });
    return response.data;
};

export const fetchDailyTaskById = async (taskId) => {
        const response = await API.get(`/DailyTask/${taskId}`);
        return response.data;

}

export const fetchAssignmentCompletionPercentage = async () => {
    try {
        const response = await API.get('/Progress/assignmentCompletionPercentage');
        return response.data;
    } catch (error) {
        console.error("Error in fetchAssignmentCompletionPercentage:", error.response);
        throw new Error(error.response?.data?.message || "Failed to fetch assignment completion percentage.");
    }
};

export const fetchCourseCompletionPercentage = async () => {
    try {
        const response = await API.get('/Progress/courseCompletionPercentage');
        return response.data;
    } catch (error) {
        console.error("Error in fetchCourseCompletionPercentage:", error.response);
        throw new Error(error.response?.data?.message || "Failed to fetch course completion percentage.");
    }
};

export const fetchLessonCompletionPercentage = async () => {
    try {
        const response = await API.get('/Progress/lessonCompletionPercentage');
        return response.data;
    } catch (error) {
        console.error("Error in fetchLessonCompletionPercentage:", error.response);
        throw new Error(error.response?.data?.message || "Failed to fetch lesson completion percentage.");
    }
};

export const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('video', file);
    try {
      const response = await API.post(`/VideoMetadata/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  };

export const fetchVideo = async (videoId) => {
    try {
        const response = await API.get(`/VideoMetadata/stream/${videoId}.mp4`, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching video:", error);
        throw error; 
    }
};

export const analyzeCodeRequest = async (message) => {
    try {
        const response = await API.post("/CodeAnalysis/run-and-analyze", {
            message
        });
        return response.data;
    } catch (error) {
        console.error("Error in analyzeCodeRequest:", error.response);
        throw new Error(error.response?.data?.message || "Failed to analyze code.");
    }
};
