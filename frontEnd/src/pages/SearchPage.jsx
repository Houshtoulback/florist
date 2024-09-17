import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import ShopItem, { LoadingShopItem } from "../components/ShopItem";
import FilterCollapse from "../components/filterCollapse";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SearchPage() {
  const [reload, setReload] = useState(false);
  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";

  const [{ loading, error, products, countProducts }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: err,
        });
      }
    };
    fetchData();
  }, [category, order, price, query, rating]);

  const handleReload = () => {
    setReload(!reload);
  };

  const componentArr = [];
  for (let i = 0; i < 18; i++) {
    componentArr.push(<LoadingShopItem key={i} />);
  }

  return (
    <div className='container mx-auto bg-gray-100'>
      {!error && <FilterCollapse />}
      <Helmet>
        <title>Search products</title>
      </Helmet>
      <h1 className='text-center font-bold text-3x p-8'>Featured products</h1>
      <div className='flex flex-wrap justify-center lg:mx-3'>
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
        ) : countProducts === 0 ? (
          <div className='p-20 rounded-lg text-lg bg-gray-300 my-10 text-center'>
            <p className='text-slate-800 m-6'>no products found</p>
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
