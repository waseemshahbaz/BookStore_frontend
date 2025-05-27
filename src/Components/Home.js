import HomeBackground from '../Pictures/Home.jpg';
import '../Syles/Home.css';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper, Fade, Zoom, Slide } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faTruck, faStar, faUsers, faArrowDown, faBook } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const floatBook = keyframes`
  0% { transform: translateY(0) rotate(-8deg); }
  50% { transform: translateY(-24px) rotate(8deg); }
  100% { transform: translateY(0) rotate(-8deg); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(120deg, rgba(44,62,80,0.7), rgba(62,81,81,0.6)), url(${HomeBackground}) center/cover no-repeat`,
  zIndex: 1,
  overflow: 'hidden',
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(30, 41, 59, 0.5)',
  zIndex: 2,
  animation: `${overlayFadeIn} 1.2s`,
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(6, 2, 2, 2),
  maxWidth: 700,
  margin: '0 auto',
}));

const AnimatedHeadline = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontFamily: 'Playfair Display, serif',
  mb: 2,
  letterSpacing: 1,
  fontSize: '2.8rem',
  background: 'linear-gradient(90deg, #fbbf24 20%, #38bdf8 80%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'headlineReveal 1.2s cubic-bezier(.4,2,.3,1)',
  '@keyframes headlineReveal': {
    '0%': { opacity: 0, letterSpacing: 8 },
    '100%': { opacity: 1, letterSpacing: 1 },
  },
}));

const FloatingBook = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 60,
  left: 60,
  zIndex: 4,
  animation: `${floatBook} 3.5s ease-in-out infinite`,
  opacity: 0.18,
  fontSize: 120,
  pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const FloatingBookRight = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 80,
  right: 80,
  zIndex: 4,
  animation: `${floatBook} 4.2s 1.2s ease-in-out infinite`,
  opacity: 0.13,
  fontSize: 100,
  pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const ScrollIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 32,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 4,
  color: '#fff',
  opacity: 0.7,
  fontSize: 32,
  animation: 'bounce 1.5s infinite',
  '@keyframes bounce': {
    '0%, 100%': { transform: 'translateY(0) translateX(-50%)' },
    '50%': { transform: 'translateY(16px) translateX(-50%)' },
  },
}));

const AboutSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2, 10, 2),
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2, 10, 2),
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5, 3),
  borderRadius: 18,
  boxShadow: '0 6px 24px rgba(44, 62, 80, 0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 220,
  transition: 'all 0.3s',
  background: 'linear-gradient(120deg, #f5f7fa 60%, #e3e9f0 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 12px 32px rgba(44, 62, 80, 0.18)',
    transform: 'translateY(-6px) scale(1.06)',
    background: 'linear-gradient(120deg, #e3e9f0 60%, #f5f7fa 100%)',
  },
}));

const FeatureIconGlow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 18,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'radial-gradient(circle, #fbbf24 0%, #fffbe6 80%, transparent 100%)',
  filter: 'blur(12px)',
  opacity: 0.25,
  zIndex: 0,
}));

const CTASection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  background: 'linear-gradient(120deg, #e3e9f0 60%, #f5f7fa 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2, 10, 2),
}));

