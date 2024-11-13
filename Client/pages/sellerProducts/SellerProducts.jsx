import { useState, useEffect } from "react";
import axios from "axios";
import SellerCard from "../../components/cards/SellerCard";
import ReactPaginate from "react-paginate";
import "../productsPage/ProductsPage.css";
import ShowError from "../../components/alerts/ShowError";

function ProductsPage() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    axios
      .get(
        `product/sellerProducts?sellerEmail=${localStorage.getItem("myEmail")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        }
      )
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

  function myCardStatus(status) {
    if (status == "ON_GOING") return "On Going";
    if (status == "UNSOLD") return "Unsold";
    if (status == "SOLD") return "Sold";
  }

  if (errorCode !== null) {
    return <ShowError code={errorCode} />;
  }

  return (
    <div className="products">
      <div className="myCards">
        <h1>My Products</h1>
        {currentProducts.map((product) => (
          <SellerCard
            key={product.id}
            productId={product.id}
            productName={product.name}
            description={product.description}
            category={product.category}
            startingBid={product.startingBid}
            autoBuyAmount={product.autoBuyAmount}
            sellEndDate={product.sellEndDate}
            status={myCardStatus(product.status)}
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

export default ProductsPage;
