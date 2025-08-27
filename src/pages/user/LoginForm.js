import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import reducer, { login } from "../../store";

const LoginForm = (props) => {
  const dispatch = useDispatch(); // reducer 호출출
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function submitLogin(e) {
    reducer();
    e.preventDefault();
    try {
      let response = await axios({
        method: "POST",
        url: "http://localhost:8080/login",
        data: user, // data에는 바디데이터 // axios는 javascript object를 전달하면 json으로 변환해서 전달함
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
      console.log(response);
      let jwt = response.headers.authorization;
      localStorage.setItem("jwt", jwt);

      // dispatch({ type: "LOGIN", jwt: jwt });
      dispatch(login(jwt)); // 실행 시켜서 결과를 가져옴 ()가 있으면 바로 실행행
    } catch (error) {
      // console.log(error);
      alert(error.response.data.msg);
    }
  }

  const changeValue = (e) => {
    //  통신해서 유효성 검사
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;
