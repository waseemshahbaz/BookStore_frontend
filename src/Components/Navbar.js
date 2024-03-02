import "../Syles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="left-item">
      <a href="/">Book Store</a>
      </ul>
      <ul className="right-item">
        <a href="/careers">Shop Now</a>
        <a href="/">Home</a>
        <a href="/careers">About us</a>
        <a href="/Blog">Contact us</a>
      </ul>
    </nav>
  );
};

export default Navbar;
