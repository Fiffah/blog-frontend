import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
        
        const token = response.data.token;
        localStorage.setItem("token", token);

        return response.data;
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        throw error;
    }
};

export const createPost = async (title, content) => {
    try {
        const response = await axios.post(
            `${API_URL}/posts`,
            { title, content },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error.response?.data || error.message);
        throw error;
    }
};

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        throw error;
    }
};

export const updatePost = async (id, post) => {
    try {
        const response = await axios.put(`${API_URL}/posts/${id}`, post, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error.response?.data || error.message);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/posts/${id}`, {
            headers: getAuthHeaders()
        });
    } catch (error) {
        console.error("Error deleting post:", error.response?.data || error.message);
        throw error;
    }
};
