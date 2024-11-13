import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/cards/ProductCard";
import ReactPaginate from "react-paginate";
import "../productsPage/ProductsPage.css";
import ShowError from "../../components/alerts/ShowError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActiveBids() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const [errorCode, setErrorCode] = useState(null);

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    axios
      .get("order/activeBids", {
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      })
      .then((response) => {
        setProductData(response.data);
        setErrorCode(null);
      })
      .catch((error) => setErrorCode(error.response.status));
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const rerender = () => {
    axios
      .get("order/activeBids", {
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      })
      .then((response) => {
        setProductData(response.data);
        setErrorCode(null);
      })
      .catch((error) => setErrorCode(error.response.status));
  };

  const buyNow = (productId) => {
    axios
      .put(
        `/order/autobuy/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        }
      )
      .then(() => {
        setErrorCode(null);
        rerender();
        toast.success("Your won the bid!!");
      })
      .catch((error) => setErrorCode(error.response.status));
  };

  const placeBid = (userBid, productId, currentBid, buyNowSum) => {
    const bidValue = parseFloat(userBid);
    if (isNaN(bidValue)) {
      toast.error("You must place a bid !");
      return;
    }
    if (bidValue < currentBid) {
      toast.error("Please check the minimum bid required");
      return;
    }
    if (bidValue >= buyNowSum) {
      toast.info(
        "Your bid reach the the buy now amount, if you wish to pay it please use the `Buy Now` method"
      );
      return;
    } else {
      axios
        .put(
          `/order/bid/${productId}/${userBid}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("myToken")}`,
            },
          }
        )
        .then(() => {
          toast.success("Your bid placed successfully!");
          setErrorCode(null);
          rerender();
        })
        .catch((error) => setErrorCode(error.response.status));
    }
  };

  if (errorCode !== null) {
    return <ShowError code={errorCode} />;
  }

  return (
    <div className="products">
      <div className="myCards">
        <h1>My Bids</h1>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            productName={product.name}
            description={product.description}
            category={product.category}
            startingBid={product.startingBid}
            autoBuyAmount={product.autoBuyAmount}
            sellEndDate={product.sellEndDate}
            currentBid={product.currentBid}
            buyNowFunction={buyNow}
            bidFunction={placeBid}
          />
        ))}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(productData.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default ActiveBids;
