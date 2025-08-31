// This file contains all API helpers and the single source of API_BASE_URL for maintainability.
// For cloud dev, use the public backend URL:
export const API_BASE_URL = 'https://8080-firebase-code-lab-1756655233115.cluster-ulqnojp5endvgve6krhe7klaws.cloudworkstations.dev/api';

import axios from 'axios';

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
// TODO: Add more API helpers here for leaderboard, auth, user-specific, etc. to ensure all API calls are consistent.



