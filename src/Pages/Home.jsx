import React from "react";
import { useEffect, useState } from "react";
import Products from "../Components/Product";

import "./home.css"
import Navbar from "../Components/Navbar";
import { Cart } from "../context/Context";
import { useContext } from "react";



function Home() {
    // const [product, setProduct] = useState([]);
    const [searchinput, setSearchInput] = useState("");
    const [lastSearch, setLastSearch] = useState("")
    const [loader, setLoader] = useState(false);
    const [cartItem, setCartItem] = useState(0);
    // const [productCheck, setProductCheck] = useState(true);

    const cartTotal = useContext(Cart);

    function search(value) {
        console.log(value);
        setLoader(true)
        fetch(`https://dummyjson.com/products/search?q=${value}`)
            .then((res) => res.json())
            .then((data) => {
                // setProduct(data.products);
                cartTotal.dispatch({
                    type: "total product",
                    payload: data.products
                })

                setLoader(false)
                console.log(data.products);
            })
            .catch((error) => {
                console.log(error);
            });


        // let tempobject = { textinput: value };
        // console.log(tempobject);
        // setProduct(tempobject)
        setLastSearch(searchinput)
        setSearchInput("");


    }

    function pressEnter(e) {
        if (e.key === 'Enter') {
            // console.log("Enter Key Pressed");
            searchinput.length > 0 && search(searchinput)
        }
    }


    function productApi() {
        setLoader(true)
        fetch("https://dummyjson.com/products?limit=100&page=0")
            .then((res) => res.json())
            .then((data) => {
                // setProduct(data.products);
                // setProductCheck(true)
                // totalProduct()
                let arr = data.products;
                for (let i = 0; i < data.products.length; i++) {
                    arr[i].qty = 1
                }
                console.log(arr);
                cartTotal.dispatch({
                    type: "total product",
                    payload: arr
                })
                // console.log(data.products)


                setLoader(false)
                // console.log(data.products);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)

            });
    }

    useEffect(() => {

        if (cartTotal.state.totalProduct.length === 0) {
            productApi()
        }
    }, []);

    // console.log(product);

    function totalProduct() {
        // cartTotal.dispatch({
        //     type: "total product",
        //     payload: product
        // })
        console.log(cartTotal);
    }
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
    }, [cartTotal.state.basket])




    // console.log(cartTotal);





    return <>
        <button onClick={totalProduct}>total product</button>

        <Navbar
            pressEnter={pressEnter}
            searchinput={searchinput}
            setSearchInput={setSearchInput}
            search={search}
            cartvalue={cartItem}
        />

        {!loader && <div className="total-card">
            {cartTotal.state.totalProduct.map((item, index) => (
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
        </div>}
        {loader && <h1 className="loader">Loading...</h1>}
        {cartTotal.state.totalProduct.length === 0 && loader === false && <h1>No Data Found {lastSearch} </h1>}

    </>


}
export default Home;