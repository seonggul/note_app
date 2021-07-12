import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import styled from "styled-components";
import { authService } from "../fbase";

const App = () => {
  const [initial, setInitial] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        //user객체의 정보가 방대하기 때문에 react에서 리렌더링을 하지못한다.
        //넘길 데이터를 축소시켜서 넘기는 방법으로 네비게이션에 이름을 바로 바꿀수도 있고 새배열에 user 사본을 만들어서 리렌더링 시킬수도 있다.
        //그렇지만 사본을 만드는 방법은 오류가 생길수도 있으니 알아서 잘 선택하자.
      } else {
        setUserObj(null);
      }
      setInitial(true);
    });
  }, []);
  /*   const refreshUser = () => {
    const user = authService.currentUser;
    // user를 빈 배열에 복사하는 것. 리엑트는 이렇게 되면 변화를 감지하고 리렌더링한다.
    //setUserObj(Object.assign({}, user));
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }; */
  return (
    <DivInitial>
      {initial ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Loading..."
      )}
    </DivInitial>
  );
};

export default App;

const DivInitial = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
