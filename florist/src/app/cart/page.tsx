import Link from "next/link";
import CheckOut from "./CheckOut";
import Item from "./Item";

export default function CartScreen() {
  return (
    <div className='bg-gray-100'>
      <div className=' lg:w-9/12 sm:w-11/12 py-24 m-auto'>
        <div className='  py-20'>
          <h1 className='text-green-600 mb-10 text-center text-2xl font-bold'>
            Cart Items
          </h1>
          <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
            <div className='rounded-lg md:w-2/3'>
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
            <CheckOut />
          </div>
        </div>
      </div>
    </div>
  );
}
