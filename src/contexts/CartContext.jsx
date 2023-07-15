import React, { createContext, useContext, useReducer } from "react";
import { notify } from "../components/Toastify";
import { ACCTIONS } from "../utils/consts";

const cartContext = createContext();

export function useCartContext() {
  return useContext(cartContext);
}

const initState = {
  cart: {
    products: [],
    totalPrice: 0,
  },
  cartLenght: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ACCTIONS.cart:
      return { ...state, cart: action.payload };
    case ACCTIONS.cartLenght:
      return { ...state, cartLenght: action.payload };
    default:
      return state;
  }
}

function getDataFromLS() {
  let data = JSON.parse(localStorage.getItem("cart"));
  if (!data) {
    data = {
      products: [],
      totalPrice: 0,
    };
  }
  return data;
}

function CartContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  function getCart() {
    const data = getDataFromLS();
    const quantity = data.products.reduce((acc, item) => acc + item.count, 0);
    console.log(quantity);
    dispatch({
      type: ACCTIONS.cartLenght,
      payload: quantity,
    });
    dispatch({
      type: ACCTIONS.cart,
      payload: data,
    });
  }

  function addProductToCart(product) {
    const data = getDataFromLS();
    data.products.push({ ...product, count: 1, subPrice: +product.price });
    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );

    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
    notify("Successfully added to cart 🍔");
  }

  function deleteProductFromCart(id) {
    const data = getDataFromLS();
    data.products = data.products.filter((item) => item.id !== id);
    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );
    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
    notify("Successfully removed friom cart 🍕");
  }

  function isAlredyInCart(id) {
    const data = getDataFromLS();
    const isInCart = data.products.some((item) => item.id === id);
    return isInCart;
  }

  function plusCount(id) {
    console.log(id);
    const data = getDataFromLS();
    data.products = data.products.map((item) => {
      if (item.id === id) {
        item.count += 1;
        item.subPrice += +item.price;
      }
      return item;
    });
    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );
    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
  }

  function minusCount(id) {
    const data = getDataFromLS();
    data.products = data.products.map((item) => {
      if (item.id === id) {
        item.count -= 1;
        item.subPrice -= +item.price;
      }
      return item;
    });
    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );
    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
  }

  function clearCart() {
    localStorage.removeItem("cart");
    getCart();
  }

  const value = {
    cart: state.cart,
    cartLenght: state.cartLenght,
    getCart,
    addProductToCart,
    deleteProductFromCart,
    isAlredyInCart,
    plusCount,
    minusCount,
    clearCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export default CartContext;
