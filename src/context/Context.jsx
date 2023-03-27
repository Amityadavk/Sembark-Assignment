import { createContext, useReducer } from "react";
import cartReducer from "./Reducers"
// import Reducers from "./Reducers";
import Products from "../Components/Product";




export const Cart = createContext();
const initialState = {
    basket: [],
    addToCart:[{
        id: "",
        brand: "",
        category: "",
        price: ""
    }]
    
};
function Context({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    return <Cart.Provider value={{ state: state, dispatch: dispatch }}>{children}</Cart.Provider>

}

export default Context;