import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Cart } from "../context/Context";
import Home from "../Pages/Home";
import { useState } from "react";
import "./product.css"


function Products({ image, category, price, rating, title, description, id,stock,qty }) {

    const [addedToCart, setAddedTocart] = useState(false);
    // const [removedCartItem, setRemovedCartItem] = useState(false);
    const cartValue = useContext(Cart)
    function removeToCart(id) {
        cartValue.dispatch({
            type: "remove from cart",
            payload: {
                id: id,
            }
        })
        cartValue.dispatch({
            type: "removed item",
            payload: {
              id: id,
            //   qty: 1
            }
          })
        // cartValue.state.removedCartItem(true);
    }

    // useEffect(()=>{
    //     if(cartValue.state.removedCartItem){

    //         cartValue.state.totalProduct.map((item)=>(
    //             // if(caremovedCartItem){
    
    //                 item.qty=1
    //             // }
    //         ))
    //     }
    //   },[cartValue.state.removedCartItem])


    const addToCart = () => {
        cartValue.dispatch({
            type: "add to cart",
            payload: {
                id: id,
                title: title,
                category: category,
                price: price,
                image: image,
                qty: qty,
                stock: stock
            }
        })
        // cartValue.state.removedCartItem(false);
        // setAddedTocart(true);
        // cartValue.basketlength()
    }
    // console.log(cartValue.state.basket);
    // console.log()

     // Increase and Decrease quantity

  function increaseQty() {
    cartValue.dispatch({
      type: "increase qty",
      payload: {
        id: id,
      }
    })
  }

  function decreaseQty() {
    cartValue.dispatch({
      type: "decrease qty",
      payload: {
        id: id,
    }
})
console.log("decrease", qty)
  }



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
                    <p>{price} $</p>
                    <p>{rating}</p>
                    <p>{title.length > 13 ? title.slice(0,13)+"...": title}</p>
                </div>
            </div>

            <div className="description">

                <h6>Description</h6>
                <p>{description.length > 55 ? description.slice(0, 55) + "..." : description}</p>
            </div>

            {cartValue.state.basket.some((item) => item.id === id) ?
                <div className="card-button-div-qty-remove-btn">
                    <div className='cart-card-qty'>
                        <p> Qty-{qty}</p>
                        <div className='cart-card-qty-btn-div'>
                            <button onClick={decreaseQty}>-</button>
                            <button onClick={increaseQty}>+</button>
                        </div>
                    </div>
                    <button onClick={() => removeToCart(id)} className='product-card-remove-btn'>Remove to Cart</button>
                </div>
                :
                <div className="card-button-div">
                    <button onClick={addToCart} className="card-button">Add to Cart</button>
                </div>
            }




        </div>


        {/* {JSON.stringify(product)} */}

    </div>
}

export default Products;




// Amit Yadav
// Dev Story