import Sidebar from './Sidebar';
import '../Syles/ProductsHome.css';
import { useEffect, useState } from 'react';
import { GET_API } from '../APIs/RestApis';
import { GET_ALL_BOOKS } from '../COMMON/CONSTANTS';
import BookCover from './BookCover';
import Loading from './Loading';
import addNewBook from '../Pictures/add.png';

const ProductsHome = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    GET_API(GET_ALL_BOOKS)
      .then((result) => {
        setBooks(result);
      })

      .catch((err) => console.log('Error: ', err));
  }, []);

  return (
    <div className="products-container">
      <Sidebar />
      <div className="panel-view">
        <div className="add-book-container">
          <img className="add-book-icon" src={addNewBook} alt="" />
        </div>
        <div className="books-container">
          {books ? (
            books.map((book, index) => {
              return <BookCover key={index} book={book}></BookCover>;
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsHome;
