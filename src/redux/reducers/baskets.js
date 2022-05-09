import { ADD_TO_BASKET, CLEAR_DATA,REMOVE_FROM_BASKET } from "../constants"

const initialState = {
    baskets: [],

    
}
export const getCartCount = (baskets) => 
  baskets?.reduce((amount, item) => amount + item.quantity, 0);

export const getShippingTotal = (baskets) => 
  baskets?.reduce((amount, item) => amount + item.quantity * item.shipping, 0);


export const getBasketTotal = (baskets) => 
  baskets?.reduce((amount, item) => amount + item.quantity * item.price, 0);

  export const getTotal = (baskets) => 
  baskets?.reduce((amount, item) => amount + item.quantity * item.price + item.quantity * item.shipping, 0);

export const baskets = (state = initialState, action) => {
  
    
    switch (action.type) {
        case ADD_TO_BASKET:
            const cartItemToAdd = action.item;
            const existingCartItem =state.baskets.find(
                (cartItem) => cartItem.id === cartItemToAdd.id
              );
            
            if (existingCartItem) {
                return {
                    ...state,
                    baskets: state.baskets.map((basket) =>
                      basket.id === existingCartItem.id ? { ...basket, quantity: basket.quantity + 1 } : basket
                    ),
                  };
            }
            return{
                ...state,
                baskets:[...state.baskets, { ...cartItemToAdd,  quantity: 1 }]
            }
             ;
           
        case REMOVE_FROM_BASKET:
            const cartItemToRemove = action.item;
            const existingCartItems = state.baskets.find(
                (cartItem) => cartItem.id === cartItemToRemove.id
              );
              if (existingCartItems.quantity === 1) {
                return {
                    ...state,
                    baskets: state.baskets.filter((basket) =>
                      basket.id !== cartItemToRemove.id 
                    ),
                  };
            }
              return{
                ...state,
                baskets: state.baskets.map((basket)=> basket.id === cartItemToRemove.id ? {...basket, quantity:basket.quantity-1  }:basket)
             }
             ;
            
      
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}