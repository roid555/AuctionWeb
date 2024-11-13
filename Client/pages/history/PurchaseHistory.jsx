import { useState, useEffect } from "react";
import axios from "axios";
import PurchasedCard from "../../components/cards/PurchasedCard";
import ReactPaginate from "react-paginate";
import "../productsPage/ProductsPage.css";
import ShowError from "../../components/alerts/ShowError";

function PurchaseHistory() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    axios
      .get(`order/userPurchases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        setProductData(response.data);
        setErrorCode(null);
      })
      .catch((error) => setErrorCode(error.response.status));
  }, []);

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (errorCode !== null) {
    return <ShowError code={errorCode} />;
  }

  return (
    <div className="products">
      <div className="myCards">
        <h1>My Purchases</h1>
        {currentProducts.map((product) => (
          <PurchasedCard
            key={product.id}
            productId={product.id}
            productName={product.name}
            description={product.description}
            category={product.category}
            startingBid={product.startingBid}
            autoBuyAmount={product.autoBuyAmount}
            status={"SOLD"}
            currentBid={product.currentBid}
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

export default PurchaseHistory;
