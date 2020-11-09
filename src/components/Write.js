import React from "react";
import styled from "styled-components";

const Write = () => {
  return (
    <WriteContain>
      <TitleInput placeholder="제목을 입력하세요" />
      <ContentInput placeholder="내용을 입력하세요" />
    </WriteContain>
  );
};

export default Write;

const WriteContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const TitleInput = styled.input`
  height: 100px;
`;

const ContentInput = styled.input`
  height: 100vh;
`;
