import Link from "next/link";

import Tooltip from "@/components/Tooltip";
import RatingStars from "./RatingStars";

import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { BsFillBasketFill } from "react-icons/bs";

export default function Item() {
  return (
    <div className='flex flex-col m-2 lg:m-4 items-center border-2 rounded-xl'>
      <div className='relative group'>
        <Link href='#'>
          <div className='w-48 h-48  flex justify-center items-center'>
            <img
              className=' group-hover:opacity-30 opacity-100 transition w-44 mt-4 object-cover'
              src='assets/images/plantImages/arrowHead.jpg'
            />
          </div>
        </Link>
        <div className='group-hover:opacity-100  transition opacity-0 absolute top-6 right-6 text-center'>
          <Tooltip massage='Quick view'>
            <AiFillEye size='25px' color='#4b4c4d' />
          </Tooltip>

          {/* {product.countInStock > 0 ? ( */}
          <Tooltip massage='Add to cart'>
            <div>
              <BsFillBasketFill size='25px' color='#4b4c4d' />
            </div>
          </Tooltip>
          {/* ) : ( */}
          {/* <Tooltip massage='Sold Out!'>
              <RiCreativeCommonsZeroFill size='25px' color='#4b4c4d' />
            </Tooltip> */}
          {/* )} */}
        </div>
      </div>
      <Link href='#'>
        <h2 className='mt-1 lg:mt-2 w-full text-center text-xs md:text-sm lg:font-medium capitalize '>
          product.name
        </h2>
      </Link>
      <RatingStars rating={4.5} />
      <p className='font-medium mb-5'>12.99$</p>
    </div>
  );
}
