import React from "react";
import styled from "styled-components";
import { dbService } from "../fbase";

const Write = ({
  selectedId,
  title,
  setSelectedId,
  setTitle,
  setList,
  content,
  setContent,
  userObj,
}) => {
  //첫화면에서 리스트 가장 상단에 있는게 선택된 상태로하기 위해 useEffect 사용.

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  const saveClick = async (event) => {
    if (title === "") {
      alert("제목을 입력하세요");
      return;
    } else if (content === "") {
      alert("내용을 입력하세요");
      return;
    }
    event.preventDefault();
    //1.리스트에 하나도 없을 경우 생성
    //2.리스트에 하나라도 있으면 선택된거 수정 (기본적으로 선택이 되있음.)
    let getlist = await dbService.collection(userObj.uid).get();
    console.log(userObj.uid);
    if (!getlist.docs.length) {
      console.log("비었다");
      const addlist = {
        title,
        content,
        createdAt: Date.now(),
        createrId: userObj.uid,
      };
      await dbService.collection(userObj.uid).add(addlist);
      getlist = await dbService.collection(userObj.uid).get();
      setSelectedId(getlist.docs[0].id);
    } else {
      try {
        await dbService
          .doc(`${userObj.uid}/${selectedId}`)
          .update({ title, content, createdAt: Date.now() });
      } catch (error) {
        alert(`저장 실패: 새 노트를 생성해주세요.`);
      }
    }
  };

  return (
    <WriteContain>
      <TitleInput
        autocomplete="off"
        name="title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={onChange}
      />
      <SaveBtn onClick={saveClick}>저장하기</SaveBtn>
      <ContentArea
        name="content"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={onChange}
      />
    </WriteContain>
  );
};

export default Write;

const WriteContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const SaveBtn = styled.button`
  position: absolute;
  top: 25px;
  right: 10px;
  width: 50px;
`;

const TitleInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 100px;
  font-size: 30px;
`;

const ContentArea = styled.textarea`
  padding-top: 10px;
  padding-left: 10px;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 100px);
  font-size: 20px;
`;
