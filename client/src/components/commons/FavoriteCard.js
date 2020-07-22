import React from "react";
import { Card, Col, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { time_convert } from "../../functions/timeconvert";

const { Meta } = Card;

function FavoriteCard(props) {
  let { key, image, movieId, movieName, duration, deleteFunc } = props;

  return (
    <Col key={key} lg={6} md={8} xs={24}>
      <div style={{ position: "relative" }}>
        <Card
          hoverable
          style={{ width: "100%", height: "320px" }}
          cover={
            <a href={`/movie/${movieId}`}>
              <img alt={movieName} src={image} style={{ width: "100%" }} />
            </a>
          }
        >
          <Meta
            title={movieName}
            description={`Runtime: ${time_convert(duration)}`}
          />
          <Button
            type="default"
            icon={<CloseOutlined />}
            onClick={() => deleteFunc(movieId)}
            style={{ display: "block", margin: "26px auto" }}
          >
            Remove Favorite
          </Button>
        </Card>
      </div>
    </Col>
  );
}

export default FavoriteCard;
