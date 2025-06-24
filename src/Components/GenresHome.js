import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Fade, Pagination, useTheme, Paper, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { GET_API } from '../APIs/RestApis';
import { GET_PAGINATED_GENRES } from '../COMMON/CONSTANTS';
import Sidebar from './Sidebar';
import Loading from './Loading';

const gradientBg = `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`;

const StyledContainer = styled(Container)(({ theme }) => ({
  marginLeft: 240,
  padding: theme.spacing(3),
  marginTop: 64,
  minHeight: 'calc(100vh - 64px)',
  background: gradientBg,
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  overflowX: 'hidden',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  paddingLeft: theme.spacing(1),
}));

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GenreCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 18,
  boxShadow: '0 6px 24px rgba(44, 62, 80, 0.10)',
  background: 'rgba(255,255,255,0.97)',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.35s cubic-bezier(.4,2,.3,1)',
  animation: `${fadeInUp} 0.7s cubic-bezier(.4,2,.3,1)`,
  '&:hover': {
    boxShadow: '0 12px 32px rgba(44, 62, 80, 0.18)',
    transform: 'translateY(-6px) scale(1.03)',
    background: 'linear-gradient(120deg, #f8fafc 60%, #e3e9f0 100%)',
  },
}));

const GenreIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  fontSize: 32,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  opacity: 0.85,
}));

const GenreName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 700,
  fontSize: '1.25rem',
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(1),
  letterSpacing: 0.5,
}));

const GenreDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  lineHeight: 1.6,
  marginBottom: theme.spacing(1),
  flexGrow: 1,
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
}));

const GenresHome = () => {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const fetchGenres = async (pageNumber) => {
    setIsLoading(true);
    try {
      const result = await GET_API(GET_PAGINATED_GENRES, {
          headers: {
            "ngrok-skip-browser-warning": "1"
          },
        
        params: {
          page: pageNumber,
          size: 12,
        },
      });
      setGenres(result.content);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Error fetching genres:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres(0);
  }, []);

  const handlePageChange = (event, newPage) => {
    const pageIndex = newPage - 1;
    setPage(pageIndex);
    fetchGenres(pageIndex);
  };

  return (
    <Box display="flex">
      <Sidebar />
      <StyledContainer maxWidth={false}>
        <Header>
          <GenreIcon icon={faFeatherAlt} />
          <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: theme.palette.primary.dark }}>
            Book Genres
          </Typography>
        </Header>
        <Divider sx={{ mb: 4 }} />
        <Fade in={true} timeout={1000}>
          <Box>
            {genres.length > 0 ? (
              <>
                <Grid container spacing={4}>
                  {genres.map((genre, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id} style={{ display: 'flex' }}>
                      <GenreCard style={{ animationDelay: `${idx * 60}ms` }}>
                        <GenreIcon icon={faBookOpen} />
                        <GenreName>{genre.name}</GenreName>
                        <GenreDescription>{genre.description}</GenreDescription>
                      </GenreCard>
                    </Grid>
                  ))}
                </Grid>
                <PaginationContainer>
                  <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </PaginationContainer>
              </>
            ) : !isLoading ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={8}>
                <Typography variant="h6" color="textSecondary">
                  No genres found
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Try again later or contact support.
                </Typography>
              </Box>
            ) : (
              <Loading />
            )}
          </Box>
        </Fade>
      </StyledContainer>
    </Box>
  );
};

export default GenresHome; 