import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "antd";

import "./styles/characterDetail.css";
import useMortyAndrickService from "../../services/mortyAndRickService";
import { CharacterDetails, EpisodeType } from "../../models/characters";

export default function CharacterDetail() {
  const mortyAndRickService = useMortyAndrickService();
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterDetails>();
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    mortyAndRickService.getCharacter(id ? id : "").then((data) => {
      if (data.status) {
        setCharacter(data.character);
        setloading(false);
      }
    });
  }, []);

  if (loading) {
    return <h1 className="loader">Loading....</h1>;
  }

  return (
    <>
      {character ? (
        <div className="character-details-container">
          <Card
            className="character-details-card"
            cover={<img alt={character.name} src={character?.image} />}
          >
            <Card.Meta
              title={<h1>{character.name}</h1>}
              description={
                <>
                  <h3>Species: {character.species}</h3>
                  <h3>Gender: {character.gender}</h3>
                </>
              }
            />
          </Card>

          <div className="origin-location-container">
            <div className="origin-container">
              <h2>Origin</h2>
              <h3>Name: {character.origin.name}</h3>
              <h3>Type: {character.origin.type}</h3>

              <h3>Dimension: {character.origin.dimension}</h3>
            </div>
            <div className="location-container">
              <h2>Location</h2>
              <h3>Name: {character.location.name}</h3>

              <h3>Type: {character.location.type}</h3>
              <h3>Dimension: {character.location.dimension}</h3>
            </div>
          </div>

          <h2>Episodes</h2>
          <div className="episodes-container">
            {character.episode.map((episode: EpisodeType) => {
              return (
                <Link key={episode.id} to={`/episode/${episode.id}`}>
                  <Card className="episode-card">
                    <Card.Meta
                      title={episode.name}
                      description={
                        <>
                          <h3>Episode: {episode.episode}</h3>
                          <h3>Air Date: {episode.air_date}</h3>
                        </>
                      }
                    />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <h1 className="no-data">There is no such character</h1>
      )}
    </>
  );
}
