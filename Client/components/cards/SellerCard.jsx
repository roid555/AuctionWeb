/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import "./myCards.css";

function SellerCard(props) {
  const statusClass = `status ${props.status.toLowerCase().replace(" ", "-")}`;

  function minNextBid(currentBid) {
    return currentBid + currentBid * 0.1;
  }

  return (
    <Card className="auction-card my-3">
      <Card.Body>
        <Card.Title className="text-primary">{props.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.category}
        </Card.Subtitle>

        <Card.Text className={statusClass}>
          {" "}
          Sell Status: {props.status}
        </Card.Text>

        <Card.Text>{props.description}</Card.Text>
        <Card.Text className="text-secondary">
          Sell ends at: {props.sellEndDate}
        </Card.Text>

        {props.autoBuyAmount && (
          <div className="autoBuyContainer bg-light p-2 rounded">
            <Card.Text className="font-weight-bold">
              Buy Now for: ${props.autoBuyAmount}
            </Card.Text>
          </div>
        )}

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
        </div>
      </Card.Body>
    </Card>
  );
}

export default SellerCard;
