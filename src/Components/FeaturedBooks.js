import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Rating, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { GET_API } from '../APIs/RestApis';
import { GET_ALL_BOOKS } from '../COMMON/CONSTANTS';
import Sidebar from './Sidebar';
import Loading from './Loading';
import BookCover from './BookCover';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginLeft: 240,
  minWidth: 'Calc(100vw - 270px )',
  padding: theme.spacing(3),
  marginTop: 64,
  minHeight: 'calc(100vh - 64px)',
  background: '#f5f5f5',
}));

const FeaturedBookPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  gap: theme.spacing(3),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetFeaturedBooks = async () => {
      setIsLoading(true);
      try {
        const result = await GET_API(GET_ALL_BOOKS, {
          headers: { "ngrok-skip-browser-warning": "1" },
          params: {
            page: 0,
            size: 20,
            searchItem: '',
        },
        });
        
        const allBooks = result.content;
        const shuffled = allBooks.sort(() => 0.5 - Math.random());
        setFeaturedBooks(shuffled.slice(0, 5));

      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetFeaturedBooks();
  }, []);

  const getFeatureReason = (book) => {
    const avgRating = book.ratings?.reduce((acc, rating) => acc + rating, 0) / book.ratings?.length || 0;
    if (avgRating >= 4.5) {
      return "Exceptional reader ratings and critical acclaim.";
    }
    if (book.publicationYear > new Date().getFullYear() - 2) {
      return "A recent bestseller hitting all the top charts.";
    }
    return "A timeless classic beloved by our community.";
  };

  if (isLoading) {
    return (
      <Box display="flex">
        <Sidebar />
        <StyledContainer>
          <Loading />
        </StyledContainer>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Sidebar />
      <StyledContainer>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display, serif', mb: 4 }}>
          <FontAwesomeIcon icon={faTrophy} style={{ marginRight: '12px', color: '#FFD700' }} />
          Featured Books
        </Typography>
        <Fade in={true} timeout={1000}>
          <Grid container spacing={4}>
            {featuredBooks.map(book => (
              <Grid item xs={12} key={book.id}>
                <FeaturedBookPaper>
                  <Box sx={{ flex: '0 0 150px' }}>
                    <BookCover book={book} />
                  </Box>
                  <Box>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      by {book.author}
                    </Typography>
                    <Rating 
                      value={book.ratings?.reduce((acc, rating) => acc + rating, 0) / book.ratings?.length || 0}
                      precision={0.5}
                      readOnly
                      icon={<FontAwesomeIcon icon={faStar} />}
                      emptyIcon={<FontAwesomeIcon icon={faStar} style={{ opacity: 0.3 }} />}
                    />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      <strong>Why it's featured:</strong> {getFeatureReason(book)}
                    </Typography>
                  </Box>
                </FeaturedBookPaper>
              </Grid>
            ))}
          </Grid>
        </Fade>
      </StyledContainer>
    </Box>
  );
};

export default FeaturedBooks; 