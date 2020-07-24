import React, { useEffect, useState } from "react";
import { Typography, Row, Button } from "antd";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { beURL, imageURL, posterSize } from "../../../config/key";
import FavoriteCard from "../../commons/FavoriteCard";

import "./favorite.css";

const { Title } = Typography;

function FavoritePage() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchFavoredMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const fetchFavoredMovie = async () => {
    let username = user.nickname;
    const accessToken = await getAccessTokenSilently();
    axios
      .post(
        `${beURL}/api/favorites/fetchFavorites`,
        { userFrom: username },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          setFavorites(response.data.faves);
        } else {
          alert("Failed to get subscription videos");
        }
      })
      .catch((err) => console.log({ BIG_OLE_ERR: err }));
  };

  const onClickDelete = async (movieId) => {
    const variables = {
      movieId: movieId,
      userFrom: user.nickname,
    };
    const accessToken = await getAccessTokenSilently();

    axios
      .post(`${beURL}/api/favorites/removeFromFavorite`, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          fetchFavoredMovie();
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
  };

  if (isLoading)
    return <LoadingOverlay active={true} spinner text="Loading..." />;

  if (!isLoading && isAuthenticated) {
    return (
      <div style={{ width: "100%", margin: "0" }}>
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <Title level={2}> Favorites </Title>
          <hr />
          <Row gutter={[16, 16]}>
            {Favorites &&
              Favorites.map((movie, index) => (
                <React.Fragment key={index}>
                  <FavoriteCard
                    image={
                      movie.moviePost
                        ? `${imageURL}${posterSize}${movie.moviePost}`
                        : null
                    }
                    movieId={movie.movieId}
                    movieName={movie.movieTitle}
                    duration={movie.movieRunTime}
                    deleteFunc={onClickDelete}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>
      </div>
    );
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <div>
        <Button onClick={loginWithRedirect()} />
      </div>
    );
  }
}

export default FavoritePage;
