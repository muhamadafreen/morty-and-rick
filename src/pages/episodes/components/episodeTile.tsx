import React from "react";
import { Card, Typography } from "antd";
import "../styles/episodes.css";
const { Meta } = Card;
const { Title } = Typography;

interface EpisodeProps {
  episodes: {
    id: number;
    name: string;
    air_date: string;
    episode:string
  };
}

function EpisodeTile({ episodes }: EpisodeProps) {
     const { name, air_date, episode } = episodes;
  
  return (
    <Card className="episode-tile" title={name}>
      <p>Airdate: {air_date}</p>
      <p>Episode: {episode}</p>
    </Card>
  );
}

export default EpisodeTile;