const Home = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '300vh', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Overlay />
        <FloatingBook>
          <FontAwesomeIcon icon={faBook} />
        </FloatingBook>
        <FloatingBookRight>
          <FontAwesomeIcon icon={faBookOpen} />
        </FloatingBookRight>
        <HeroContent>
          <Fade in timeout={1200}>
            <Box>
              <Slide in direction="up" timeout={1200}>
                <AnimatedHeadline variant="h2">
                  Welcome to our Book Store
                </AnimatedHeadline>
              </Slide>
              <Zoom in style={{ transitionDelay: '600ms' }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 400, color: 'rgba(255,255,255,0.92)' }}>
                  Explore a world of <span style={{ color: '#fbbf24', fontWeight: 700 }}>KNOWLEDGE</span> and <span style={{ color: '#38bdf8', fontWeight: 700 }}>IMAGINATION</span>
                </Typography>
              </Zoom>
              <Slide in direction="up" timeout={1400}>
                <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.85)' }}>
                  Where <span style={{ color: '#a3e635', fontWeight: 700 }}>DREAMS</span> are made
                </Typography>
              </Slide>
              <Zoom in style={{ transitionDelay: '900ms' }}>
                <Link to={'/products'} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="large" color="primary" sx={{ px: 5, py: 1.5, fontWeight: 700, fontSize: 20, borderRadius: 8, boxShadow: 3, letterSpacing: 1, transition: 'all 0.3s', '&:hover': { background: 'linear-gradient(90deg, #fbbf24, #38bdf8)' } }}>
                    START NOW
                  </Button>
                </Link>
              </Zoom>
            </Box>
          </Fade>
        </HeroContent>
        <ScrollIndicator>
          <FontAwesomeIcon icon={faArrowDown} />
        </ScrollIndicator>
      </HeroSection>

      {/* About/Business Section */}
      <AboutSection>
        <Fade in timeout={1200}>
          <Box maxWidth={900} textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Playfair Display, serif', mb: 2, color: 'primary.main' }}>
              About BookStore
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
              BookStore is your trusted partner in the journey of reading. We connect readers with a vast collection of books, from timeless classics to the latest bestsellers. Our mission is to inspire, educate, and empower through the magic of books.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <FontAwesomeIcon icon={faBookOpen} size="2x" style={{ color: '#6366f1', marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Vast Selection</Typography>
                  <Typography variant="body2" color="text.secondary">Thousands of titles across every genre and age group.</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <FontAwesomeIcon icon={faUsers} size="2x" style={{ color: '#22d3ee', marginBottom: 12 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Community</Typography>
                  <Typography variant="body2" color="text.secondary">Join a passionate community of readers and authors.</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </AboutSection>

      {/* Features/Benefits Section */}
      <FeaturesSection>
        <Fade in timeout={1200}>
          <Box maxWidth={1100} width="100%">
            <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Playfair Display, serif', mb: 6, color: 'primary.main', textAlign: 'center' }}>
              Why Choose Us?
            </Typography>
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <FeatureCard>
                  <FeatureIconGlow />
                  <FontAwesomeIcon icon={faStar} size="2x" style={{ color: '#fbbf24', marginBottom: 16, zIndex: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, zIndex: 1 }}>Expert Recommendations</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ zIndex: 1 }}>Personalized book suggestions from our team of experts.</Typography>
                </FeatureCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FeatureCard>
                  <FeatureIconGlow />
                  <FontAwesomeIcon icon={faTruck} size="2x" style={{ color: '#38bdf8', marginBottom: 16, zIndex: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, zIndex: 1 }}>Fast Delivery</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ zIndex: 1 }}>Get your books delivered quickly and reliably to your doorstep.</Typography>
                </FeatureCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FeatureCard>
                  <FeatureIconGlow />
                  <FontAwesomeIcon icon={faBookOpen} size="2x" style={{ color: '#a3e635', marginBottom: 16, zIndex: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, zIndex: 1 }}>Curated Collections</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ zIndex: 1 }}>Discover handpicked collections for every interest and age.</Typography>
                </FeatureCard>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </FeaturesSection>

      {/* Call to Action Section */}
      <CTASection>
        <Fade in timeout={1200}>
          <Box textAlign="center" maxWidth={700}>
            <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'Playfair Display, serif', mb: 3, color: 'primary.main' }}>
              Ready to Start Your Reading Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
              Sign up now and get exclusive access to new arrivals, special offers, and a world of stories.
            </Typography>
            <Link to={'/signup'} style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" color="primary" sx={{ px: 5, py: 1.5, fontWeight: 700, fontSize: 20, borderRadius: 8, boxShadow: 3, letterSpacing: 1, transition: 'all 0.3s', '&:hover': { background: 'linear-gradient(90deg, #fbbf24, #38bdf8)' } }}>
                Join Now
              </Button>
            </Link>
          </Box>
        </Fade>
      </CTASection>
    </Box>
  );
};

export default Home;
