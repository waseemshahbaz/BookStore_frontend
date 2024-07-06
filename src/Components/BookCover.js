import React from 'react';
import '../Syles/BookCover.css';
import { Link } from 'react-router-dom';

function BookCover(props) {
  const book = props.book;

  return (
    <Link to={'/book/' + book.id}>
      <div className="book-panel">
        <img className="book-cover" src={book.coverImageURL} />
      </div>
    </Link>
  );
}

export default BookCover;
