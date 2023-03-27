import React from "react";
import { useEffect, useState } from "react";
import Products from "../Components/Product";


import Navbar from "../Components/Navbar";


function Home() {
    const [product, setProduct] = useState([]);
    const [searchinput, setSearchInput] = useState("");
    const [lastSearch, setLastSearch] = useState("")
    const [loader, setLoader] = useState(false);
    const [cartitem, setCartItem] = useState(5);

    function search(value) {
        setLoader(true)
        fetch(`https://dummyjson.com/products/search?q=${value}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.products);
                setLoader(false)
                // console.log(data.products);
            })
            .catch((error) => {
                console.log(error);
            });


        // let tempobject = { textinput: value };
        // console.log(tempobject);
        // setProduct(tempobject)
        setLastSearch(searchinput)
        setSearchInput("");
        console.log(value);

    }

    function pressEnter(e) {
        if (e.key === 'Enter') {
            // console.log("Enter Key Pressed");
            searchinput.length > 0 && search(searchinput)
        }
    }

    useEffect(() => {
        setLoader(true)
        fetch("https://dummyjson.com/products?limit=100&page=0")
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.products);
                setLoader(false)
                // console.log(data.products);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)

            });
    }, []);
    return <>
        <Navbar
            pressEnter={pressEnter}
            searchinput={searchinput}
            setSearchInput={setSearchInput}
            search={search}
            cartvalue={cartitem}
        />
        {!loader && <div className="total-card">
            {product.map((item, index) => (
                <Products
                    key={index}
                    image={item.thumbnail}
                    category={item.category}
                    price={item.price}
                    rating={item.rating}
                    brand={item.brand}
                    description={item.description}
                    id={item.id}
                />
            ))}
        </div>}
        {loader && <h1 className="loader">Loading...</h1>}
        {product.length === 0 && loader === false && <h1>No Data Found {lastSearch} </h1>}

    </>


}
export default Home;