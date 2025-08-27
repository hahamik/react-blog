import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

function Header(props) {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  async function logoutProc() {
    await localStorage.removeItem("jwt"); // 이거 날리는걸 디스크가 함 그래서 cpu는 그냥 내려가게 하기 위해서 await랑 async를 걸어서 해결
    dispatch(logout());
  }

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/" className="navbar-brand">
          블로그홈
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLogin ? (
              <>
                <Link to="/save-form" className="nav-link">
                  글쓰기
                </Link>
                {/* <Link className="nav-link" onClick={dispatch(logout())}> 이렇게하면 토큰을 못 날린다.*/}
                <Link className="nav-link" onClick={logoutProc()}>
                  로그아웃
                </Link>
              </>
            ) : (
              <>
                <Link to="/login-form" className="nav-link">
                  로그인
                </Link>
                <Link to="/join-form" className="nav-link">
                  회원가입
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
}

export default Header;
