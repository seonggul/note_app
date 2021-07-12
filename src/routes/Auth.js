import React, { useState } from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import { authService } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (!newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error.messages);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <Bg>
      <DivAuth>
        <Heading>
          <img alt="logo" src={logo} width="130px" height="130px" />
          <span>Power Note</span>
        </Heading>

        <LoginForm onSubmit={onSubmit}>
          <button>(로고)Google로 계속하기</button>
          <button>(로고)Facebook로 계속하기</button>
          <span>---------또는----------</span>
          <input
            placeholder="이메일을 입력하세요"
            onChange={onChange}
            required
            value={email}
            name="email"
            type="text"
          />
          <input
            name="password"
            required
            value={password}
            placeholder="비밀번호를 입력하세요"
            type="password"
            onChange={onChange}
          />
          <input
            name="password"
            type="submit"
            value={newAccount ? "로그인" : "회원가입"}
          />
        </LoginForm>

        <BottomClick>
          <span>계정이 없으세요?</span>
          <span onClick={toggleAccount}>계정 만들기</span>
        </BottomClick>
      </DivAuth>
    </Bg>
  );
};

export default Auth;

const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  width: 100vw;

  /*   background-image: url("background.jpg");
  background-position: center; */
`;

const DivAuth = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 2px solid;
  width: 400px;
  height: 600px;
`;

const Heading = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomClick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
