import { useParams } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { RatingStars } from "../components/ShopItem";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          `https://gol-foroushi.liara.run/api/products/slug/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (e) {
        dispatch({
          type: "FETCH_FAIL",
          payload: "problem with fetching data",
        });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  async function addToCartHandler() {
    const existItem = cart.cartItems.find((x) => x._id == product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `https://gol-foroushi.liara.run/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      toast.warn("Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  }

  return loading ? (
    <div className=''>loading</div>
  ) : error ? (
    <div className='py-5 px-2 sm:p-20 rounded-lg bg-gray-300 w-screen lg:w-2/6 m-0 lg:my-10 mx-auto'>
      <p className='text-slate-800 mb-6'>
        The page you were looking for was not found
      </p>
    </div>
  ) : (
    <div className='py-28'>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-x-10'>
        <div className='flex justify-center md:justify-end '>
          <img
            className='object-contain  w-3/5 md:w-96 lg:w-[28rem] xl:w-[32rem]'
            src={product.image}
          />
        </div>
        <div className='md:w-96 lg:w-[28rem] xl:w-[32rem] w-4/5 md:m-0 m-auto '>
          <div className='px-5 border-bottom'>
            <div>Home / Indoor Plants / Aluminum Plan</div>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h2 className='capitalize text-3xl font-bold py-5 text-slate-800'>
              {product.name}
            </h2>
            <h3 className='text-2xl font-bold text-gray-600'>
              {`$${product.price}`}
            </h3>
            <RatingStars rating={product.rating} />
            <p>{`reviews "${product.numReviews}"`}</p>
            <p className='py-5'>{product.description}</p>
            <div className='my-7 flex flex-col md:flex-row justify-center items-center'>
              {product.countInStock > 0 ? (
                <button
                  onClick={addToCartHandler}
                  className='text-white py-3 px-5 mt-7 font-bold bg-green-600 hover:bg-green-700 hover:shadow-md transition'
                >
                  add to cart
                </button>
              ) : (
                <button className='text-white py-3 px-5 mt-7 font-bold bg-slate-500  cursor-not-allowed'>
                  unavailable
                </button>
              )}
            </div>
          </div>
          <div className='lowerDiv mt-6'>
            <span>{`category: ${product.category}`}</span>
            <p className='text-lg font-bold text-neutral-600'>
              free shipping on orders over $50!
            </p>
            <div className='text-slate-600'>
              <p>No-Risk Money Back Guarantee!</p>
              <p>No Hassle Refunds </p>
              <p>Secure Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
