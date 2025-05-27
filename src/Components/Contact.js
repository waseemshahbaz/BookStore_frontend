import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Section = styled(Box)(({ theme }) => ({
  minHeight: '70vh',
  background: 'linear-gradient(135deg, #e3e9f0 0%, #f5f7fa 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2, 10, 2),
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  borderRadius: 16,
  boxShadow: '0 4px 16px rgba(44, 62, 80, 0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 180,
  transition: 'all 0.3s',
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
}));

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <Section>
      <Box maxWidth={700} textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Playfair Display, serif', mb: 2, color: 'primary.main' }}>
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}>
          Have a question or want to get in touch? Fill out the form below or use our contact information.
        </Typography>
        <Divider sx={{ my: 4 }} />
      </Box>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} md={6}>
          <ContactCard>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                minRows={4}
                required
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, px: 5, py: 1.2, fontWeight: 700, borderRadius: 8 }}>
                Send Message
              </Button>
              {submitted && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                  Thank you for contacting us! We'll get back to you soon.
                </Typography>
              )}
            </form>
          </ContactCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
              Business Contact Info
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 12, color: '#6366f1' }} />
              <Typography variant="body1">contact@bookstore.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: 12, color: '#22d3ee' }} />
              <Typography variant="body1">(555) 123-4567</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 12, color: '#fbbf24' }} />
              <Typography variant="body1">123 Book St, Reading City, 12345</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default Contact; 