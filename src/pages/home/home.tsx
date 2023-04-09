import React from "react";
import { Link } from "react-router-dom";

import "./styles/home.css";
import collage from "../../themes/images/rickAndMorty.jpg";



const Home: React.FC = () => {
  return (
    <section className="home-container">
      <div className="home-overlay">
        <div className="home-content">
          <h1>Welcome to the Rick and Morty App!</h1>
          <p>
            Here you can explore information about your favorite characters and
            episodes from the TV show.
          </p>
        </div>
      </div>
      <div
        className="home-background"
        style={{ backgroundImage: `url(${collage})` }}
      ></div>
      <div className="home-buttons">
        <Link to="/characters" className="home-button">
          Characters
        </Link>
        <Link to="/episodes" className="home-button">
          Episodes
        </Link>
      </div>
    </section>
  );
};

export default Home;
