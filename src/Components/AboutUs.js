import React from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUsers, faGlobe, faHandshake } from '@fortawesome/free-solid-svg-icons';

const Section = styled(Box)(({ theme }) => ({
  minHeight: '60vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2, 10, 2),
}));

const ValueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  borderRadius: 16,
  boxShadow: '0 4px 16px rgba(44, 62, 80, 0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 180,
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(44, 62, 80, 0.18)',
    transform: 'translateY(-4px) scale(1.03)',
  },
}));

const AboutUs = () => (
  <Section>
    <Box maxWidth={900} textAlign="center" mb={6}>
      <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Playfair Display, serif', mb: 2, color: 'primary.main' }}>
        About BookStore
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}>
        BookStore is dedicated to connecting readers with stories that inspire, educate, and entertain. Our mission is to foster a love for reading and build a vibrant community of book lovers.
      </Typography>
      <Divider sx={{ my: 4 }} />
    </Box>
    <Grid container spacing={5} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <ValueCard>
          <FontAwesomeIcon icon={faBookOpen} size="2x" style={{ color: '#6366f1', marginBottom: 16 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Our Mission</Typography>
          <Typography variant="body2" color="text.secondary">To make books accessible to everyone and ignite curiosity through a diverse collection.</Typography>
        </ValueCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ValueCard>
          <FontAwesomeIcon icon={faUsers} size="2x" style={{ color: '#22d3ee', marginBottom: 16 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Community</Typography>
          <Typography variant="body2" color="text.secondary">We believe in the power of community and strive to connect readers and authors worldwide.</Typography>
        </ValueCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ValueCard>
          <FontAwesomeIcon icon={faHandshake} size="2x" style={{ color: '#fbbf24', marginBottom: 16 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Trust & Service</Typography>
          <Typography variant="body2" color="text.secondary">We are committed to providing exceptional service and building trust with every interaction.</Typography>
        </ValueCard>
      </Grid>
    </Grid>
    <Box mt={8} maxWidth={700} textAlign="center">
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
        Join us on our journey to make the world a better place, one book at a time.
      </Typography>
    </Box>
  </Section>
);

export default AboutUs; 