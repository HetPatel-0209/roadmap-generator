import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

export const generateRoadmap = async (topic, style) => {
  try {
    const response = await axios.post(`${API_URL}/generate-roadmap`, { topic, style });
    return response.data.roadmap;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};