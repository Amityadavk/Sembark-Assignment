import Context from "./Context";
const cartReducer = (state, action) => {
    console.log("state", state);
    // if(action.type==="add to cart") {

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
            return {
                ...state,
                basket: [...state.basket, { ...action.payload }],
                removedCartItem: false,
            };

        case "remove from cart":
            const updatedCart = state.basket.filter(
                (item) => item.id !== action.payload.id
                // item.qty=1;
                // return item.qty=1
            );

            console.log("updatedcart", updatedCart);

            return { ...state, basket: updatedCart };

        case "increase qty":
            const updatedCartQty = state.basket.map((item) => {
                console.log(item);
                if (item.id === action.payload.id) {
                    let increQty = item.qty + 1;
                    if (item.qty === item.stock) {
                        return { ...item, qty: item.stock };
                    }
                    return { ...item, qty: increQty };
                } else {
                    return item;
                }
            });
            const updatedQty = state.totalProduct.map((item) => {
                console.log(item);
                if (item.id === action.payload.id) {
                    let increQty = item.qty + 1;
                    if (item.qty === item.stock) {
                        return { ...item, qty: item.stock };
                    }
                    return { ...item, qty: increQty };
                } else {
                    return item;
                }
            });
            const updatedSortFilterQty = state.filterSortData.map((item) => {
                console.log(item);
                if (item.id === action.payload.id) {
                    let increQty = item.qty + 1;
                    if (item.qty === item.stock) {
                        return { ...item, qty: item.stock };
                    }
                    return { ...item, qty: increQty };
                } else {
                    return item;
                }
            })

            return { ...state, basket: updatedCartQty, totalProduct: updatedQty, filterSortData: updatedSortFilterQty };

        case "decrease qty":
            const updatedDecreaseCartQty = state.basket.map((item) => {
                if (item.id === action.payload.id) {
                    const decreQty = item.qty - 1;
                    if (item.qty <= 1) {
                        return { ...item, qty: 1 };
                    }
                    return { ...item, qty: decreQty };
                } else {
                    return item;
                }
            });
            const updatedDecreaseQty = state.totalProduct.map((item) => {
                if (item.id === action.payload.id) {
                    const decreQty = item.qty - 1;
                    if (item.qty <= 1) {
                        return { ...item, qty: 1 };
                    }
                    return { ...item, qty: decreQty };
                } else {
                    return item;
                }
            });
            const updatedDecreaseFilterSortQty = state.filterSortData.map((item) => {
                if (item.id === action.payload.id) {
                    const decreQty = item.qty - 1;
                    if (item.qty <= 1) {
                        return { ...item, qty: 1 };
                    }
                    return { ...item, qty: decreQty };
                } else {
                    return item;
                }
            });

            return {
                ...state,
                basket: updatedDecreaseCartQty,
                totalProduct: updatedDecreaseQty,
                filterSortData: updatedDecreaseFilterSortQty
            };

        case "cart total price":
            const totalPrice = state.basket.reduce((initialVal, item) => {

                initialVal = initialVal + item.price * item.qty;
                console.log(initialVal);
                return initialVal;
            }, 0);
            return { ...state, total_price: totalPrice };

        case "total product":

            return { ...state, totalProduct: [...action.payload] };

        case "show product":
            return { ...state, filterSortData: [...action.payload] };

        case "removed item":
            const qtyWhenItemRemoved = state.totalProduct.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, qty: 1 };
                } else {
                    return item;
                }
            });

            return { ...state, totalProduct: qtyWhenItemRemoved, filterSortData: qtyWhenItemRemoved };

        case "get sort value":

            return { ...state, sortPriceValue: action.payload }

        case "get filter category value":

            return { ...state, filterCategoryValue: action.payload }

        default:
            return state; 
    }
};
export default cartReducer;





//    category
//    Products.filter(item => item.category == category)






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
