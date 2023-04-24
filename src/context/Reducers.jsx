
import Context from "./Context";
const cartReducer = (state, action) => {
    console.log("action", action.type);
    // if(action.type==="add to cart") {
    //     // console.log("state", state);
    //     return {...state, basket: [...state.basket, {...action.payload}]}
    //     // return [...state[0].basket,action[0].payload]
    // }

    // if (action.type === "increase qty") {
    //     let updatedQty = state.basket.map((item) => {
    //         if (item.id === action.payload.id) {
    //             console.log(item);
    //             let increQty = item.qty + 1;

    //             return { ...item, qty: increQty }
    //         }else{
    //             return item;
    //         }
    //     });
    //     return {...state, basket:updatedQty}

    // }

    switch (action.type) {
        // console.log(action.type)
        case "add to cart":
            return { ...state, basket: [...state.basket, { ...action.payload }] }

        case "remove from cart":
            const updatedCart = state.basket.filter((item) => (

                item.id !== action.payload.id
            ));
            console.log("updatedcart", updatedCart);

            return { ...state, basket: updatedCart };

        case "increase qty":
            const updatedQty = state.basket.map((item) => {

                if (item.id === action.payload.id) {
                    let increQty = item.qty + 1;
                    return { ...item, qty: increQty }
                } else {
                    return item;
                }

            });
            return { ...state, basket: updatedQty }

            case "decrease qty":
                const updatedDecreaseQty = state.basket.map((item) => {
    
                    if (item.id === action.payload.id) {
                        if(item.qty<=1){
                            const decreQty = item.qty - 1;
                            item.qty = 1;
                        }
                        return { ...item, qty: decreQty }
                    } else {
                        return item;
                    }
    
                });
                return { ...state, basket: updatedDecreaseQty }


        default:
            return state;
    }

    //

    //     });
    // }
    // switch (action.type){
    //     case "remove from cart":
    //         const updatedCart = state.basket.filter((item) => (
    //             item.id !== action.payload
    //         ));
    //         console.log("action", action.payload);

    //         return {...state, basket:[ updatedCart] };

    //     default:
    //         return state;
    // }

    // if(action.type=== "cart total item"){
    //     return {}
    // }


};
// console.log(cartReducer);
export default cartReducer;