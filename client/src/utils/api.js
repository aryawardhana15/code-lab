import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1'; // Backend runs on port 5000

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public endpoints
export const getTestimonials = async () => {
  try {
    const response = await api.get('/testimonials');
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getCourses = async (params = {}) => {
  try {
    const response = await api.get('/courses', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Add other API calls as needed (e.g., auth, user-specific, etc.)
// For now, focusing on public landing page and course catalog data.
