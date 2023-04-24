import { Link } from "react-router-dom";
import morty from "../../themes/images/morty.jpg";
import "./custom404.css";

const Custom404 = () => {
  return (
    <div className="not-found-container">
      <img src={morty} alt="404 Morty" />
      <h1>Uh-Oh! You've found a Plumbus that doesn't exist!</h1>
      <p>It looks like the page you were looking for doesn't exist.</p>
      <div className="home-button">
        <Link to="/" className="back-home-link">
          Take me back to Earth!
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
