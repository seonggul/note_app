import React from "react";
import styled from "styled-components";
import List from "../components/List";
import Navigation from "../components/Navigation";
import Write from "../components/Write";

const Note = () => {
  return (
    <NoteContainer>
      <Navigation />
      <List />
      <Write />
    </NoteContainer>
  );
};

export default Note;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
`;
