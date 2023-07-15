import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ACCTIONS, API, LIMIT } from "../utils/consts";
// ! 1
const productContext = createContext();

// ! 3
export function useProductContext() {
  return useContext(productContext);
}

// ! 4
const initState = {
  products: [],
  // ? 1
  oneProduct: null,
  pageTotalCount: 1,
};
// ! 5
function reducer(state, action) {
  switch (action.type) {
    // ! 6
    case ACCTIONS.products:
      return { ...state, products: action.payload };
    // ? 2 -consts
    // ? 3
    case ACCTIONS.oneProduct:
      return { ...state, oneProduct: action.payload };

    case ACCTIONS.pageTotalCount:
      return { ...state, pageTotalCount: action.payload };
    default:
      return state;
  }
}

// ! 2
function ProductContext({ children }) {
  // ! 7
  const [state, dispatch] = useReducer(reducer, initState);

  //   ! 8
  // async function getProducts() {
  //   const { data } = await axios.get(API);
  //   dispatch({
  //     type: ACCTIONS.products,
  //     payload: data,
  //   });
  // }
  // async function getProducts() {
  //   try {
  //     // const { data } = await axios.get(API);
  //     const res = await axios.get(`${API}/${window.location.search}`);
  //     console.log(res);
  //     dispatch({
  //       type: ACCTIONS.products,
  //       payload: res.data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function getProducts() {
    try {
      console.log(window.location.search);
      const res = await axios.get(
        `${API}${window.location.search || `?_limit=${LIMIT}`} `
      );
      const totalPages = Math.ceil(res.headers["x-total-count"] / LIMIT);
      dispatch({
        type: ACCTIONS.pageTotalCount,
        payload: totalPages,
      });
      dispatch({
        type: ACCTIONS.products,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ! 27
  async function addProduct(newProduct) {
    try {
      await axios.post(API, newProduct);
      // ! 28  getProducts
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  // ? 4
  async function getOneProduct(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      dispatch({
        type: ACCTIONS.oneProduct,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ! 14
  // async function deleteProduct(id) {
  //   await axios.delete(`${API}/${id}`);
  //   getProducts();
  // }
  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  // ? 5
  async function editProduct(id, prodEdit) {
    try {
      await axios.patch(`${API}/${id}`, prodEdit);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  const value = {
    // ! 9
    products: state.products,
    oneProduct: state.oneProduct,
    getProducts,
    // ! 15
    deleteProduct,
    // ! 29
    addProduct,
    getOneProduct,
    editProduct,
    pageTotalCount: state.pageTotalCount,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
