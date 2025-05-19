import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Chip, Alert } from '@mui/material';
import notificationService from '../api/notificationService';

export default function StatusPanel() {

  
  
  const [status, setStatus] = useState({
    loading: true,
    status: null,
    message: '',
    error: null
  });

 const checkStatus = async () => {
  try {
    const response = await notificationService.getHealthStatus();
    setStatus({
      loading: false,
      status: 'UP',
      message: 'Service is running.',
      error: null
    });
  } catch (err) {
    setStatus({
      loading: false,
      status: 'DOWN',
      message: '',
      error: err.message || 'Service unavailable'
    });
  }
};


  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);



  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Service Status
          {!status.loading && (
            <Chip 
              label={status.status || 'UNKNOWN'} 
              color={status.status === 'UP' ? 'success' : 'error'} 
              sx={{ ml: 2 }}
            />
          )}
        </Typography>

        {status.loading ? (
          <CircularProgress size={24} />
        ) : (
          <>
            {status.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {status.error.includes('Network error') ? (
                  <>
                    Could not connect to server. Please check:
                    <ul>
                      <li>Backend service is running</li>
                      <li>Correct API URL: {process.env.REACT_APP_API_URL}
</li>
                      <li>No CORS issues (check browser console)</li>
                    </ul>
                  </>
                ) : (
                  status.error
                )}
              </Alert>
            )}
            <Typography>{status.message || 'No status message'}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}