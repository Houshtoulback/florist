import { Helmet } from "react-helmet-async";
import Truck from "../components/truck";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

export default function ShippingPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode })
    );
    console.log(state);
    navigate("/placeorder");
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <div className='flex min-h-full flex-col justify-center px-2 py-5 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center'>
          <div className='hidden md:block'>
            <Truck />
          </div>
          <div className='block md:hidden w-1/3'>
            <img src='../../public/delivery-truck.png' />
          </div>

          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Shipping address
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            onSubmit={submitHandler}
            className='space-y-6'
            action='#'
            method='POST'
          >
            <div>
              <label
                htmlFor='fullName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Full name
              </label>
              <div className='mt-2'>
                <input
                  value={fullName}
                  id='fullName'
                  name='fullName'
                  type='text'
                  autoComplete='name'
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Address
              </label>
              <div className='mt-2'>
                <input
                  value={address}
                  id='address'
                  name='address'
                  type='text'
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='city'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                City
              </label>
              <div className='mt-2'>
                <input
                  value={city}
                  id='city'
                  name='city'
                  type='text'
                  required
                  onChange={(e) => setCity(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='postalCode'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Postal Code
              </label>
              <div className='mt-2'>
                <input
                  value={postalCode}
                  id='postalCode'
                  name='postalCode'
                  type='text'
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
