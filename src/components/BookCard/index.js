import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const BookCard = ({ title, image }) => (
  <Card
    hoverable
    style={{ marginTop: 20 }}
    cover={<img alt="example" src={image} />}
  >
    <Meta title={title} />
  </Card>
);

export default BookCard;
