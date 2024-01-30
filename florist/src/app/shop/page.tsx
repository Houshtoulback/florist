"use client";
import LoadingShopItem from "./LoadingShopItem";

import { useEffect, useReducer } from "react";

import axios from "axios";
import Item from "./Item";

interface ShopState {
  loading: boolean;
  error: string;
  products: Array<any> | string;
}

// you added these lines of code because some actions didn't have payload and some of them did. so you used union.
type Request = { type: "FETCH_REQUEST" };
type SuccessOrFail = { type: "FETCH_SUCCESS" | "FETCH_FAIL"; payload: string };
type ShopAction = Request | SuccessOrFail;

function ShopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function ShopScreen() {
  const [state, dispatch] = useReducer(ShopReducer, {
    loading: true,
    error: "",
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (e) {
        dispatch({
          type: "FETCH_FAIL",
          payload: "problem with fetching data",
        });
      }
    };
    fetchData();
  }, []);

  const componentArr = [];
  for (let i = 0; i < 18; i++) {
    componentArr.push(<Item />);
  }

  return (
    <div className='container xl:w-9/12 min-[400px]:w-11/12 mx-auto'>
      <div className='flex flex-wrap justify-center'>{componentArr}</div>
    </div>
  );
}
