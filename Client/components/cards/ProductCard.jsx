/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./myCards.css";
import { useState } from "react";

function ProductCard(props) {
  const [userBid, setUserBid] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function minNextBid(currentBid) {
    return Math.ceil(currentBid + currentBid * 0.1) > props.autoBuyAmount
      ? props.autoBuyAmount
      : Math.ceil(currentBid + currentBid * 0.1);
  }

  return (
    <Card className="auction-card my-3">
      <Card.Body>
        <Card.Title className="text-primary">{props.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.category}
        </Card.Subtitle>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text className="text-secondary">
          Sell ends at: {props.sellEndDate}
        </Card.Text>

        <div className="mt-3">
          <Card.Text>
            {props.currentBid
              ? `Current bid: $${props.currentBid}`
              : "No bids yet"}
          </Card.Text>

          <p className="text-muted">
            Next bid must be at least{" "}
            {props.currentBid
              ? minNextBid(props.currentBid)
              : props.startingBid}
          </p>
          <div>
            <input
              type="number"
              id="bidInput"
              className="form-control mb-2"
              value={userBid}
              onChange={(e) => setUserBid(e.target.value)}
            />

            <Button
              variant="primary"
              onClick={() => {
                props.bidFunction(
                  userBid,
                  props.productId,
                  minNextBid(props.currentBid),
                  props.autoBuyAmount
                );
                setUserBid("");
              }}
            >
              Place My Bid
            </Button>
          </div>
        </div>

        {props.autoBuyAmount && (
          <div className="autoBuyContainer bg-light p-2 rounded">
            <Card.Text className="font-weight-bold">
              Buy Now for: ${props.autoBuyAmount}
            </Card.Text>
            <Button
              variant="success"
              disabled={isButtonDisabled}
              onClick={() => {
                props.buyNowFunction(props.productId);
                setIsButtonDisabled(true);
              }}
            >
              Buy Now
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
