import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Rating, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const BookImage = styled(CardMedia)(({ theme }) => ({
  height: 320,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  },
}));

const BookContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  background: 'white',
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 600,
  zIndex: 1,
}));

const BookCover = ({ book }) => {
  const navigate = useNavigate();
  const averageRating = book.ratings?.reduce((acc, rating) => acc + rating, 0) / book.ratings?.length || 0;

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <Box sx={{ position: 'relative' }}>
        <PriceChip 
          label={`$${book.price.toFixed(2)}`}
          variant="filled"
        />
        <BookImage
          image={ book.secondaryImageURL || book.coverImageURL }
          title={book.title}
        />
      </Box>
      <BookContent>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.2,
            height: '2.4em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          gutterBottom
          sx={{
            height: '1.5em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          by {book.author}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating
            value={averageRating}
            precision={0.5}
            readOnly
            size="small"
            icon={<FontAwesomeIcon icon={faStar} style={{ fontSize: '0.8rem' }} />}
            emptyIcon={<FontAwesomeIcon icon={faStar} style={{ fontSize: '0.8rem', opacity: 0.3 }} />}
          />
          <Typography variant="body2" color="text.secondary">
            ({book.ratings?.length || 0})
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            height: '3em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.summary}
        </Typography>
      </BookContent>
    </StyledCard>
  );
};

export default BookCover;
