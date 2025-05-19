import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8083',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Notification endpoints
  sendNotification: (data) => api.post('/api/notifications', {
    userId: data.userId,
    type: data.type,  // Must use 'type' as confirmed working
    message: data.message
  }),
  
  getNotifications: (userId) => api.get(`/api/users/${userId}/notifications`),
  
  // Health/status endpoints
  getHealthStatus: () => axios.api.get('http://localhost:8083/test/status'),
  testConnection: () => axios.api.get('http://localhost:8083/actuator/health')
};