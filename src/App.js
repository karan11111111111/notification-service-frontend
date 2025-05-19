import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import NotificationForm from './components/NotificationForm';
import NotificationList from './components/NotificationList';
import StatusPanel from './components/StatusPanel';

export default function App() {
  const [currentUserId, setCurrentUserId] = useState('');

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <StatusPanel />
      <NotificationForm onSendSuccess={(userId) => setCurrentUserId(userId)} />
      <NotificationList userId={currentUserId} />
    </Container>
  );
}