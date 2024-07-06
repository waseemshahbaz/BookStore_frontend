import { Button, InputAdornment, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GET_API, PUT_API } from '../APIs/RestApis';
import {
  GET_ALL_AUTHORS,
  GET_ALL_GENRES,
  UPDATE_BOOK,
} from '../COMMON/CONSTANTS';
import Select from 'react-select';
import '../Syles/EditBook.css';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 730,
    marginTop: '16px',
    marginLeft: 0,
    height: '56px',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 2,
  }),
};

const EditBook = ({ bookProps, setEditCheck }) => {
  const [book, setBook] = useState(bookProps);
  const [authors, setAuthors] = useState(null);
  const [genreNames, setGenreNames] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const averageRating =
    book?.ratings?.reduce((acc, rating) => acc + rating, 0) /
    book?.ratings?.length;

  useEffect(() => {
    GET_API(GET_ALL_AUTHORS)
      .then((result) => {
        setAuthors(result);
      })
      .catch((err) => console.log('Error occured while fetching authors'));
  }, []);

  useEffect(() => {
    GET_API(GET_ALL_GENRES)
      .then((result) => {
        setGenreNames(
          result.map((genre) => ({ value: genre.name, label: genre.name }))
        );
        setSelectedGenres(
          book.genre.map((bookGenre) => ({
            value: bookGenre,
            label: bookGenre,
          }))
        );
      })
      .catch((err) => {
        console.log('Error while fetching Genres: ', err);
      });
  }, []);

  function onTitleChange(e) {
    setBook({ ...book, title: e.target.value });
  }

  function onAuthorChange(e) {
    setBook({ ...book, author: e.target.value });
  }

  function saveBook() {
    console.log('Books is : ', book);
    PUT_API(UPDATE_BOOK + book.id, book)
      .then((result) => {
        if (result.status == 200) {
          navigate('/products');
        } else {
          console.log('Error on saving');
        }
      })
      .catch((err) => {
        console.log('Error while saving: ', err);
      });
  }

  function cancelBook() {
    setEditCheck(false);
  }

  return (
    <div className="book-edit-container">
      <TextField
        label="Title"
        fullWidth
        variant="outlined"
        sx={{ width: 500 }}
        value={book.title}
        margin="normal"
        onChange={onTitleChange}
      />
      <TextField
        label="Author"
        select
        variant="outlined"
        sx={{ width: 350 }}
        defaultValue={book.author}
        margin="normal"
        onChange={onAuthorChange}
      >
        {authors?.map((author) => {
          return (
            <MenuItem key={author.name} value={author.name}>
              {author.name}
            </MenuItem>
          );
        })}
      </TextField>
      <Select
        isMulti
        placeholder="Genres"
        options={genreNames}
        styles={customStyles}
        value={selectedGenres}
        onChange={(value) => {
          console.log('values for genres should be: ', value);
          if (value.length <= 3) {
            setSelectedGenres(value);
            setBook({ ...book, genre: value.map((genre) => genre.label) });
          }
        }}
      />
      <TextField
        label="Publication Year"
        variant="outlined"
        sx={{ width: 120 }}
        value={book.publicationYear}
        margin="normal"
        onChange={(event) =>
          setBook({ ...book, publicationYear: event.target.value })
        }
      />
      <TextField
        label="ISBN"
        variant="outlined"
        value={book.isbn}
        sx={{ width: 200 }}
        margin="normal"
        onChange={(event) => setBook({ ...book, isbn: event.target.value })}
      />
      <TextField
        label="Price"
        variant="outlined"
        value={book.price}
        sx={{ width: 100 }}
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(event) => setBook({ ...book, price: event.target.value })}
      />
      <TextField
        label="Language"
        variant="outlined"
        value={book.language}
        sx={{ width: 140 }}
        margin="normal"
        onChange={(event) => setBook({ ...book, language: event.target.value })}
      />
      <TextField
        label="Publisher"
        variant="outlined"
        value={book.publisher}
        sx={{ width: 200 }}
        margin="normal"
        onChange={(event) =>
          setBook({ ...book, publisher: event.target.value })
        }
      />
      <TextField
        label="Pages"
        variant="outlined"
        value={book.numberOfPages}
        sx={{ width: 80 }}
        margin="normal"
        onChange={(event) =>
          setBook({ ...book, numberOfPages: event.target.value })
        }
      />
      <TextField
        label="Rating"
        variant="outlined"
        value={averageRating?.toFixed(1)}
        sx={{ width: 80 }}
        disabled
        margin="normal"
      />
      <TextField
        label="Summary"
        variant="outlined"
        value={book.summary}
        sx={{ width: 865 }}
        margin="normal"
        onChange={(event) => setBook({ ...book, summary: event.target.value })}
        multiline
      />
      <div className="buttons-container">
        <Button
          variant="contained"
          color="info"
          size="large"
          onClick={cancelBook}
          sx={{ width: '100px' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={saveBook}
          sx={{ marginLeft: '20px', width: '100px' }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditBook;
