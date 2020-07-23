import React from "react";
import { Card, Col } from "antd";
import { imageURL } from "../../config/key";

const { Meta } = Card;

function GridCards(props) {
  let {
    actor,
    keyProp,
    image,
    movieId,
    movieName,
    characterName,
    name,
    actor_id,
  } = props;
  const POSTER_SIZE = "w154";

  if (actor) {
    return (
      <Col key={keyProp} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/actor/${actor_id}`}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  style={{ width: "100%" }}
                  alt={characterName}
                  src={`${imageURL}${POSTER_SIZE}${image}`}
                />
              }
            >
              <Meta title={name} description={`Character: ${characterName}`} />
            </Card>
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col key={keyProp} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt={movieName}
              src={image}
            />
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCards;
