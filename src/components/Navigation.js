import React from "react";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Contain>
      <div>
        <span>새노트</span>
      </div>
      <LogOut>
        <button>로그아웃</button>
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
  background-color: gray;
`;

const LogOut = styled.div`
  padding-bottom: 30px;
`;
