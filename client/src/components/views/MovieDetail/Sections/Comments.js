import React, { useState } from 'react'
import { Button, Input, Typography, } from 'antd';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { beURL } from '../../../../config/key';

const { TextArea } = Input;
const { Title } = Typography;

function Comments(props) {
    const {user, isAuthenticated, isLoading, error } = useAuth0();
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user.sub,
            postId: props.postId
        }
        // console.log(variables)

        axios.post(`${beURL}/api/comments/saveComment`, variables)
            .then(response => {
                if (response.data.status) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save comment')
                }
            })
    }

    return (
        <div>
            <br />
            <Title level={3} > Comments</Title>
            <hr />
            {/* Comment Lists  */}
            {/* {console.log(props.CommentLists)} */}

            {props.CommentLists && props.CommentLists.map((comment, index) => {
                // console.log({COMMENT: comment})
                return (
                
                (!comment.responseTo &&
                    <React.Fragment key={comment._id}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            )})}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first to share your thoughts on this movie!
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments