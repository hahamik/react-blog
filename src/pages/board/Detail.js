import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = (props) => {
  const { id } = useParams();
  const jwt = useSelector((state) => state.jwt);
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    id: undefined,
    title: "",
    content: "",
    userId: undefined,
    username: "",
    owner: false,
    replies: [],
  });

  useEffect(() => {
    fetchDetail(id);
  }, []);

  async function fetchDetail(boardId) {
    let response = await axios({
      method: "GET",
      url: `http://localhost:8080/api/boards/${boardId}`,
      headers: {
        Authorization: jwt,
      },
    });
    let responseBody = response.data;
    setBoard(responseBody.body);
  }

  async function fetchDelete(boardId) {
    await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/boards/${boardId}`,
      headers: {
        Authorization: jwt,
      },
    });
    navigate("/");
  }

  // update-form 갈때 상세보기의 상태 Board를 가져가는 것 연습해보기
  return (
    <div>
      {board.owner ? (
        <>
          <Link to={`/update-form/${board.id}`} className='btn btn-warning'>
            수정
          </Link>
          <Button
            className='btn btn-danger'
            onClick={() => fetchDelete(board.id)}
          >
            삭제
          </Button>
        </>
      ) : (
        <></>
      )}

      <br />
      <br />
      <h1>{board.title}</h1>
      <hr />
      <div>{board.content}</div>
      <br />
      <br />
      <hr />
      {/* 댓글 입력 폼 */}
      <Card className='mb-4 shadow-sm border-0'>
        <Card.Body>
          <Form onSubmit={""}>
            <Form.Group className='mb-3'>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='댓글을 입력하세요...'
                value={""}
                onChange={""}
              />
            </Form.Group>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Button variant='primary' type='submit'>
                댓글 작성
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* 댓글 목록 */}
      <div className='comment-list'>
        <Card className='mb-3 shadow-sm border-0'>
          <Card.Body>
            <div className='d-flex justify-content-between'>
              <div>
                <div className='d-flex align-items-center mb-2'>
                  <div className='flex-grow-1'>
                    <h6 className='mb-0 fw-bold'>{"ssar"}</h6>
                  </div>
                </div>
                <p className='mb-2'>{"댓글 내용"}</p>
              </div>
              <Button variant='danger'>삭제</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
