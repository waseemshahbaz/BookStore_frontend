import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: '#2C3E50',
  color: 'white',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    color: theme.palette.primary.light,
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Footer = () => {
  const quickLinks = [
    { text: 'About Us', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  const genres = [
    { text: 'Genres', path: '/products/genres' },
  ];

  const socialLinks = [
    { icon: faFacebookF, url: 'https://facebook.com' },
    { icon: faTwitter, url: 'https://twitter.com' },
    { icon: faInstagram, url: 'https://instagram.com' },
    { icon: faLinkedinIn, url: 'https://linkedin.com' },
  ];

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <FooterSection>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
                About BookStore
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 300 }}>
                Your one-stop destination for all types of books. Discover millions of eBooks, audiobooks, and more at your fingertips.
              </Typography>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
                Quick Links
              </Typography>
              {quickLinks.map((link) => (
                <Box key={link.path} mb={1}>
                  <FooterLink component={Link} to={link.path}>
                    {link.text}
                  </FooterLink>
                </Box>
              ))}
            </FooterSection>
          </Grid>

          {/* Genres */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
                Genres
              </Typography>
              {genres.map((genre) => (
                <Box key={genre.path} mb={1}>
                  <FooterLink component={Link} to={genre.path}>
                    {genre.text}
                  </FooterLink>
                </Box>
              ))}
            </FooterSection>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} sm={6} md={4}>
            <FooterSection>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display, serif' }}>
                Connect With Us
              </Typography>
              <Box mb={2}>
                {socialLinks.map((social) => (
                  <SocialButton
                    key={social.url}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </SocialButton>
                ))}
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Email: contact@bookstore.com
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Phone: (555) 123-4567
              </Typography>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} pt={3} borderTop={1} borderColor="rgba(255, 255, 255, 0.1)">
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
