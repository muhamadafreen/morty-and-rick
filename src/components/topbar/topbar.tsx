import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, useLocation } from "react-router-dom";
import logo from "../../themes/images/logo/logo.png";



export default function Topbar(){
      const location = useLocation();
    return (
      <Header className="header">
        <div className="logo" >
          <Link to="/">
            <img className="images" src={logo} alt="Logo" />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="menu"
        >
          <Menu.Item key="/" className="menu-item">
            <Link to="/"> Home</Link>
          </Menu.Item>
          <Menu.Item key="/characters" className="menu-item">
            <Link to="/characters"> Characters</Link>
          </Menu.Item>
          <Menu.Item key="/episodes" className="menu-item">
            <Link to="/episodes"> Episodes</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
}