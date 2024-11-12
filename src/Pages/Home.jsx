import { useEffect, useState } from "react";
import Products from "../Components/Product";
import Loader from "../Components/Loader";

import "./home.css";
import Navbar from "../Components/Navbar";
import { Cart } from "../context/Context";
import { useContext } from "react";
import SortFilterDropdown from "../Components/SortFilterDropdown";


// import Spinner from 'react-bootstrap/Spinner';
// import { Spinner } from "@chakra-ui/spinner"
// import { Spinner } from '@chakra-ui/react'

function Home() {
  // const [product, setProduct] = useState([]);
  const [searchinput, setSearchInput] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [cartItem, setCartItem] = useState(0);
  // const [sortValue, setSortValue] = useState("default");
  // const [filterValue, setFilterValue] = useState("all");

  const cartTotal = useContext(Cart);
  let sortPriceData = [ 
    { value: "default", text: "Default" },
    { value: "htl", text: "Price: High to Low" },
    { value: "lth", text: "Price: Low to High" }
  ]

  let filterCategoryData = [
    { value: "all", text: "All" },
    { value: "smartphones", text: "Smartphones" },
    { value: "laptops", text: "Laptops" },
    { value: "lighting", text: "Lighting" },
    { value: "home-decoration", text: "Home-Decoration" },
    { value: "mens-shoes", text: "Mens-Shoes" },
    { value: "sunglasses", text: "Sunglasses" }
  ]


  function search(value) {
    console.log(value);
    setLoader(true);
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => {
        // setProduct(data.products);
        data.products.map((item) => {
          item.qty = 1;
        });
        cartTotal.dispatch({
          type: "total product",
          payload: data.products,
        });
        displayProductData(
          [...data.products],
          cartTotal.state.sortPriceValue,
          cartTotal.state.filterCategoryValue
        );

        setLoader(false);
        console.log(data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    // let tempobject = { textinput: value };
    // console.log(tempobject);
    // setProduct(tempobject)
    setLastSearch(searchinput);
    setSearchInput("");
  }

  function pressEnter(e) {
    if (e.key === "Enter") {
      // console.log("Enter Key Pressed");
      searchinput.length > 0 && search(searchinput);
    }
  }

  function productApi() {
    setLoader(true);
    fetch("https://dummyjson.com/products?limit=100&page=0")
      .then((res) => res.json())
      .then((data) => {
        // setProduct(data.products);
        // setProductCheck(true)
        // totalProduct()
        // let arr = data.products;
        data.products.map((item) => {
          item.qty = 1;
        });
        // console.log(data.products);
        cartTotal.dispatch({
          type: "total product",
          payload: [...data.products],
        });

        displayProductData(
          [...data.products],
          cartTotal.state.sortPriceValue,
          cartTotal.state.filterCategoryValue
        );
        // console.log(data.products)

        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }




  // sort by price
  const sortPrice = (value) => {
    cartTotal.dispatch({
      type: "get sort value",
      payload: value,
    });
  };
  // filter category value
  const filterCategory = (value) => {
    cartTotal.dispatch({
      type: "get filter category value",
      payload: value,
    });
  };

  const displayProductData = (product, sort, category) => {
    console.log(product);
    let newSortData = [];
    if (category === "all" && sort === "default") {
      newSortData = [...product];
    } else if (category === "all" && sort !== "default") {
      newSortData = [...product];
      if (sort === "htl") {
        newSortData = newSortData.sort((a, b) => b.price - a.price);
      } else {
        newSortData = newSortData.sort((a, b) => a.price - b.price);
      }
    } else if (category !== "all" && sort === "default") {
      let result = product.filter((item) => item.category == category);
      newSortData = [...result];
    } else {
      if (sort === "lth") {
        let result = product.filter((item) => item.category == category);
        newSortData = [...result];
        newSortData = newSortData.sort((a, b) => a.price - b.price);
      } else {
        let result = product.filter((item) => item.category == category);
        newSortData = [...result];
        newSortData = newSortData.sort((a, b) => b.price - a.price);
      }
    }

    cartTotal.dispatch({
      type: "show product",
      payload: newSortData,
    });
  };

  useEffect(() => {
    displayProductData(
      cartTotal.state.totalProduct,
      cartTotal.state.sortPriceValue,
      cartTotal.state.filterCategoryValue
    );
  }, [cartTotal.state.sortPriceValue, cartTotal.state.filterCategoryValue]);

  useEffect(() => {
    if (cartTotal.state.totalProduct.length === 0) {
      productApi();
    }
  }, []);

  useEffect(() => {
    setCartItem(cartTotal.state.basket.length);
  }, [cartTotal]);

  return (
    <>
      {/* <button onClick={totalProduct}>total product</button> */}
      <Navbar
        pressEnter={pressEnter}
        searchinput={searchinput}
        setSearchInput={setSearchInput}
        search={search}
        cartvalue={cartItem}
      />

      {!loader && (
        <div className="total-card">
          <div className="sort-filter-background-div">

            <SortFilterDropdown selectFunction={sortPrice} value={cartTotal.state.sortPriceValue} data={sortPriceData} />
            <SortFilterDropdown selectFunction={filterCategory} value={cartTotal.state.filterCategoryValue} data={filterCategoryData} />

          </div>
          {cartTotal.state.filterSortData.map((item, index) => (
            <Products
              key={index}
              image={item.thumbnail}
              category={item.category}
              price={item.price}
              rating={item.rating}
              title={item.title}
              description={item.description}
              id={item.id}
              stock={item.stock}
              qty={item.qty}
            />
          ))}
        </div>
      )}
      {loader && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {/* {loader &&  <Spinner className="loader" animation="border" variant="primary" />} */}
      {cartTotal.state.totalProduct.length === 0 && loader === false && (
        <h1>No Data Found {lastSearch} </h1>
      )}
    </>
  );
}
export default Home;
