import React, { useState, useEffect } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

import { DataType } from "../type/types";

const Search = styled(Input.Search)`
  max-width: 500px;
  width: 70%;
  display: flex;
`;

interface Props {
  resource: DataType[];
  onChange: (value: DataType[]) => void;
}

export default function SearchFunction({ resource, onChange }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchArray = () => {
    const results = resource.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm);
    });
    onChange(results);
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
