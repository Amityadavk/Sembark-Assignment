
import Context from "./Context";
const cartReducer = (state, action) => {
     console.log("hwsiahd" ,state);
     console.log("amit" ,action);
    switch (action.type) {
        case "add to cart":
            return {...state,}
        default:
            return state;
    }
};
export default cartReducer;