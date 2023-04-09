import { useEffect, useState } from "react";
import Character from "./components/characterCard";
import { Row, Col, Button, Input } from "antd";
import "./styles/characters.css";
import { Link } from "react-router-dom";
import FilterDropdown, {
  FilterProps,
} from "../../components/filterDropdown/dropdownFilter";
import { CharactersData, CharacterType } from "../../models/characters";
import useMortyAndrickService from "../../services/mortyAndRickService";

export default function AllCharacters() {
  const rickAndMortyService = useMortyAndrickService();

  const [characterDatas, setCharacterDatas] = useState<CharactersData>();
  /****Keyword for filter function */
  const [keyword, setKeyword] = useState<string>("");

  /**Current page for Pagination */
  const [currentPage, setCurrentPage] = useState<number>(1);

  /******arrays for filter */
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    rickAndMortyService
      .getCharacterList(currentPage, {
        gender: gender,
        name: keyword,
        species: species,
        status: status,
      })
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setCharacterDatas(response.data);
        }
      });
  }, [keyword, currentPage, gender, species, status]);

  const filter = (filterObj: FilterProps) => {
    const { status, species, gender } = filterObj;

    if (status) {
      setStatus(status);
      setSpecies("");
      setGender("");
    }

    if (species) {
      setSpecies(species);
      setGender("");
      setStatus("");
    }

    if (gender) {
      setGender(gender);
      setStatus("");
      setSpecies("");
    }
  };

  if (loading) {
    return <h1 className="loader">Loading....</h1>;
  }

  return (
    <div className="characters-page">
      <h1>All Characters of Rick And Morty Series</h1>
      <Row justify="space-between" align="middle">
        <Col>
          <FilterDropdown
            onFilterChange={(filterObj: object) => {
              filter(filterObj);
              setCurrentPage(1);
            }}
          />
        </Col>
        <Col>
          <Input.Search
            className="search-bar"
            placeholder="Search episodes"
            onChange={(event) => {
              setKeyword(event.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
      </Row>
      <div className="page-btns">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span style={{ margin: "0 16px" }}>
          Page {currentPage} of {characterDatas?.characters.info.pages}
        </span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === characterDatas?.characters.info.pages}
        >
          Next
        </Button>
      </div>
      <Row gutter={[16, 16]}>
        {characterDatas && characterDatas?.characters.results.length > 0 ? (
          characterDatas.characters.results.map((character: CharacterType) => (
            <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
              <Link to={`/character/${character.id}`}>
                <Character character={character} />
              </Link>
            </Col>
          ))
        ) : (
          <h1 className="no-characters"> No character Found </h1>
        )}
      </Row>
    </div>
  );
}
