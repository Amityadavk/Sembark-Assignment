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
            const updatedSortFilterQty = state.filter_sortData.map((item) => {
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

            return { ...state, basket: updatedCartQty, totalProduct: updatedQty, filter_sortData: updatedSortFilterQty };

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
            const updatedDecreaseFilterSortQty = state.filter_sortData.map((item) => {
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
                filter_sortData: updatedDecreaseFilterSortQty
            };

        case "cart total price":
            const totalPrice = state.basket.reduce((initialVal, item) => {
                // let price = item;

                initialVal = initialVal + item.price * item.qty;
                console.log(initialVal);
                return initialVal;
            }, 0);
            return { ...state, total_price: totalPrice };

        case "total product":
            // return { ...state, basket: [...state.basket, { ...action.payload }] }
            // let temp = [1, 2, 3, 4, 5, 6];
            return { ...state, totalProduct: [...action.payload], filter_sortData: [...action.payload] };

        case "removed item":
            const qtyWhenItemRemoved = state.totalProduct.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, qty: 1 };
                } else {
                    return item;
                }
            });
            // console.log(qtyWhenItemRemoved);
            return { ...state, totalProduct: qtyWhenItemRemoved };

        case "get sort value":
            const userSortValue = document.getElementById("sort");
            const sortValue =
                userSortValue.options[userSortValue.selectedIndex].value;

            // console.log(sortValue);
            return { ...state, sortPriceValue: sortValue };

        case "sorted data":
            let newSortData;
            const tempSortedData = [...action.payload];
            // console.log(tempSortedData)

            if (state.sortPriceValue === "lth") {
                newSortData = state.filter_sortData.sort((a, b) =>
                    a.price - b.price
                );
            } else if (state.sortPriceValue === "htl") {
                newSortData = state.filter_sortData.sort((a, b) =>
                    b.price - a.price
                );
            } else {
                newSortData = state.totalProduct;
            }
            console.log(newSortData);
            return { ...state, filter_sortData: newSortData };

        case "get filter category value":
            const userfilterCategory = document.getElementById("category");
            const filterValue =
                userfilterCategory.options[userfilterCategory.selectedIndex].value;

            console.log(filterValue);
            return { ...state, filterCategoryValue: filterValue };

        case "filter category data":


            let filterData = [];
            const tempFilterData = [...action.payload];

            if (state.filterCategoryValue === "smartphones") {
                state.totalProduct.map((item) => {
                    if (item.category === "smartphones") {
                        filterData = [...filterData, item];
                    }
                });
            } else if (state.filterCategoryValue === "laptops") {
                state.totalProduct.map((item) => {
                    if (item.category === "laptops") {
                        filterData = [...filterData, item];
                    }
                });
            } else if (state.filterCategoryValue === "lighting") {
                state.totalProduct.map((item) => {
                    if (item.category === "lighting") {
                        filterData = [...filterData, item];
                    }
                });
            } else if (state.filterCategoryValue === "home-decoration") {
                state.totalProduct.map((item) => {
                    if (item.category === "home-decoration") {
                        filterData = [...filterData, item];
                    }
                });
            } else if (state.filterCategoryValue === "mens-shoes") {
                state.totalProduct.map((item) => {
                    if (item.category === "mens-shoes") {
                        filterData = [...filterData, item];
                    }
                });
            } else if (state.filterCategoryValue === "sunglasses") {
                state.totalProduct.map((item) => {
                    if (item.category === "sunglasses") {
                        filterData = [...filterData, item];
                    }
                });
            } else {
                filterData = state.totalProduct
            }


            return { ...state, filter_sortData: filterData }
        // console.log(tempSortedData);








        default:
            return state;
    }
};
export default cartReducer;










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
