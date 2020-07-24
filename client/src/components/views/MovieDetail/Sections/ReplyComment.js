import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    // eslint-disable-next-line
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.CommentLists, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment key={comment._id}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
              stateSetter={props.stateSetter}
              openCmment={props.openComment}
            />
            <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
              stateSetter={props.stateSetter}
              openCmment={props.openComment}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
      {ChildCommentNumber > 0 && !OpenReplyComments && (
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            color: "#1890ff",
            cursor: "pointer",
          }}
          onClick={handleChange}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      )}

      {ChildCommentNumber > 0 && OpenReplyComments && (
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            color: "#FF0000",
            cursor: "pointer",
          }}
          onClick={handleChange}
        >
          Collapse comment thread
        </p>
      )}
    </div>
  );
}

export default ReplyComment;
