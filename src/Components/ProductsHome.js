import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  TextField, 
  Typography, 
  Grid,
  Fade,
  InputAdornment,
  Fab,
  useTheme,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, 
  faPlus,
  faBookOpen 
} from '@fortawesome/free-solid-svg-icons';
import { GET_API } from '../APIs/RestApis';
import { GET_ALL_BOOKS } from '../COMMON/CONSTANTS';
import Sidebar from './Sidebar';
import BookCover from './BookCover';
import Loading from './Loading';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginLeft: 240,
  padding: theme.spacing(3),
  marginTop: 64,
  minHeight: 'calc(100vh - 64px)',
  background: '#f5f5f5',
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 72,
  zIndex: 2,
  padding: theme.spacing(3, 0),
  background: '#f5f5f5',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(3),
}));

const AddButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
}));

const NoResultsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8),
  textAlign: 'center',
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
}));

const ProductsHome = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const fetchBooks = async (pageNumber) => {
    setIsLoading(true);
    try {
      const result = await GET_API(GET_ALL_BOOKS, {
        params: {
          page: pageNumber,
          size: 12,
          searchItem: searchString,
        },
      });

      setBooks(result.content);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(0);
  }, [searchString]);

  const handleSearchInput = (event) => {
    const value = event.target.value;
    if (value.length >= 2 || value.length === 0) {
      setSearchString(value);
    }
  };

  const handlePageChange = (event, newPage) => {
    const pageIndex = newPage - 1; // Convert to 0-based index
    setPage(pageIndex);
    fetchBooks(pageIndex);
  };

  return (
    <Box display="flex">
      <Sidebar />
      <StyledContainer maxWidth={false}>
        <SearchContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search books by title, author, or ISBN..."
            onChange={handleSearchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                },
              },
            }}
          />
        </SearchContainer>

        <Fade in={true} timeout={1000}>
          <Box>
            {books.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {books.map((book, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id || index}>
                      <BookCover book={book} />
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
              <NoResultsContainer>
                <FontAwesomeIcon 
                  icon={faBookOpen} 
                  style={{ 
                    fontSize: 64, 
                    color: theme.palette.text.secondary,
                    marginBottom: theme.spacing(2)
                  }} 
                />
                <Typography variant="h6" color="textSecondary">
                  No books found
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Try adjusting your search or browse our collection
                </Typography>
              </NoResultsContainer>
            ) : (
              <Loading />
            )}
          </Box>
        </Fade>

        <Link to="/book/add" style={{ textDecoration: 'none' }}>
          <AddButton color="primary" aria-label="add book">
            <FontAwesomeIcon icon={faPlus} />
          </AddButton>
        </Link>
      </StyledContainer>
    </Box>
  );
};

export default ProductsHome;
