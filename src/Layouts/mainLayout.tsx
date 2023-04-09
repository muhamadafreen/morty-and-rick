import { Layout } from "antd";
import "./mainLayout.css";
import Episodes from "../pages/episodes/episodes";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/home";
import Characters from "../pages/characters/characters";
import EpisodeDetail from "../pages/episodeDetail/episodeDetail";
import CharacterDetail from "../pages/characterDetails/characterDetail";
import Topbar from "../components/topbar/topbar";


const { Content } = Layout;

function MyLayout() {

  return (
    <Layout className="layout">
      <Topbar />
      <Content>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="characters" element={<Characters />} />
            <Route path="episodes" element={<Episodes />} />
            <Route path="episode/:id" element={<EpisodeDetail />} />
            <Route path="character/:id" element={<CharacterDetail />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

export default MyLayout;
