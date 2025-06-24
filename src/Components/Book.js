import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  IconButton, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Chip,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faStar, 
  faLanguage,
  faBookOpen,
  faCalendarAlt,
  faBarcode,
  faDollarSign,
  faBuilding,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { DELETE_API, GET_API } from '../APIs/RestApis';
import { DELETE_BOOK, GET_BOOK } from '../COMMON/CONSTANTS';
import Sidebar from './Sidebar';
import '../Syles/Book.css';
import bin from '../Pictures/bin.png';
import edit from '../Pictures/edit.png';
import Loading from './Loading';
import EditBook from './EditBook';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginLeft: 240, // Space for sidebar
  padding: theme.spacing(3),
  marginTop: 64, // Space for navbar
  minHeight: 'calc(100vh - 64px)',
  background: '#f5f5f5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minWidth: 'calc(100vw - 240px)',
}));

const BookCover = styled('img')({
  width: '100%',
  maxWidth: 400,
  height: 'auto',
  borderRadius: 8,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const InfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  position: 'relative',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

const Book = (props) => {
  const [addBook] = useState(props.addBook);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!addBook) {
      GET_API(GET_BOOK + id, {
        headers: {
          "ngrok-skip-browser-warning": "1"
        },
      })
        .then((data) => {
          setBook(data);
        })
        .catch((err) => {
          console.error('Error occurred while fetching book:', err);
        });
    }
  }, [addBook, id]);

  const handleDelete = () => {
    DELETE_API(DELETE_BOOK + book.id)
      .then(() => {
        setDeleteDialog(false);
        navigate('/products');
      })
      .catch((err) => {
        console.error('Error occurred while deleting:', err);
      });
  };

  if (!book && !addBook) return <Loading />;
  if (addBook || editMode) return <EditBook bookProps={book} setEditCheck={setEditMode} addBook={addBook} />;

  return (
    <Box display="flex">
      <Sidebar />
      <Fade in={true} timeout={1000}>
        <StyledContainer>
          <Grid container spacing={4} sx={{ maxWidth: '1400px', mt: 4 }}>
            {/* Book Cover */}
            <Grid item xs={12} md={4}>
              <BookCover src={ book.secondaryImageURL || book.coverImageURL}/>
            </Grid>

            {/* Book Information */}
            <Grid item xs={12} md={8}>
              <InfoPaper>
                <ActionButtons>
                  <IconButton 
                    onClick={() => setEditMode(true)}
                    color="primary"
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton 
                    onClick={() => setDeleteDialog(true)}
                    color="error"
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </ActionButtons>

                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display, serif', mb: 1 }}>
                  {book.title}
                </Typography>
                
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>

                <Box my={2}>
                  <Rating 
                    value={book.ratings?.reduce((acc, rating) => acc + rating, 0) / book.ratings?.length || 0}
                    precision={0.5}
                    readOnly
                    icon={<FontAwesomeIcon icon={faStar} style={{ marginRight: 4 }} />}
                    emptyIcon={<FontAwesomeIcon icon={faStar} style={{ marginRight: 4, opacity: 0.3 }} />}
                  />
                </Box>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <InfoItem>
                      <FontAwesomeIcon icon={faBookOpen} />
                      <Typography><strong>Genre:</strong> {book.genre}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <Typography><strong>Published:</strong> {book.publicationYear}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <FontAwesomeIcon icon={faBarcode} />
                      <Typography><strong>ISBN:</strong> {book.isbn}</Typography>
                    </InfoItem>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem>
                      <FontAwesomeIcon icon={faDollarSign} />
                      <Typography><strong>Price:</strong> ${book.price.toFixed(2)}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <FontAwesomeIcon icon={faLanguage} />
                      <Typography><strong>Language:</strong> {book.language}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <FontAwesomeIcon icon={faBuilding} />
                      <Typography><strong>Publisher:</strong> {book.publisher}</Typography>
                    </InfoItem>
                  </Grid>
                </Grid>

                <InfoItem>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <Typography><strong>Pages:</strong> {book.numberOfPages}</Typography>
                </InfoItem>

                <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
                  Summary
                </Typography>
                <Typography paragraph color="text.secondary" sx={{ mb: 3 }}>
                  {book.summary}
                </Typography>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    Tags
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {book.tags?.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        variant="outlined" 
                        sx={{ 
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            transform: 'translateY(-2px)',
                          }
                        }} 
                      />
                    ))}
                  </Box>
                </Box>
              </InfoPaper>
            </Grid>
          </Grid>
        </StyledContainer>
      </Fade>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{book?.title}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Book;
