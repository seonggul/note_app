import React, { useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../fbase";
import ListView from "./ListView";

const List = ({
  list,
  setList,
  setSelectedId,
  userObj,
  setTitle,
  setContent,
  selectedId,
}) => {
  //list 변화시 실시간 적용 onSnapshot
  useEffect(() => {
    dbService.collection(userObj.uid).onSnapshot((snapshot) => {
      let listAry = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      console.log(listAry);
      setList(listAry);
    });
  }, []);

  return (
    <ListContainer>
      {list.map((a) => (
        <ListView
          key={a.id}
          ListObj={a}
          userObj={userObj}
          list={list}
          setList={setList}
          isOwner={a.createrId === userObj.uid}
          setSelectedId={setSelectedId}
          setTitle={setTitle}
          setContent={setContent}
        />
      ))}
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  display: flex;
  width: 300px;
  height: 100vh;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
