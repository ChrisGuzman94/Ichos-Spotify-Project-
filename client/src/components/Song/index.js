import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";

function Song({ title, artist, link, image, Button }) {
  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{title}</h3>
        </Col>
        <Col size="md-4">
          <div className="btn-container">
            <audio controls src={link} />
            <Button />
          </div>
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <h1 className="font-italic small">By {artist}</h1>
        </Col>
      </Row>
      <Row>
        <Col size="12 sm-4 md-2">
          <img
            className="img-thumbnail img-fluid w-100"
            src={image}
            alt={title}
          />
        </Col>
      </Row>
    </ListItem>
  );
}

export default Song;
