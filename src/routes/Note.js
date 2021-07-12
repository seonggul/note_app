import React, { useState } from "react";
import styled from "styled-components";
import List from "../components/List";
import Navigation from "../components/Navigation";
import Write from "../components/Write";

const Note = ({ userObj }) => {
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <NoteContainer>
      <Navigation
        userObj={userObj}
        setTitle={setTitle}
        setList={setList}
        setContent={setContent}
        setSelectedId={setSelectedId}
        list={list}
      />
      <List
        userObj={userObj}
        list={list}
        setList={setList}
        setSelectedId={setSelectedId}
        setTitle={setTitle}
        setContent={setContent}
      />
      <Write
        list={list}
        userObj={userObj}
        title={title}
        setList={setList}
        setSelectedId={setSelectedId}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        selectedId={selectedId}
      />
    </NoteContainer>
  );
};

export default Note;

const NoteContainer = styled.div`
  display: flex;
  background-color: #d1d8e0;
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
