import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
import { beURL } from "../../../../config/key";
const { TextArea } = Input;

function SingleComment(props) {
    const { user, isAuthenticated, error, isLoading } = useAuth0();
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.ss_uid,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        axios.post(`${beURL}/api/comments/saveComment`, variables)
            .then(response => {
                console.log({COMMENT_USER: response.data.COMMENT_USER});
                if (response.data.status) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save comment')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={user.ss_uid} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment