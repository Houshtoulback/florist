import PropTypes from "prop-types";
import { Link } from "react-router-dom";

PlaceOrderPrudItem.propTypes = {
  product: PropTypes.object,
};

export default function PlaceOrderPrudItem({ product }) {
  return (
    <div className='justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='w-full rounded-lg sm:w-40' />
      </Link>
      <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className='mt-5 sm:mt-0'>
          <Link to={`/product/${product.slug}`}>
            <h2 className='text-lg font-bold text-gray-900'>{product.name}</h2>
          </Link>
          <p className='mt-1 text-xs text-gray-700'>{product.grower}</p>
          <div className='py-2'>quantity: {product.quantity}</div>
        </div>
      </div>{" "}
      <button className='bg-emerald-500 hover:bg-emerald-600 rounded shadow-md p-1 px-3 text-white'>
        <Link to='/cart'>Edit</Link>
      </button>
    </div>
  );
}
