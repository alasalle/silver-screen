import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

import { beURL } from '../../../../config/key';
import { emailTrim } from "../../../../functions/emailtrim";

function Favorite(props) {
    const {user, isAuthenticated, error, isLoading } = useAuth0();

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {

        if (!isAuthenticated) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed 
            axios.post(`${beURL}/api/favorites/removeFromFavorite`, variables)
                .then(response => {
                    if (response.data.status) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to remove from Favorites')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post(`${beURL}/api/favorites/addToFavorites`, variables)
                .then(response => {
                    if (response.data.status) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to add To Favorites')
                    }
                })
        }
    }

    useEffect(() => {

        axios.post(`${beURL}/api/favorites/favoriteNumber`, variables)
            .then(response => {
                if (response.data.status) {
                    setFavoriteNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get favorited count')
                }
            })

        axios.post(`${beURL}/api/favorites/favorited`, variables)
            .then(response => {
                if (response.data.status) {
                    setFavorited(response.data.subcribed)
                } else {
                    alert('Failed to get Favorite information')
                }
            })

    }, [FavoriteNumber, Favorited])


    return (
        <>
            <Button onClick={onClickFavorite} > {!Favorited ? "Add Favorite" : "Remove Favorite"} {FavoriteNumber}</Button>
        </>
    )
}

export default Favorite