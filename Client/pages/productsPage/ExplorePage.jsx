import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/cards/ProductCard";
import ReactPaginate from "react-paginate";
import "./ProductsPage.css";
import Select from "react-select";
import FloatLabelBtn from "../../components/floatLabelBtn/FloatLabelBtn";
import ShowError from "../../components/alerts/ShowError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExplorePage() {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const productsPerPage = 5;
  const [errorCode, setErrorCode] = useState(null);

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    axios
      .get("product/allProducts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      })
      .then((response) => {
        setProductData(response.data);
        setErrorCode(null);
      })
      .then(() =>
        axios.get("product/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        })
      )
      .then((response) => {
        setErrorCode(null);
        const options = [
          { value: "", label: "All" },
          ...response.data.map((category) => ({
            value: category,
            label: labelCategory(category),
          })),
        ];
        setCategories(options);
      })
      .catch((error) => setErrorCode(error.response.status));
  }, []);

  const labelCategory = (string) => {
    return string
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const rerender = () => {
    axios
      .get("product/allProducts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      })
      .then((response) => {
        setErrorCode(null);
        setProductData(response.data);
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

  const handleFilterChange = (selectedOption) => {
    setFilterCategory(selectedOption ? selectedOption.value : "");
    setCurrentPage(0); // Reset to the first page after filtering
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to the first page after searching
  };

  const filteredProducts = productData.filter((product) => {
    // Apply category filter if a category is selected
    const matchesCategory =
      filterCategory === "" || product.category === filterCategory;

    // Apply search filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    setNoResults(
      filteredProducts.length === 0 && (filterCategory || searchQuery)
    );
  }, [filteredProducts, filterCategory, searchQuery]);

  if (errorCode !== null) {
    return <ShowError code={errorCode} />;
  }

  return (
    <div className="products">
      <div className="myCards">
        <h1>Auction</h1>
        <div className="filters">
          <div className="category-select">
            <Select
              value={
                // default to all
                categories.find((option) => option.value === filterCategory) ||
                categories[0]
              }
              options={categories}
              onChange={handleFilterChange}
            />
          </div>
          <div className="search">
            <FloatLabelBtn
              type="text"
              required
              value={searchQuery}
              labelName="Search Product Name"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {noResults ? (
          <div>
            <h2>No results found.</h2>
          </div>
        ) : (
          currentProducts.map((product) => (
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
          ))
        )}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default ExplorePage;
