import React, { useState } from "react";
import { Button, Input, Form, Avatar, Comment } from "antd";
import { CloseSquareTwoTone, CheckSquareTwoTone } from "@ant-design/icons";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import LikeDislikes from "./LikeDislikes";
import { beURL } from "../../../../config/key";
import { emailTrim } from "../../../../functions/emailtrim";
import logo from "../../../../assets/logo_edit.png";

const { TextArea } = Input;

function SingleComment(props) {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const { stateSetter, openComment, refreshFunction } = props;
  const username = user ? user.nickname : "";
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const [commentLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    stateSetter(false);
    setOpenReply(!OpenReply);
  };

  const nevermind = () => {
    setLoading(true);
    setOpenReply(!OpenReply);
    setLoading(false);
    stateSetter(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = user ? user.nickname : "";
    const accessToken = await getAccessTokenSilently();

    const variables = {
      writer: username,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    axios
      .post(`${beURL}/api/comments/saveComment`, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          setCommentValue("");
          setLoading(false);
          setOpenReply(!OpenReply);
          stateSetter(true);
          refreshFunction();

          // props.refreshFunction(response.data.result)
        } else {
          setLoading(false);
          alert("Failed to save comment");
        }
      });
  };

  if (isLoading)
    return <LoadingOverlay active={true} spinner text="Loading..." />;

  return (
    <div>
      <Comment
        actions={
          isAuthenticated && user
            ? props.comment.writer === user.nickname
              ? null
              : [
                  <LikeDislikes
                    comment
                    commentId={props.comment._id}
                    userId={username}
                  />,
                  <span onClick={openReply} key="comment-basic-reply-to">
                    Reply
                  </span>,
                ]
            : null
        }
        author={props.comment.writer}
        avatar={<Avatar src={logo} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && !openComment && isAuthenticated && (
        <>
          <Form.Item>
            <TextArea
              rows={4}
              onChange={handleChange}
              value={CommentValue}
              placeholder={`Reply to ${props.comment.writer}.`}
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
            <Button
              htmlType="default"
              icon={<CloseSquareTwoTone twoToneColor="#FF0000" size="large" />}
              onClick={nevermind}
              loading={commentLoading}
            >
              Close
            </Button>
          </Form.Item>
        </>
      )}
    </div>
  );
}

export default SingleComment;
