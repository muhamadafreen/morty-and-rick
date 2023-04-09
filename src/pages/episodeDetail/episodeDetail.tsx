import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { CharacterType } from "../../models/characters";

import { Card, Divider } from "antd";

import { Link } from "react-router-dom";
import "./styles/episodeDetail.css";
import useMortyAndrickService, {
  EpisodeData,
} from "../../services/mortyAndRickService";

export default function EpisodeDetail() {
  const mortyAndRickService = useMortyAndrickService();
  const { id } = useParams();

  const [episode, setEpisode] = useState<EpisodeData>();
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    mortyAndRickService.getEpisode(id ? id : "").then((data) => {
      if (data.status) {
        setEpisode(data.episode);
        setloading(false);
      }
    });
  }, []);

  if (loading) {
    return <h1 className="loader">Loading....</h1>;
  }

  return (
    <>
      {episode ? (
        <div className="episode-details">
          <Card title={episode.name}>
            <p className="title-description">{episode.air_date}</p>
            <Divider />
            <p>{episode.episode}</p>
            <Divider />
            <h1>Characters</h1>
            <div className="character-grid  ">
              {episode.characters.map((character: CharacterType) => {
                return (
                  <div key={character.id}>
                    <Link to={`/character/${character.id}`}>
                      <Card hoverable className="character-card">
                        <div className="card-image">
                          <img src={character.image} alt={character.name} />
                        </div>
                        <p className="card-name">{character.name}</p>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ) : (
        <h1 className="no-data">There is no such Episode</h1>
      )}
    </>
  );
}
