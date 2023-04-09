import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import "./filterDropdown.css";

export type FilterProps = {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
};

type Props = {
  onFilterChange: (filter: FilterProps) => void;
};

const FilterDropdown: React.FC<Props> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleMenuClick = (event: any) => {
    setSelectedFilter(event.key);
    handleFilterChange(event.key);
  };

  const handleFilterChange = (selectedFilter: string) => {
    let filter: FilterProps = {};
    switch (selectedFilter) {
      case "alive":
      case "dead":
      case "unknown":
        filter.status = selectedFilter;
        break;
      case "human":
      case "alien":
      case "animal":
      case "robot":
        filter.species = selectedFilter;
        break;
      case "male":
      case "female":
      case "genderless":
      case "unknown":
        filter.gender = selectedFilter;
        break;
      default:
        break;
    }
    onFilterChange(filter);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <SubMenu key="status" title="Status">
        <Menu.Item key="alive">Alive</Menu.Item>
        <Menu.Item key="dead">Dead</Menu.Item>
        <Menu.Item key="unknown">Unknown</Menu.Item>
      </SubMenu>
      <SubMenu key="species" title="Species">
        <Menu.Item key="human">Human</Menu.Item>
        <Menu.Item key="alien">Alien</Menu.Item>
        <Menu.Item key="animal">Animal</Menu.Item>
        <Menu.Item key="robot">Robot</Menu.Item>
      </SubMenu>
      <SubMenu key="gender" title="Gender">
        <Menu.Item key="male">Male</Menu.Item>
        <Menu.Item key="female">Female</Menu.Item>
        <Menu.Item key="genderless">Genderless</Menu.Item>
        <Menu.Item key="unknown">Unknown</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <a
        className="ant-dropdown-link filter-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        Filter By: {selectedFilter} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default FilterDropdown;
