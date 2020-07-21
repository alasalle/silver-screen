import React, { useEffect, useState, Suspense } from "react";
import { Typography, Popover, Button } from "antd";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import "./favorite.css";
import { useAuth0 } from "@auth0/auth0-react";
import { beURL, imageURL, posterSize } from "../../../config/key";

const { Title } = Typography;

function FavoritePage() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
        fetchFavoredMovie()
    }
  }, [isLoading]);

  const fetchFavoredMovie = () => {
      const endpoint = `${beURL}/api/favorites/fetchFavorites`

      console.log(endpoint)
    axios
      .post(`${beURL}/api/favorites/fetchFavorites`, {userFrom: user.sub})
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
      .post("/api/favorites/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
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
    <Suspense
      fallback={<LoadingOverlay active={true} spinner text="Loading..." />}
    >
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2}> Favorite Movies </Title>
        <hr />
        {!Loading && (
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
              </tr>
            </thead>
            <tbody>{renderCards}</tbody>
          </table>
        )}
      </div>
    </Suspense>
  );
}

export default FavoritePage;
