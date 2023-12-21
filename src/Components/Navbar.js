import "../Syles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="left-item">
        <li>Book Store</li>
      </ul>
      <ul className="right-item">
        <li> Shop Now</li>
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
