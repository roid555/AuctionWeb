/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import "./myCards.css";

function PurchasedCard(props) {
  return (
    <Card className="auction-card my-3 purchaseCard">
      <Card.Body>
        <Card.Title className="text-primary">{props.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.category}
        </Card.Subtitle>

        <Card.Text className="buyText">
          {" "}
          Bought for: {props.currentBid}
        </Card.Text>

        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PurchasedCard;
