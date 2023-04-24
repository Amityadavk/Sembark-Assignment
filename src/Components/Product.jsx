import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Cart } from "../context/Context";
import Home from "../Pages/Home";

function Products({ image, category, price, rating, title, description, id }) {
    const cartValue = useContext(Cart)
    const addToCart = () => {
        cartValue.dispatch({
            type: "add to cart",
            payload: {
                id: id,
                title: title,
                category: category,
                price: price,
                image: image,
                qty:1,
            }
        })
        // cartValue.basketlength()
    }
    // console.log(cartValue.state.basket);
    // console.log()



    return <div>

        <div className="card">
            
            <img src={image} alt="" />
            <div className="card-details">
                <div>
                    <h5>Category :</h5>
                    <p>Price :</p>
                    <p>Rating :</p>
                    <p>title :</p>
                </div>
                <div>
                    <h5>{category}</h5>
                    <p>{price}</p>
                    <p>{rating}</p>
                    <p>{title}</p>
                </div>
            </div>

            <div className="description">

                <h6>Description</h6>
                <p>{description.length > 55 ? description.slice(0, 55) + "..." : description}</p>
            </div>

            <div className="card-button-div">
                {/* <NavLink to="/cart"> */}
                <button onClick={addToCart} className="card-button">Add to Cart</button>
                {/* </NavLink> */}
            </div>


        </div>


        {/* {JSON.stringify(product)} */}

    </div>
}

export default Products;




// Amit Yadav
// Dev Story