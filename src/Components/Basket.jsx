import React from "react";
import { useEffect } from "react";
import { Cart } from "../context/Context";
import { useContext } from "react";
import "./basket.css";
// import { FiMinus } from 'react-icons/fi';

const Basket = () => {
  // id: id,
  // title: title,
  // category: category,
  // price: price,
  // image: image,

  // state for cart array
  // const [cartArray, setCartArray] = useState([]);

  // taken a useContext hook
  const addToCartData = useContext(Cart);

  //  useEffect(()=>{
  // console.log(addToCartData.state.basket);
  // setCartArray(addToCartData.state.basket)
  //  },[])
  //  console.log(cartArray);

  // removing from cart
  function removeCartItem(id) {
    addToCartData.dispatch({
      type: "remove from cart",
      payload: {
        id: id,
        // price:price*qty
        // title:title,
        // category:category,
        // price:price,
        // image:image
      },
      // const newCartItem = cartArray.filter((item)=>(
      //   item.id !== id
      // ));
      // setCartArray(newCartItem)
      // console.log(newCartItem);
    });
  }

  // Increase and Decrease quantity

  function increaseQty(id) {
    addToCartData.dispatch({
      type: "increase qty",
      payload: {
        id: id,
      },
    });
  }

  function decreaseQty(id) {
    addToCartData.dispatch({
      type: "decrease qty",
      payload: {
        id: id,
      },
    });
  }

  useEffect(() => {
    addToCartData.dispatch({ type: "cart total price" });
  }, [addToCartData.state.basket]);

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "80px", color: "#088395" }}>
        Cart
      </h1>

      {/* {cartArray.map((item, index) => ( */}
      <div className="cart-card-heading">
        <h5 style={{ width: "200px", textAlign: "center" }}>Image</h5>
        <h5>Title</h5>
        <h5>Quantity</h5>
        <h5>Price</h5>
        <h5 style={{ width: "80px" }}>Remove</h5>
      </div>
      {addToCartData.state.basket.map((item, index) => (
        <div key={index} className="cart-card">



          <div className="cart-card-img">
            <img
              style={{ width: "250px", maxHeight: "150px" }}
              src={item.image}
              alt=""
            />
          </div>




          <div className="cart-card-title-qty">
            <p>{item.title}</p>
            <div className="cart-card-qty">
              <p>
                {" "}
                Qty-<span>{item.qty}</span>
              </p>
              <div className="cart-card-qty-btn-div">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>
          </div>



          <div className="cart-card-price-remove-btn">
            <p>INR {item.price * item.qty}</p>
            <button
              className="cart-card-btn"
              onClick={() => removeCartItem(item.id)}
            >
              Remove 
            </button>
          </div>
        </div>
      ))}
      <div className="card-order-total">
        <div className="order-total">
          <h6>Total: INR {addToCartData.state.total_price}</h6>
          <h6>shipping Fee: Free</h6>
          <hr />
          <h2>Order Total: INR {addToCartData.state.total_price}</h2>
        </div>
      </div>
    </>
  );
};

export default Basket;
