import React, { useEffect, useState } from "react";
import { Row, Button } from "antd";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { useAuth0 } from "@auth0/auth0-react";

import Comments from "./Sections/Comments";
import {
  apiURL,
  apiKey,
  imageURL,
  imageSize,
  beURL,
} from "../../../config/key";
import GridCards from "../../commons/GridCard";
import MainImage from "../../views/LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorites";
function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const { user, isLoading } = useAuth0();
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };

  useEffect(() => {
    let endpointForMovieInfo = `${apiURL}/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);

    axios
      .post(`${beURL}/api/comments/getComments`, movieVariable)
      .then((response) => {
        if (response.data.status) {
          return setCommentLists(response.data.comments);
        } else {
          alert("Failed to get comments Info");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${apiURL}/movie/${movieId}/credits?api_key=${apiKey}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            setCasts(result.cast);
          });

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const updateComment = () => {
    axios
      .post(`${beURL}/api/comments/getComments`, movieVariable)
      .then((response) => {
        if (response.data.status) {
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to get comments Info");
        }
      });
  };

  if (isLoading)
    return <LoadingOverlay active={true} spinner text="Loading..." />;

  return (
    <div>
      {/* Header */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${imageURL}${imageSize}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {user ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Favorite
              movieInfo={Movie}
              movieId={movieId}
              userFrom={user ? user.nickname : ""}
            />
          </div>
        ) : null}

        {/* Movie Info */}
        {!LoadingForMovie ? <MovieInfo movie={Movie} /> : <div>loading...</div>}

        <br />
        {/* Actors Grid*/}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {!LoadingForCasts ? (
              Casts.map((cast, index) => {
                let name = cast.name.replace(/ /g, "%20");
                let endpoint = `${apiURL}/search/person?api_key=${apiKey}&query=${name}`;
                let actor_id = fetch(endpoint)
                  .then((result) => result.json())
                  .then((result) => {
                    return result.results[0].id;
                  });

                return (
                  cast.profile_path && (
                    <React.Fragment key={index}>
                      <GridCards
                        actor
                        image={cast.profile_path}
                        characterName={cast.character}
                        name={cast.name}
                        keyProp={index}
                        actor_id={actor_id}
                      />
                    </React.Fragment>
                  )
                );
              })
            ) : (
              <div>loading...</div>
            )}
          </Row>
        )}
        <br />

        {/* Comments */}
        <Comments
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default MovieDetailPage;
