import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);

  // 입력창 UI용 (즉시 반영)
  const [inputValue, setInputValue] = useState("");

  // API 호출용 (디바운스 적용됨)
  const [keyword, setKeyword] = useState("");

  const [model, setModel] = useState({
    totalPage: undefined,
    number: 0,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  // inputValue가 바뀌면 0.5초 기다렸다가 keyword 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(inputValue);
    }, 500);

    return () => clearTimeout(handler); // 새로운 입력이 들어오면 이전 타이머 취소
  }, [inputValue]);

  // page 또는 keyword 바뀌면 API 호출
  useEffect(() => {
    async function apiHome() {
      let response = await axios.get(
        `http://localhost:8080?page=${page}&keyword=${keyword}`
      );
      setModel(response.data.body);
    }
    apiHome();
  }, [page, keyword]);

  function prev() {
    if (!model.isFirst) {
      setPage(page - 1);
    }
  }

  function next() {
    if (!model.isLast) {
      setPage(page + 1);
    }
  }

  function changeValue(e) {
    setInputValue(e.target.value); // UI 즉시 반영
  }

  return (
    <div>
      <Form className="d-flex mb-4" onSubmit={(e) => e.preventDefault()}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={inputValue}
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
