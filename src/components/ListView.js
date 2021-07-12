import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "../fbase";

const ListView = ({
  list,
  userObj,
  ListObj,
  isOwner,
  setSelectedId,
  setTitle,
  setContent,
}) => {
  const [ascList, setAscList] = useState([]);
  useEffect(() => {
    let first;
    try {
      first = list
        .map((a) => {
          if (a.createrId === userObj.uid) {
            return a;
          }
        })
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })[0];
      setSelectedId(first.id);
      setTitle(first.title);
      setContent(first.content);
      setAscList(first);
      console.log(first.id);
    } catch (error) {
      if (!first) {
        setSelectedId("");
        setTitle("");
        setContent("");
      }
    }
  }, [list]);
  //Item 선택시 해당하는 것의 id, title, content 가져와서 write 화면 변경
  const selectedList = (event) => {
    event.preventDefault();
    console.log(ListObj.id, ListObj.createdAt);
    setSelectedId(ListObj.id);
    setTitle(ListObj.title);
    setContent(ListObj.content);
  };

  //삭제시 list 최상위에 있는게 write에 나오게 하기 id값까지 다 줘야함
  //write할때 뭔가 값이 잘못 들어감 아니면 list에서 잘못불러오고 있음
  const onDeleteClick = async (event) => {
    event.preventDefault();
    console.log("clicked delete");
    console.log(ascList);
    if (window.confirm("정말로 삭제하시겠습니까??")) {
      await dbService.doc(`${userObj.uid}/${ListObj.id}`).delete();
      setSelectedId(ascList.id);
      setTitle(ascList.title);
      setContent(ascList.content);
    }
  };
  return (
    <>
      {isOwner && (
        <Item>
          <ClickArticle
            id={ListObj.id}
            title={ListObj.title}
            content={ListObj.content}
            onClick={selectedList}
          >
            <ItemTitle>
              <H4>{ListObj.title}</H4>
              <Span>{ListObj.content}</Span>
            </ItemTitle>

            <Drawer>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrashAlt} alt="삭제" />
              </span>
            </Drawer>
          </ClickArticle>
        </Item>
      )}
    </>
  );
};

export default ListView;

const Item = styled.div`
  margin-top: 0;
  padding-top: 0;
  border-bottom: 1px solid;
  border-color: rgb(178, 178, 178);

  &:hover {
    border-width: 1px;
    border-color: #546de5;
    background-color: #f8a5c2;
  }
  &:active {
    border-width: 1px;
    border-color: #546de5;
    background-color: #2bcbba;
  }
`;

const ClickArticle = styled.article`
  display: flex;
  flex-direction: row;
  margin-top: 0px;
  padding-top: 0px;
`;

const H4 = styled.h4`
  margin-top: 0px;
  margin-left: 5px;
  width: 80%;
  pointer-events: none;
  cursor: default;
`;

const Span = styled.span`
  margin-top: 0px;
  pointer-events: none;
  cursor: default;
`;

const ItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: none;
  width: 90%;
`;

const Drawer = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
`;
