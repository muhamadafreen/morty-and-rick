import { useEffect, useState } from "react";
import EpisodeTile from "./components/episodeTile";
import useMortyAndrickService from "../../services/mortyAndRickService";
import { Typography, Input, Row, Col, Button } from "antd";
import "./styles/episodess.css";
import { Link } from "react-router-dom";
import { EpisodesData, EpisodeType } from "../../models/characters";

const { Title } = Typography;

export default function Episodes() {
  const mortyService = useMortyAndrickService();
  const [data, setData] = useState<EpisodesData>();
  const [filterName, setfilterName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    mortyService
      .getEpisodeList(pageNumber, {
        name: filterName,
      })
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setData(response.data);
        }
      });
  }, [filterName, pageNumber]);

  if (loading) {
    return <h1 className="loader">Loading....</h1>;
  }

  return (
    <div className="all-episodes-page">
      <Title className="page-heading" level={1}>
        The All Episodes of Morty and Rick
      </Title>
      <Row justify="space-between" align="middle">
        <Col>
          <Input.Search
            className="search-bar"
            placeholder="Search episodes"
            onChange={(event) => {
              setfilterName(event.target.value);
              setPageNumber(1);
            }}
          />
        </Col>
        <Col>
          <div className="pagination">
            <Button
              className="prev-button"
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              Prev
            </Button>

            <Button
              className="next-button"
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber === data?.episodes.info.pages}
            >
              Next
            </Button>
            <span className="indicator">{`${pageNumber} of ${
              data?.episodes.info.pages ? data?.episodes.info.pages : ""
            }`}</span>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {data && data.episodes.results.length > 0 ? (
          data.episodes.results.map((episode: EpisodeType) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={episode.id}>
              <Link to={`/episode/${episode.id}`}>
                <EpisodeTile episodes={episode} />
              </Link>
            </Col>
          ))
        ) : (
          <div className="no-results">No Episode Found</div>
        )}
      </Row>
    </div>
  );
}
