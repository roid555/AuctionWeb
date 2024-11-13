import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import FloatLabelBtn from "../../components/floatLabelBtn/FloatLabelBtn";
import "./AddProduct.css";
import ShowError from "../../components/alerts/ShowError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [autoBuyAmount, setAutoBuyAmount] = useState("");
  const [sellEndDate, setSellEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorCode, setErrorCode] = useState(null);
  const navigate = useNavigate();

  /*
   get the categories of products from the server to display it as options
   inside the dropdown
  */
  useEffect(() => {
    axios
      .get("product/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      })

      .then((response) => {
        const options = response.data.map((category) => ({
          value: category,
          label: labelCategory(category),
        }));
        setCategories(options);
        setErrorCode(null);
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  }, []);

  const labelCategory = (string) => {
    return string
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  /**
   * create an object of the product the user wants to add and send it to the server
   */
  const submitProduct = (e) => {
    e.preventDefault();
    const sellEndDateObj = new Date(sellEndDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    sellEndDateObj.setHours(0, 0, 0, 0);
    if (Number(startingBid) <= 0 || Number(autoBuyAmount) <= 0) {
      toast.error("bid and buy cant be less than zero");
      return;
    }
    if (autoBuyAmount > 0 && Number(startingBid) > Number(autoBuyAmount)) {
      toast.error("Starting bid can't be higher than the Auto-buy amount");
      return;
    } else if (sellEndDateObj <= today) {
      toast.error("Sell end date must be in the future");
    } else {
      const product = {
        name: productName,
        category: category,
        description: description,
        startingBid: startingBid,
        autoBuyAmount: autoBuyAmount,
        sellerEmail: localStorage.getItem("myEmail"),
        sellEndDate: sellEndDate,
      };

      axios
        .post("/product", product, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        })
        .then(() => {
          setErrorCode(null);
          toast.success("Item added successfully!!");
          navigate("/sellerProducts");
        })
        .catch((error) => {
          setErrorCode(error.response.status);
        });
    }
  };

  if (errorCode !== null) {
    return <ShowError code={errorCode} />;
  }
  return (
    <div>
      <form className="add-product" onSubmit={submitProduct}>
        <h1>Sell New Item</h1>
        <FloatLabelBtn
          type="text"
          required
          value={productName}
          labelName="Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <div className="category-select">
          <Select
            className="select-control"
            options={categories}
            onChange={(e) => setCategory(e.value)}
          />
        </div>

        <div className="purchase-amount">
          <FloatLabelBtn
            type="number"
            addClass="bid-input"
            required
            value={startingBid}
            labelName="Starting Bid"
            onChange={(e) => setStartingBid(e.target.value)}
          />
          <FloatLabelBtn
            type="number"
            addClass="byu-now"
            value={autoBuyAmount}
            labelName="Auto-Buy Amount"
            onChange={(e) => setAutoBuyAmount(e.target.value)}
          />
        </div>
        <div className="end-date-time">
          <FloatLabelBtn
            type="date"
            addClass="end-date"
            required
            value={sellEndDate}
            labelName="Sell End Date"
            onChange={(e) => setSellEndDate(e.target.value)}
          />
        </div>

        <div className="form-floating mb-3">
          <TextareaAutosize
            id="floatingInput"
            className="form-control"
            type="text"
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="floatingInput">Description</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
