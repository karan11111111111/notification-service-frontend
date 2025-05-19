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

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const [health, test] = await Promise.all([
          notificationService.getHealthStatus(),
          notificationService.testConnection()
        ]);
        
        setStatus({
          loading: false,
          status: health.data.status,
          message: test.data,
          error: null
        });
      } catch (err) {
        setStatus({
          loading: false,
          status: 'DOWN',
          message: '',
          error: err.message
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Refresh every 30s
    
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
              <Alert severity="error" sx={{ mb: 2 }}>{status.error}</Alert>
            )}
            <Typography>{status.message || 'No status message'}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}