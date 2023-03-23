import { createContext, useReducer } from "react";
import cartReducer from "./Reducers"
// import Reducers from "./Reducers";



const Cart = createContext();
const initialState = {
};
function Context({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>

}

export default Context;
