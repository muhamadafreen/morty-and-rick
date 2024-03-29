import { Card, Typography } from "antd";
import { CharacterType } from "../../../models/characters";
import "../styles/characters.css";

const { Paragraph } = Typography;

export interface CharacterProps {
  character: CharacterType;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  return (
    <Card className="character">
      <div className="character-inner">
        <div className="character-image">
          <img src={character.image} alt={character.name} />
        </div>
        <h2>{character.name}</h2>
        <p>
          {character.gender} | {character.species}
        </p>
      </div>
    </Card>
  );
};

export default Character;
