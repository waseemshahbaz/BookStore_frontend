import HomeBackground from '../Pictures/Home.jpg';
import '../Syles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <img className="background" src={HomeBackground} alt="" srcset="" />
      <div className="text-container">
        <h1>Welcome to our Book Store</h1>
        <h2>
          Explore a world of <span className="highlight">KNOWLEDGE</span> and{' '}
          <span className="highlight">IMAGINATION</span>
        </h2>
        <h3>
          Where <span className="highlight">DREAMS</span> are made
        </h3>
        <Link className="board-link" to={'/products'}>
          <button className="board-button">START NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
