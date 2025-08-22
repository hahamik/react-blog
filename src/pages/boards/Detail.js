import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Detail = (props) => {
  const { id } = 1;
  const navigate = useNavigate();
  const [board, setBoard] = useState({});

  async function fetchDetail(boardId) {}

  async function fetchDelete(boardId) {}

  return (
    <div>
      <Link to={`/updateForm/${board.id}`} className="btn btn-warning">
        수정
      </Link>
      <Button className="btn btn-danger" onClick={() => fetchDelete(board.id)}>
        삭제
      </Button>
      <br />
      <br />
      <h1>{board.title}</h1>
      <hr />
      <div>{board.content}</div>
    </div>
  );
};

export default Detail;
