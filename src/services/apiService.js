import axios from 'axios';

// The base URL for your backend server
// Change this to the deployed server URL in production
const BASE_URL = 'http://127.0.0.1:5000'; 

export const analyzeResume = async (resumeFile) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
        const response = await axios.post(`${BASE_URL}/analyze-resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during resume analysis:', error);
        throw error;
    }
};
