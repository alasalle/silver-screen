import React, { useState } from "react";
import { Button, Input, Typography, Divider, Form, Avatar } from "antd";
import { CloseSquareTwoTone, CheckSquareTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { beURL } from "../../../../config/key";
import { emailTrim } from "../../../../functions/emailtrim";
import logo from "../../../../assets/logo_edit.png";

const { TextArea } = Input;
const { Title } = Typography;

function Comments(props) {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const { refreshFunction } = props;
  const [Comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(true);
  const [commentLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAuthenticated) {
      return alert("Please Log in first");
    }

    const username = emailTrim(user.email);

    const variables = {
      content: Comment,
      writer: username,
      postId: props.postId,
    };
    // console.log(variables)

    axios
      .post(`${beURL}/api/comments/saveComment`, variables)
      .then((response) => {
        if (response.data.status) {
          setLoading(false);
          setComment("");
          props.refreshFunction();
        } else {
          alert("Failed to save comment");
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <br />
      <Title level={3}> Comments</Title>
      <hr />
      {/* Comment Lists  */}
      {/* {console.log(props.CommentLists)} */}

      {props.CommentLists &&
        props.CommentLists.map((comment, index) => {
          // console.log({COMMENT: comment})
          return (
            !comment.responseTo && (
              <React.Fragment key={comment._id}>
                <SingleComment
                  stateSetter={setOpenComment}
                  openComment={openComment}
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
          );
        })}

      {props.CommentLists && props.CommentLists.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          Be the first to share your thoughts on this movie!
        </div>
      )}

      {openComment && (
        <>
          <Form.Item>
            <TextArea
              rows={4}
              onChange={handleChange}
              value={Comment}
              placeholder="Leave a comment about the movie."
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              icon={<CheckSquareTwoTone twoToneColor="#5cb85c" size="large" />}
              onClick={onSubmit}
              loading={commentLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </>
      )}
    </div>
  );
}

export default Comments;
