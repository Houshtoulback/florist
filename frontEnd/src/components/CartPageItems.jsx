import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";

CartPageItems.propTypes = {
  product: PropTypes.object,
};

export default function CartPageItems({ product }) {
  const { dispatch: ctxDispatch } = useContext(Store);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      toast.warn("Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='w-full rounded-lg sm:w-40' />
      </Link>
      <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className='mt-5 sm:mt-0'>
          <Link to={`/product/${product.slug}`}>
            <h2 className='text-lg font-bold text-gray-900'>{product.name}</h2>
          </Link>
          <p className='mt-1 text-xs text-gray-700'>{product.grower}</p>
        </div>
        <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
          <div className='flex items-center border-gray-100'>
            <button
              disabled={product.quantity === 1}
              className={
                product.quantity === 1
                  ? "cursor-not-allowed rounded-l bg-gray-300 py-1 px-3.5"
                  : "cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-emerald-600 hover:text-blue-50"
              }
              onClick={() => updateCartHandler(product, product.quantity - 1)}
            >
              {" "}
              -{" "}
            </button>
            <input
              className='h-8 w-8 border bg-white text-center text-xs outline-none'
              type='number'
              value={product.quantity}
              min='1'
            />
            <button
              disabled={product.quantity > product.countInStock}
              className={
                product.quantity > product.countInStock
                  ? "cursor-not-allowed rounded-l bg-gray-300 py-1 px-3.5"
                  : "cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-emerald-600 hover:text-blue-50"
              }
              onClick={() => updateCartHandler(product, product.quantity + 1)}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <div className='flex items-center space-x-4'>
            <p className='text-sm'>{product.price} $</p>
            <svg
              onClick={() => removeItemHandler(product)}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
