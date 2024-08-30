//fix the try again button, usestate and the handler function

import { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import ShopItem, { LoadingShopItem } from "../components/ShopItem";
import { useState } from "react";

const reducer = (state, action) => {
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
};

export default function ShoppingPage() {
  const [reload, setReload] = useState(false);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
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
  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  };

  const componentArr = [];
  for (let i = 0; i < 18; i++) {
    componentArr.push(<LoadingShopItem key={i} />);
  }

  return (
    <div className='container mx-auto'>
      <Helmet>
        <title>shop</title>
      </Helmet>
      <h1 className='text-center font-bold text-3x p-8'>Featured products</h1>

      <div className='flex flex-wrap justify-center'>
        {loading ? (
          <div className='flex flex-wrap justify-center'>{componentArr}</div>
        ) : error ? (
          <div className='p-20 rounded-lg text-lg bg-gray-300 my-10 text-center'>
            <p className='text-slate-800 m-6'>Problem with fetching data</p>
            <div
              onClick={handleReload}
              className='inline-block rounded cursor-pointer bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]'
            >
              Try again
            </div>
          </div>
        ) : (
          products.map((product) => {
            return <ShopItem product={product} key={product.slug} />;
          })
        )}
      </div>
    </div>
  );
}
