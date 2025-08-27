import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);

  // 입력창 즉시 반영
  const [inputValue, setInputValue] = useState("");

  // API 호출용 (디바운싱된 값)
  const [keyword, setKeyword] = useState("");

  const [model, setModel] = useState({
    totalPage: undefined,
    number: 0,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  // lodash.debounce 사용 → keyword 업데이트를 0.5초 지연
  const debouncedSetKeyword = useMemo(
    () =>
      debounce((value) => {
        setKeyword(value);
        console.log("Debounced keyword:", value);
      }, 500),
    []
  );

  // inputValue가 변할 때 디바운스 함수 호출
  useEffect(() => {
    debouncedSetKeyword(inputValue);
  }, [inputValue, debouncedSetKeyword]);

  // 컴포넌트 unmount 시 debounce 취소
  useEffect(() => {
    return () => {
      debouncedSetKeyword.cancel();
    };
  }, [debouncedSetKeyword]);

  // page나 keyword가 변하면 API 호출
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
    setInputValue(e.target.value); // 입력창 즉시 반영
  }

  return (
    <div>
      <Form className="d-flex mb-4" onSubmit={(e) => e.preventDefault()}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={inputValue} // 입력창은 즉시 반영
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
