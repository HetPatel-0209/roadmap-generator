import axios from 'axios';

const API_URL = '/api'; // This will work both in development and production

export const generateRoadmap = async (topic, style) => {
  try {
    const response = await axios.post(`${API_URL}/generate-roadmap`, { topic, style });
    return response.data.roadmap;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};