import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}));

const BookIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  fontSize: '2rem',
  color: theme.palette.primary.main,
  animation: 'float 2s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const Loading = () => {
  return (
    <LoadingContainer>
      <BookIcon icon={faBook} />
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body1" color="textSecondary">
        Loading books...
      </Typography>
    </LoadingContainer>
  );
};

export default Loading;
