import React, { useEffect, useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";
import axios from "axios";

const Home = () => {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [model, setModel] = useState({
    totalPage: undefined,
    number: 0,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  useEffect(() => {
    apiHome();
  }, [page, keyword]);

  async function apiHome() {
    let response = await axios({
      method: "get",
      url: `http://localhost:8080?page=${page}&keyword=${keyword}`,
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

  function changeValue(e) {
    setKeyword(e.target.value);
  }

  return (
    <div>
      <Form className='d-flex mb-4' onSubmit={""}>
        <FormControl
          type='search'
          placeholder='Search'
          className='me-2'
          aria-label='Search'
          value={keyword}
          onChange={changeValue}
        />
      </Form>

      {model.boards.map((board) => (
        <BoardItem key={board.id} id={board.id} title={board.title} page={0} />
      ))}

      <br />
      <div className='d-flex justify-content-center'>
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
