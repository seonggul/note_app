import React from "react";
import styled from "styled-components";
import { dbService, authService } from "../fbase";
import { useHistory } from "react-router-dom";

const Navigation = ({
  userObj,
  setTitle,
  setContent,
  setSelectedId,
  list,
  setList,
}) => {
  const history = useHistory();
  const newNote = async (event) => {
    event.preventDefault();
    const addlist = {
      title: "새 노트",
      content: "내용을 입력하세요",
      createdAt: Date.now(),
      createrId: userObj.uid,
    };

    try {
      await dbService.collection(userObj.uid).add(addlist);
    } catch (error) {
      alert(`실패: ${error.messages}`);
    }
  };

  const chat = () => {
    return console.log("chat");
  };

  const LogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <Contain>
      <NavItem>
        <span onClick={newNote}>새노트</span>
        <span onClick={chat}>채팅</span>
      </NavItem>
      <LogOut>
        <button onClick={LogoutClick}>로그아웃</button>
      </LogOut>
    </Contain>
  );
};

export default Navigation;

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 100vh;
  background-color: gray;
`;

const LogOut = styled.div`
  padding-bottom: 30px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
