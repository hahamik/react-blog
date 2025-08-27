import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);
  // const [keyword, setKeyword] = useState("");
  // const [model, setModel] = useState([]); // 최초의 상태가 대괄호가 되야됨 페이지가 아니라 배열만 관리할거라면 TODO 이거 설명 GPT
  const [model, setModel] = useState({
    totalPage: undefined,
    number: 0,
    isFirst: true,
    isLast: false,
    boards: [],
  }); // 페이지도 관리할거라면 중괄호 , 최초페이지 number는 0이여도 되고 undefinded여도 됨됨

  useEffect(() => {
    apiHome();
  }, [page]);

  async function apiHome() {
    // let response = await axios.get("http://localhost:8080");
    let response = await axios({
      method: "get",
      url: `http://localhost:8080?page=${page}`,
    });
    console.log(response.data.body.boards);
    setModel(response.data.body);
  }

  function prev() {
    setPage(page - 1);
  }
  function next() {
    setPage(page + 1);
  }

  function changeValue(e) {}

  return (
    <div>
      <Form className="d-flex mb-4" onSubmit={""}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={""}
          onChange={changeValue}
        />
      </Form>

      {model.boards.map((board) => (
        <BoardItem key={board.id} id={board.id} title={board.title} page={0} />
      ))}

      <br />
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Item onClick={prev} disabled={model.isFirst}>
            Prev
          </Pagination.Item>

          <Pagination.Item onClick={next} disabled={model.isLast}>
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
