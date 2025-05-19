import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress, Alert } from '@mui/material';
import notificationService from '../api/notificationService';
import { Box } from '@mui/material';

export default function NotificationList({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await notificationService.getNotifications(userId);
        setNotifications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  if (!userId) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Notifications for User: {userId}
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText
                primary={notification.message}
                secondary={`Type: ${notification.type} | Date: ${new Date(notification.createdAt).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}