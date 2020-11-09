import React from "react";
import styled from "styled-components";

const List = () => {
  return (
    <ListContainer>
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  display: flex;
  width: 300px;
  background-color: blue;
`;
