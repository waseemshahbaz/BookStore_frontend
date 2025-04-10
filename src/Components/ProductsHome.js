import Sidebar from './Sidebar';
import '../Syles/ProductsHome.css';
import { useEffect, useState } from 'react';
import { GET_API } from '../APIs/RestApis';
import { GET_ALL_BOOKS } from '../COMMON/CONSTANTS';
import BookCover from './BookCover';
import Loading from './Loading';
import addNewBook from '../Pictures/add.png';
import { Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ProductsHome = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [size] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [shouldFetchBooks, setShouldFetchBooks] = useState(true);
  const [searchString, setSearchString] = useState('');

  const fetchBooks = () => {
    if (books.length > 0) {
      setHasMore(false);
      console.log('page should be set', page);
    }
    GET_API(GET_ALL_BOOKS, {
      params: {
        page: page,
        size: size,
        searchItem: searchString,
      },
    })
      .then((result) => {
        console.log(result);
        console.log('books size: ', books.length);

        setBooks((prevBooks) => [...prevBooks, ...result.content]);
        setTotalPages(result.totalPages);
        console.log('api page is: ', page);
        console.log('has more is: ', hasMore);
      })

      .catch((err) => console.log('Error: ', err));
  };

  useEffect(() => {
    fetchBooks();
  }, [page, searchString]);

  function handleSearchInput(event) {
    console.log('the text should be: ', event.target.value);
    if (event.target.value.length >= 2) {
      setBooks([]); // Clear previous search results
      setHasMore(true); // Reset infinite scroll
      setTimeout(() => {
        console.log('str: ', searchString, searchString.length);
        setPage(0); // Reset page when search changes

        setSearchString(event.target.value);
      }, 500); // 500ms debounce time
    }
  }

  function onPageChange(e, value) {
    setBooks([]);
    window.scrollTo(0, 0);
    setHasMore(true);
    setPage((value - 1) * 2);
    setShouldFetchBooks((prevValue) => !prevValue);
    console.log('total pages are: ', totalPages);
    console.log('button change new page value is: ', page);
    if (page + 1 === totalPages) {
      setHasMore(false);
    }
  }

  return (
    <div className="products-container">
      <Sidebar />
      <div className="panel-view">
        <div className="add-book-container">
          <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
              <div className="searchbar">
                <input
                  className="search_input"
                  type="text"
                  name=""
                  placeholder="Search..."
                  onChange={handleSearchInput}
                />
                <a href="" className="search_icon">
                  <FontAwesomeIcon
                    className="fa fa-search"
                    icon={faMagnifyingGlass}
                  />
                </a>
              </div>
            </div>
          </div>

          <Link to={'/book/add'}>
            <img className="add-book-icon" src={addNewBook} alt="" />
          </Link>
        </div>
        {books ? (
          <InfiniteScroll
            dataLength={books?.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<Loading />}
          >
            <div className="books-container">
              <FontAwesomeIcon icon="fa-brands fa-searchengin" />
              {books.map((book, index) => {
                return <BookCover key={index} book={book}></BookCover>;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Loading />
        )}
        <div className="pagination">
          <Pagination
            onChange={onPageChange}
            count={Math.ceil(totalPages / 2)}
            color="secondary"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsHome;
