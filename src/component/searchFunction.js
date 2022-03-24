import React, { useState, useEffect } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

export default function SearchFunction(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchArray = () => {
    const results = props.resource.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm); //If find the result, it going to return true
    });
    props.onChange(results);
  };

  useEffect(() => {
    searchArray();
  }, [searchTerm]);

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(value) => {
          setSearchTerm(value);
        }}
      />
    </div>
  );
}
