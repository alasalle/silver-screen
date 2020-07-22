import React, { useEffect, useState, Suspense } from "react";
import { Typography, Popover, Button, Row } from "antd";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { beURL, imageURL, posterSize } from "../../../config/key";
import FavoriteCard from "../../commons/FavoriteCard";
import { emailTrim } from "../../../functions/emailtrim";

import "./favorite.css";

const { Title } = Typography;

function FavoritePage() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchFavoredMovie();
    }
  }, [isLoading]);

  const fetchFavoredMovie = () => {
    let username = emailTrim(user.email)
    axios
      .post(`${beURL}/api/favorites/fetchFavorites`, { userFrom: username })
      .then((response) => {
        console.log({ RESPONSE: response });
        if (response.data.status) {
          setFavorites(response.data.faves);
          setLoading(false);
        } else {
          alert("Failed to get subscription videos");
        }
      })
      .catch(err => console.log({BIG_OLE_ERR: err}))
  };

  const onClickDelete = (movieId) => {
    const variables = {
      movieId: movieId,
      userFrom: emailTrim(user.email),
    };

    axios
      .post(`${beURL}/api/favorites/removeFromFavorite`, variables)
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

export default FavoritePage;
