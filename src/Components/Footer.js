import "../Syles/Footer.css";
import instagram from "../Pictures/instagram.png";
import facebook from "../Pictures/facebook.png";
import linkedin from "../Pictures/linkedin.png";
import twitter from "../Pictures/twitter.png";

const Header = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Your Book Store. All rights reserved.</p>
        <div className="footer-links">
          <div>
            <a href="/careers">Careers</a>
            <a href="/Blog">Blog</a>
          </div>
          <div>
            <a href="https://instagram.com">
              <img src={instagram} alt="Instagram" />
              Instagram
            </a>
            <a href="https://facebook.com">
              <img src={facebook} alt="Facebook" />
              Facebook
            </a>
            <a href="https://linkedin.com">
              <img src={linkedin} alt="LinkedIn" />
              LinkedIn
            </a>
            <a href="https://twitter.com">
              <img src={twitter} alt="Twitter" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Header;
