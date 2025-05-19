import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8083',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Correct way to call API methods
  sendNotification: (data) => api.post('/api/notifications', data),
  
  getNotifications: (userId) => api.get(`/api/users/${userId}/notifications`),
  
  // Health endpoints - fixed syntax
  getHealthStatus: () => api.get('/test/status'),
  testConnection: () => api.get('/actuator/health')
 
};