import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import {LikeTwoTone, DislikeTwoTone} from "@ant-design/icons"
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import { beURL } from '../../../../config/key';
import { emailTrim } from "../../../../functions/emailtrim";

function LikeDislikes(props) {
    const { user, isAuthenticated, error, isLoading } = useAuth0();

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};
    let username = emailTrim(user.email)

    if (props.video) {
        variable = { videoId: props.videoId, userId: username}
    } else {
        variable = { commentId: props.commentId, userId: username }
    }

    


    useEffect(() => {

        axios.post(`${beURL}/api/likes/getLikes`, variable)
            .then(response => {
                // console.log('getLikes',response.data)

                if (response.data.status) {
                    //How many likes does this video or comment have 
                    setLikes(response.data.likes.length)

                    //if I already click this like button or not 
                    response.data.likes.map(like => {
                        if (like.userId === username) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        axios.post(`${beURL}/api/likes/getDislikes`, variable)
            .then(response => {
                // console.log('getDislike',response.data)
                if (response.data.status) {
                    //How many likes does this video or comment have 
                    setDislikes(response.data.dislikes.length)

                    //if I already click this like button or not 
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === username) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })

    }, [])


    const onLike = () => {
       
        if (!isAuthenticated) {
            return alert('Please login first');
        }

        if (LikeAction === null) {

            axios.post(`${beURL}/api/likes/upLike`, variable)
                .then(response => {
                    if (response.data.status) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to like')
                    }
                })


        } else {

            axios.post(`${beURL}/api/likes/unLike`, variable)
                .then(response => {
                    if (response.data.status) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to unlike')
                    }
                })

        }

    }


    const onDisLike = () => {

        if (!isAuthenticated) {
            return alert('Please Log in first');
        }

        if (DislikeAction !== null) {

            axios.post(`${beURL}/api/likes/unDisLike`, variable)
                .then(response => {
                    if (response.data.status) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to undislike')
                    }
                })

        } else {

            axios.post(`${beURL}/api/likes/upDisLike`, variable)
                .then(response => {
                    if (response.data.status) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to dislike')
                    }
                })


        }


    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <LikeTwoTone
                        twoToneColor={LikeAction === 'liked' ? '#1890ff' : '#344655'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                <DislikeTwoTone
                        twoToneColor={DislikeAction === 'disliked' ? '#1890ff' : 
                        '#344655'}
                        onClick={onDisLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes