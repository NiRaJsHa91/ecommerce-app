export const initialState = {
  products: [],
  basket: [],
  user: null,
  searchInput: null,
  isSidebar: false,
  popup: null,
};

export const getBasketTotalPrice = (basket) =>
  basket?.reduce(
    (accumulator, currItem) => accumulator + currItem.price * currItem.qty,
    0
  );

export const isItemInCart = (basket, id) =>
  basket?.find((item) => item.id === id);

const reducer = (state, action) => {
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
      const isItemInBasket = state.basket.find(
        (product) => product.id === action.item.id
      );
      if (isItemInBasket) {
        return state;
      }
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "CHANGE_ITEM_COUNT":
      let updatedBasket
        if(action.itemCount === 0) {
          updatedBasket = state.basket.filter((item) => item.id !== action.itemId);
        }else{
          updatedBasket = state.basket.map((item) =>
            item.id === action.itemId
              ? { ...item, qty: action.itemCount }
              : item
          );
        }
      return {
        ...state,
        basket: updatedBasket,
      };

    case "SET_PRODUCTS":
      const mutatedProducts = action.products.map((product) => ({
        ...product,
        qty: 0,
      }));
      return {
        ...state,
        products: mutatedProducts,
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (currItem) => currItem.id === action.id
      );

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
};

export default reducer;
