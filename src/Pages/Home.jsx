import { useEffect, useState } from "react";
import Products from "../Components/Product";

import "./home.css";
import Navbar from "../Components/Navbar";
import { Cart } from "../context/Context";
import { useContext } from "react";

function Home() {
  // const [product, setProduct] = useState([]);
  const [searchinput, setSearchInput] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [cartItem, setCartItem] = useState(0);
  // const [productCheck, setProductCheck] = useState(true);

  const cartTotal = useContext(Cart);

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
          payload: data.products,
        });
        // console.log(data.products)

        setLoader(false);
        // console.log(data.products);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }

  useEffect(() => {
    if (cartTotal.state.totalProduct.length === 0) {
      productApi();
    }
  }, []);

  // console.log(product);

  // function totalProduct() {
  //     // cartTotal.dispatch({
  //     //     type: "total product",
  //     //     payload: product
  //     // })
  //     console.log(cartTotal);
  // }
  // useEffect(() => {
  //     let arr = cartTotal.state.totalProduct;
  //     for (let i = 0; i < cartTotal.state.totalProduct.length; i++) {
  //         arr[i].qty = 1;
  //     }
  //     console.log(arr);
  // }, [totalProduct])
  // console.log(totalProduct);

  useEffect(() => {
    setCartItem(cartTotal.state.basket.length);
    // cartTotal.state.totalProduct.map((item)=>{
    //   cartTotal.state.basket.map((item)=>{
    //     if(item.id!==item.id){
    //       item.qty=1;
    //     }
    //   })
    // })

    //   var totalProductArr = cartTotal.state.totalProduct;
    //   var totalBasket = cartTotal.state.basket;
    //   for (var i = 0; i < totalProductArr.length; i++) {
    //     for (var j = 0; j < totalBasket.length; j++) {
    //       // if (totalProductArr(i).id !== totalBasket(j).id) {
    //         //  totalProductArr(i).qty = 1;
    //         console.log(totalProductArr);
    //       // }
    //     }
    //   }
  }, [cartTotal]);

  // console.log(cartTotal);

  // sort by price
  const sortPrice = () => {
    cartTotal.dispatch({
      type: "get sort value",
      // payload: cartTotal.totalProduct
    });
  };
  const filterCategory = ()=>{
    cartTotal.dispatch({
      type: "get filter category value"
    })
  }

  useEffect(() => {
    cartTotal.dispatch({
      type: "sorted data",
      payload: cartTotal.state.filter_sortData,
    });
  }, [cartTotal.state.sortPriceValue]);


  useEffect(()=>{
    cartTotal.dispatch({
      type: "filter category data",
      payload: cartTotal.state.filter_sortData
    })
  },[cartTotal.state.filterCategoryValue])


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
            <div className="sort-filter">
              <select
                onChange={sortPrice} name="sort" id="sort"
              >
                <option value="sort">Sort</option>
                <option disabled></option>
                <option value="htl">Price: High to Low</option>
                <option disabled></option>
                <option value="lth">Price: Low to High</option>
              </select>

              <select
                onChange={filterCategory} name="category" id="category"
              >
                <option value="category">Category</option>
                <option value="#" disabled></option>
                <option value="smartphones">smartphones</option>
                <option value="#" disabled></option>
                <option value="laptops">laptops</option>
                <option value="#" disabled></option>
                <option value="lighting">lighting</option>
                <option value="#" disabled></option>
                <option value="home-decoration">home-decoration</option>
                <option value="#" disabled></option>
                <option value="mens-shoes">mens-shoes</option>
                <option value="#" disabled></option>
                <option value="sunglasses">sunglasses</option>
              </select>
              <select
              // onChange={(e) => {
              //   setPrice(e.target.value);
              // }}
              // name="price-range"
              // id="price-range"
              >
                <option value="0">Price</option>
                <option value="#" disabled></option>
                <option value="4999">₹0 to 4999</option>
                <option value="#" disabled></option>
                <option value="9999">₹5,000 to 9999</option>
                <option value="#" disabled></option>
                <option value="14999">₹10,000 to 14999</option>
                <option value="#" disabled></option>
                <option value="15000">₹15,000 and above</option>
              </select>
            </div>
          </div>
          {cartTotal.state.filter_sortData.map((item, index) => (
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
      {loader && <h1 className="loader">Loading...</h1>}
      {cartTotal.state.totalProduct.length === 0 && loader === false && (
        <h1>No Data Found {lastSearch} </h1>
      )}
    </>
  );
}
export default Home;
