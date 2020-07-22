import React, { useEffect, useState, Suspense } from "react";
import { Typography, Popover, Button, Row } from "antd";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { beURL, imageURL, posterSize } from "../../../config/key";
import FavoriteCard from "../../commons/FavoriteCard";

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
    const endpoint = `${beURL}/api/favorites/fetchFavorites`;

    console.log(endpoint);
    axios
      .post(`${beURL}/api/favorites/fetchFavorites`, { userFrom: user.sub })
      .then((response) => {
        if (response.data.status) {
          setFavorites(response.data.faves);
          setLoading(false);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
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

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${imageURL}${posterSize}${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {" "}
            Remove{" "}
          </button>
        </td>
      </tr>
    );
  });

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
                    user={user}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>
      </div>
  );
}

export default FavoritePage;
