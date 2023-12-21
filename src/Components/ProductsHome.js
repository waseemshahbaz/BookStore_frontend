import Sidebar from "./Sidebar";
import "../Syles/ProductsHome.css";
import { useEffect, useState } from "react";
import { GET_API } from "../APIs/RestApis";
import { GET_ALL_BOOKS } from "../COMMON/CONSTANTS";

const ProductsHome = () => {
  const [books, setBooks] = useState(null);

  console.log(GET_ALL_BOOKS);
  useEffect(() => {
    GET_API(GET_ALL_BOOKS)
      .then((result) => {
        console.log(result);
        setBooks(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="products-container">
      <Sidebar />
      <div className="books-container">
        <div className="book-panel">{books && books[0].id}</div>
      </div>
    </div>
  );
};

export default ProductsHome;
