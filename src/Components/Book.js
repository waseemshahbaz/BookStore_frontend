import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_API, GET_API } from '../APIs/RestApis';
import { DELETE_BOOK, GET_BOOK } from '../COMMON/CONSTANTS';
import Sidebar from './Sidebar';
import '../Syles/Book.css';
import bin from '../Pictures/bin.png';
import edit from '../Pictures/edit.png';
import Loading from './Loading';
import { InputAdornment, TextField } from '@mui/material';
import EditBook from './EditBook';

const Book = (props) => {
  const [addBook] = useState(props.addBook);
  console.log('addbook is: ', addBook);
  console.log('props are: ', props.addBook);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [editCheck, setEditCheck] = useState(false);
  const navigate = useNavigate();

  const averageRating =
    book?.ratings?.reduce((acc, rating) => acc + rating, 0) /
    book?.ratings?.length;

  useEffect(() => {
    if (!addBook) {
      GET_API(GET_BOOK + id)
        .then((data) => {
          setBook(data);
        })
        .catch((err) => {
          console.log('Error occured while fetching bOok', err);
        });
    }
  }, []);

  function onDeleteIcon() {
    setDeleteCheck(true);
  }

  function onEditIcon() {
    setEditCheck(true);
  }

  function handleDeleteConfirm() {
    DELETE_API(DELETE_BOOK + book.id)
      .then((response) => {
        setDeleteCheck(false);
        navigate('/products');
      })
      .catch((err) => {
        console.log('Error occured while deleting: ', err);
      });
  }

  function handleDeleteCancel() {
    setDeleteCheck(false);
  }

  return (
    <div className="book-detail">
      <Sidebar />
      {book && editCheck ? (
        <EditBook bookProps={book} setEditCheck={setEditCheck} />
      ) : book ? (
        <div className="book-detail-panel">
          <div className="book-cover-container">
            <img
              className="book-cover-photo"
              src={book.coverImageURL}
              alt={book.title}
            />
          </div>
          <div className="book-info-container">
            <div className="icon-container">
              <img className="icon" src={edit} alt="" onClick={onEditIcon} />
              <img className="icon" src={bin} alt="" onClick={onDeleteIcon} />
            </div>
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">by {book.author}</h3>
            <p className="book-genre">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="book-publication-year">
              <strong>Publication Year:</strong> {book.publicationYear}
            </p>
            <p className="book-isbn">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="book-price">
              <strong>Price:</strong> ${book.price.toFixed(2)}
            </p>
            <p className="book-language">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="book-publisher">
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p className="book-pages">
              <strong>Number of Pages:</strong> {book.numberOfPages}
            </p>
            <p className="book-rating">
              <strong>Average Rating:</strong> {averageRating.toFixed(1)}
            </p>
            <p className="book-summary">
              <strong>Summary:</strong> {book.summary}
            </p>
            <p className="book-tags">
              <strong>Tags:</strong> {book.tags?.join(', ')}
            </p>
          </div>
          )}
        </div>
      ) : addBook ? (
        <EditBook
          bookProps={book}
          setEditCheck={setEditCheck}
          addBook={addBook}
        />
      ) : (
        <Loading />
      )}
      {deleteCheck && (
        <div className="overlay">
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this book?</p>
            <button className="confirm-button" onClick={handleDeleteConfirm}>
              Yes
            </button>
            <button className="cancel-button" onClick={handleDeleteCancel}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
