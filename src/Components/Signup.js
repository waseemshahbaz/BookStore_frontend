import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { POST_API } from '../APIs/RestApis';

const StyledPaper = styled(Paper)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #FFFFFF 100%)`,
    padding: theme.spacing(4),
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme.palette.secondary.light}`,
}));

const IconWrapper = styled('div')(({ theme }) => ({
    fontSize: 48,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 35%, ${theme.palette.secondary.main} 100%)`,
    padding: theme.spacing(3),
}));

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { confirmPassword, ...registerData } = formData;
            const response = await axios.post('/api/v1/auth/register', registerData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <StyledContainer maxWidth={false}>
            <Container component="main" maxWidth="sm">
                <StyledPaper elevation={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <IconWrapper>
                            <FontAwesomeIcon icon={faBookOpen} />
                        </IconWrapper>
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                mb: 2
                            }}
                        >
                            Join Our Library
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{ mb: 4, color: 'text.secondary' }}
                        >
                            Create an account to start your reading adventure
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="given-name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            {error && (
                                <Typography 
                                    color="error" 
                                    align="center" 
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    {error}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                }}
                            >
                                Create Account
                            </Button>
                            <Typography align="center" sx={{ color: 'text.secondary' }}>
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    style={{ 
                                        color: '#5C3D2E',
                                        textDecoration: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Sign In
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </StyledPaper>
            </Container>
        </StyledContainer>
    );
};

export default Signup; 