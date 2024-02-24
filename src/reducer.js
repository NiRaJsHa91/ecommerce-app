export const initialState = {
    basket:[],
    user: null,
    searchInput: null,
    isSidebar: false,
    popup: null,
}

export const getBasketTotalPrice = (basket) =>
  basket?.reduce((accumulator, currItem) => accumulator + currItem.price, 0); 

const reducer = (state,action)=>{
    switch (action.type) {
      case "SET_SEARCH_INPUT":
        return {
          ...state,
          searchInput: action.searchInput,
        };
      case "SET_IS_SIDEBAR":
        return {
          ...state,
          isSidebar: action.isSidebar,
        };
      case "SET_POPUP":
        return {
          ...state,
          popup: action.popup,
        };

      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      
      case "REMOVE_FROM_BASKET":
        // basket: state.basket.filter((item)=> item.id !== action.id)
        // problem with above code is that if a single item is added more than once and if we any one of them then all its instaces will be deleted

        // below code will return only the first occurence

        const index = state.basket.findIndex(
          (currItem) => currItem.id === action.id
        );

        // it does'nt changes anything

        let newBasket = [...state.basket];
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.warn(
            `cant't remove product (id: ${action.id}) as it is not in your cart`
          );
        }

        return {
          ...state,
          // basket: state.basket.filter((currItem,position)=> index !== position)
          basket: newBasket,
        };

      case "SET_USER":
        return {
          ...state,
          user: action.user,
        };

      default:
        return state;
    }
}

export default reducer;