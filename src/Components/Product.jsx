import { useEffect, useState } from "react";


// import React from "react";
function Products() {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=40&page=0")
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.products);

                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(product);



    return <div>
        <div>
            <input type="text" />
            <button>Search</button>
        </div>
        <div className="total-card">
            {product.map((item) => (
                <div className="card">
                    <img src={item.thumbnail} alt="" />
                    <div className="card-details">
                        <div>
                            <h5>Category :</h5>
                            <p>Price :</p>
                            <p>Rating :</p>
                            <p>Brand :</p>
                        </div>
                        <div>
                            <h5>{item.category}</h5>
                            <p>{item.price}</p>
                            <p>{item.rating}</p>
                            <p>{item.brand}</p>
                        </div>
                    </div>

                    <div className="description">
                        <h6>Description</h6>
                        <p >{item.description}</p>
                    </div>

                    <div className="card-button">
                        <button>Add to Cart</button>
                    </div>


                </div>
            ))}

        </div>
        {/* {JSON.stringify(product)} */}

    </div>
}

export default Products;