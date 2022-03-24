import React, { useState, useEffect } from "react";
import { List, Card, Avatar, Row, Col } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

import SearchFunction from "./component/searchFunction";

const BarSection = styled(Row)`
  width: 100%;
  padding: 24px;
  text-align: center;
`;

function Home() {
  const [dataInfo, setDataInfo] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function fetchUserData() {
    setIsLoading(true);
    try {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          setDataInfo([...data]);
          setDefaultData([...data]);
        })
        .catch((err) => {
          setIsError(true);
        });
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    //sortArray is descending order

    const sortArray = (type) => {
      const types = {
        name: "name",
        id: "id",
      };
      const sortProperty = types[type];
      if (sortProperty === "name") {
        const sorted = [...dataInfo].sort((a, b) =>
          b[sortProperty].localeCompare(a[sortProperty])
        );
        setDataInfo(sorted);
      } else {
        const sorted = [...dataInfo].sort(
          (a, b) => b[sortProperty] - a[sortProperty]
        );
        setDataInfo(sorted);
      }
    };

    sortArray(sortType);
  }, [sortType]);

  const SearchUpdate = (value) => {
    setDataInfo(value);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <BarSection justify="space-between" align="middle">
        <Col flex={1}>
          <SearchFunction resource={defaultData} onChange={SearchUpdate} />
        </Col>
        {/* sort function here */}
        <Col>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </Col>
      </BarSection>
      <div>
        {dataInfo && (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={dataInfo}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.name} description={item.email} />
                <div>{item.phone}</div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
