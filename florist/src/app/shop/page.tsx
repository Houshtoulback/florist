"use client";
import Head from "next/head";
import { useEffect, useReducer } from "react";

import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import axios from "axios";

export function RatingStars(props: { rating: number }): JSX.Element {
  const { rating } = props;
  const fillStars = Math.trunc(rating);
  const halfStars = Math.ceil(rating - fillStars);
  const outlineStars = 5 - (halfStars + fillStars);
  const stars = [];
  for (let i = 0; i < fillStars; i++) {
    stars.push(<AiFillStar color={"#00AB84"} key={`i${i}`} />);
  }
  if (halfStars !== 0) {
    stars.push(<BsStarHalf color={"#00AB84"} key={"j"} size={"14px"} />);
  }
  for (let k = 0; k < outlineStars; k++) {
    stars.push(<AiOutlineStar color={"#00AB84"} key={`k${k}`} />);
  }

  return <span className='hidden sm:flex my-1 lg:my-2'>{stars}</span>;
}

export function LoadingShopItem() {
  return (
    <div className='bg-white p-2 rounded-2xl shadow-lg flex flex-row select-none m-4'>
      <div className='h-52 rounded-xl animate-pulse'></div>
      <div className='flex flex-col flex-1 gap-3 sm:p-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='bg-gray-200 w-48 animate-pulse h-48 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
        </div>
        <div className='mt-auto flex gap-2'>
          <div className='bg-gray-200 w-14 h-8 animate-pulse rounded-full'></div>
          <div className='bg-gray-200 w-14 h-8 animate-pulse rounded-full'></div>
          <div className='bg-gray-200 w-14 h-8 animate-pulse rounded-full ml-auto'></div>
        </div>
      </div>
    </div>
  );
}

interface ShopState {
  loading: boolean;
  error: string;
  products: Array<any> | string;
}

// you added these lines of code because som e actions didn't have payload and some of them did. so you used union.
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
    componentArr.push(<LoadingShopItem key={i} />);
  }

  return (
    <div className='container min-[400px]:w-11/12 mx-auto'>
      <div className='flex flex-wrap justify-center'>{componentArr}</div>
    </div>
  );
}
