import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CartPageItems from "../components/CartPageItems";

export default function CartPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  let shippingPrice = 4.99;
  let subTotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  let numberOfItems = cartItems.reduce((a, c) => a + c.quantity, 0);

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className='h-screen bg-gray-100 pt-20'>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className='mb-10 text-center text-2xl font-bold'>Shopping Cart</h1>
      <div className='mx-auto max-w-5xl justify-center  px-6 md:flex md:space-x-6 xl:px-0'>
        <div className='rounded-lg md:w-2/3 h-[600px] overflow-auto no-scrollbar'>
          {cartItems.length === 0 ? (
            <div className='p-20 rounded-lg bg-gray-300'>
              <p className='text-slate-800 mb-6'>
                You have not added anything to the cart yet
              </p>
              <div className='inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]'>
                <Link to={"/shop"}>Go Shopping</Link>
              </div>
            </div>
          ) : (
            cartItems.map((item) => {
              return <CartPageItems key={item._id} product={item} />;
            })
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Number of items</p>
              <p className='text-gray-700'>{numberOfItems}</p>
            </div>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Subtotal</p>
              <p className='text-gray-700'>${subTotal}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700'>Shipping</p>
              <p className='text-gray-700'>${shippingPrice}</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <div className=''>
                <p className='mb-1 text-lg font-bold'>
                  ${shippingPrice + subTotal} USD
                </p>
                <p className='text-sm text-gray-700'>including VAT</p>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className='mt-6 w-full rounded-md bg-emerald-600 py-1.5 font-medium text-blue-50 hover:bg-emerald-700'
            >
              Check out
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
