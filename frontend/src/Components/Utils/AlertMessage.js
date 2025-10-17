import React from 'react';
import { Alert, Collapse, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertMessage({ message, type = 'info', onClose }) {
  return (
    <Collapse in={!!message}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Alert
          severity={type}
          variant="filled" // solid background
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            fontSize: '1rem', // increased font size
            py: 1.2,
            px: 2,
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: 300, // ⬅️ limit box width
            width: '100%',
            backgroundColor: getCustomBgColor(type),
            color: '#fff',
          }}
        >
          {message}
        </Alert>
      </Box>
    </Collapse>
  );
}

// 🔧 Optional helper for custom background colors
function getCustomBgColor(type) {
  switch (type) {
    case 'success':
      return '#2e7d32'; // dark green
    case 'error':
      return '#c62828'; // dark red
    case 'warning':
      return '#ed6c02'; // dark orange
    case 'info':
    default:
      return '#0288d1'; // dark blue
  }
}
