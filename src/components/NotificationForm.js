import React, { useState } from 'react';
import { Button, TextField,MenuItem, Typography, Alert } from '@mui/material';
import notificationService from '../api/notificationService';
import { Box } from '@mui/material';



export default function NotificationForm({ onSendSuccess }) {
  const [formData, setFormData] = useState({
    userId: '',
    type: 'EMAIL',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await notificationService.sendNotification(formData);
      onSendSuccess(formData.userId);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Send Notification</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="User ID"
        value={formData.userId}
        onChange={(e) => setFormData({...formData, userId: e.target.value})}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Type"
        value={formData.type}
        onChange={(e) => setFormData({...formData, type: e.target.value})}
        fullWidth
        margin="normal"
        required
      >
        {['EMAIL', 'SMS', 'IN_APP'].map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />

      <Button 
        type="submit" 
        variant="contained" 
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </Button>
    </Box>
  );
}