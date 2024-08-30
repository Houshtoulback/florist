import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import axios from "axios";
import PlaceOrderPrudItem from "../components/placeOrderPrudItem";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderPage() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { cartItems } = cart;

  let numberOfItems = cartItems.reduce((a, c) => a + c.quantity, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 4.99;
  cart.itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  cart.taxPrice = 0.15 * cart.itemsPrice;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (e) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress, navigate]);

  return (
    <div className='container mx-auto bg-gray-100'>
      <h1 className='my-10 text-center text-2xl font-bold'>Preview Order</h1>
      <Helmet>
        <title>Place order</title>
      </Helmet>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col lg:flex-row w-full lg:w-4/6 mx-auto items-center justify-center'>
          <div className='w-full lg:w-2/3 p-5'>
            <div className='rounded-lg h-[300px] overflow-auto no-scrollbar'>
              {cartItems.map((item) => {
                return <PlaceOrderPrudItem key={item._id} product={item} />;
              })}
            </div>
          </div>
          <div className='w-full lg:w-1/3 p-5'>
            {cartItems.length > 0 ? (
              <div className='mt-6 lg:mt-0 h-full rounded-lg border bg-white p-6 shadow-md'>
                <h2 className='text-center font-bold pb-3 text-gray-700'>
                  Order summary
                </h2>
                <div className='mb-2 flex justify-between'>
                  <p className='text-gray-700'>Number of items</p>
                  <p className='text-gray-700'>{numberOfItems}</p>
                </div>
                <div className='mb-2 flex justify-between'>
                  <p className='text-gray-700'>Subtotal</p>
                  <p className='text-gray-700'>${cart.itemsPrice}</p>
                </div>
                <div className='mb-2 flex justify-between'>
                  <p className='text-gray-700'>Tax on each item</p>
                  <p className='text-gray-700'>$0.15</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-gray-700'>Shipping</p>
                  <p className='text-gray-700'>${cart.shippingPrice}</p>
                </div>
                <hr className='my-4' />
                <div className='flex justify-between'>
                  <p className='text-lg font-bold'>Total</p>
                  <div>
                    <p className='mb-1 text-lg font-bold'>
                      ${cart.totalPrice} USD
                    </p>
                  </div>
                </div>
                <button
                  onClick={placeOrderHandler}
                  className='mt-6 w-full rounded-md bg-emerald-600 py-1.5 font-medium text-blue-50 hover:bg-emerald-700'
                >
                  Place order
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className='w-full lg:w-4/6 p-5'>
          <div className='flex flex-col items-center mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0'>
            <h2 className='text-center font-bold pb-3 text-gray-700'>
              Shipping address
            </h2>
            <div className='w-full flex py-1 border-b-2 justify-between'>
              <p className='text-gray-700'>Full name</p>
              <p className='text-gray-700'>{cart.shippingAddress.fullName}</p>
            </div>
            <div className='w-full flex py-1 border-b-2 justify-between'>
              <p className='text-gray-700'>City</p>
              <p className='text-gray-700'>{cart.shippingAddress.city}</p>
            </div>
            <div className='w-full flex py-1 border-b-2 justify-between'>
              <p className='text-gray-700'>Address</p>
              <p className='text-gray-700'>{cart.shippingAddress.address}</p>
            </div>
            <div className='w-full flex py-1 border-b-2 justify-between'>
              <p className='text-gray-700'>Postal code</p>
              <p className='text-gray-700'>{cart.shippingAddress.postalCode}</p>
            </div>

            <button className='bg-emerald-500 mt-2 hover:bg-emerald-600 rounded shadow-md p-1 px-3 text-white'>
              <Link to='/shipping'>Edit</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
