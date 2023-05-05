import { createContext, useReducer, useEffect } from "react";
import cartReducer from "./Reducers"
// import Reducers from "./Reducers";
import Products from "../Components/Product";




// Created context
export const Cart = createContext();


const initialState = {
    totalProduct: [],
    basket: [],
    removedCartItem: false,
    sortPriceValue: "sort",
    // total_price: 0,
    // cartTotalItem: 0,
    // cardData:[{
    //     id: "",
    //     title: "",
    //     category: "",
    //     price: ""
    // }]
};

// const basketlength = initialState.basket.length;
function Context({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    // useEffect(()=>{
    //     dispatch({type: "cart total item"})
    // },[state.basket])
    return <Cart.Provider value={{ state: state, dispatch: dispatch }}>{children}</Cart.Provider>

}


export default Context;