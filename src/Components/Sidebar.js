import "../Syles/Sidebar.css";
import Book from "../Pictures/book.png";
import Genre from "../Pictures/genre.png";
import Author from "../Pictures/author.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-container">
        <Link to="/products">
          <li className="sidebar-items">
            <img className="icon" src={Book} alt="" />
            <font className="sidebar-item-font">Books</font>
          </li>
        </Link>
        <Link to="/products/genres">
          <li className="sidebar-items">
            <img className="icon" src={Genre} alt="" />
            <font className="sidebar-item-font">Genres</font>
          </li>
        </Link>
        <Link to="/products/authors">
          <li className="sidebar-items">
            <img className="icon" src={Author} alt="" />
            <font className="sidebar-item-font">Authors</font>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
