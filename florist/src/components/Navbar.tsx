"use client";

import Link from "next/link";
import { useState } from "react";

import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";
import { ImMenu } from "react-icons/im";
import { FaTimes } from "react-icons/fa";

Navbar.propTypes = {
  cartItems: PropTypes.number,
};

export default function Navbar(props: { cartItems: number }) {
  const { cartItems } = props;

  const [navOpen, setNavOpen] = useState(false);

  function burgerToggle() {
    setNavOpen(!navOpen);
  }

  return (
    <div
      className={
        "bg-white w-full flex h-20 justify-between items-center px-5 lg:px-20 xl:px-32 border-bottom"
      }
    >
      <div
        className={`absolute bg-emerald-800 ${
          navOpen ? "w-screen" : "w-0"
        } flex justify-center items-center transition-all h-screen z-10 right-0  top-0 bottom-0`}
      >
        <ul
          className={`${
            navOpen ? "flex" : "hidden"
          } flex-col  items-center text-lg text-lime-950 font-bold select-none cursor-pointer`}
        >
          <li className='text-center p-1 transition-slow border-emerald-600 border-b-0 hover:border-b-2'>
            <Link href={"/"}>Home</Link>
          </li>
          <li className='text-center p-1 transition-slow border-emerald-600 border-b-0 hover:border-b-2'>
            <Link href={"/shop"}>Shop</Link>
          </li>
          <li className='text-center p-1 transition-slow border-emerald-600 border-b-0 hover:border-b-2'>
            <Link href={"/about-us "}>About Us</Link>
          </li>
          <li className='text-center p-1 transition-slow border-emerald-600 border-b-0 hover:border-b-2'>
            <Link href={"/testimonials"}>Testimonials</Link>
          </li>
          <li className='relative text-center p-1 transition-slow border-emerald-600 border-b-0 hover:border-b-2'>
            <Link href={"/cart"}>Shopping Cart</Link>
            {cartItems > 0 && (
              <span className='absolute top-3 -right-2 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white'>
                {cartItems}
              </span>
            )}
          </li>
        </ul>
      </div>
      <div>
        <img src='/assets/images/greenLogo.jpg' className='w-20 sm:w-28' />
      </div>

      <nav className={"hidden md:flex text-green-700"}>
        <Link href={"/"}>
          <div className='p-5 font-bold text-lg transition-slow border-white border-b-2 hover:border-emerald-500'>
            Home
          </div>
        </Link>

        <Link href={"/shop"}>
          <div className='p-5 font-bold text-lg transition-slow border-white border-b-2 hover:border-emerald-500'>
            Shop
          </div>
        </Link>

        <Link href={"/about-us"}>
          <div className='p-5 font-bold text-lg transition-slow border-white border-b-2 hover:border-emerald-500'>
            About Us
          </div>
        </Link>

        <Link href={"/testimonials"}>
          <div className='p-5 font-bold text-lg transition-slow border-white border-b-2 hover:border-emerald-500'>
            Testimonials
          </div>
        </Link>
        <div className='relative'>
          <Link href={"/cart"}>
            <div className='p-5 font-bold text-lg transition-slow border-white border-b-2 hover:border-emerald-500'>
              <FaShoppingCart color='#00AB84' size='25px' />
            </div>
          </Link>
          {cartItems > 0 && (
            <span className='absolute top-5 right-5 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white'>
              {cartItems}
            </span>
          )}
        </div>
      </nav>
      <div className='md:hidden'>
        <Link href={"/"}>
          <div className='z-20 absolute right-3 top-6 p-1 font-bold text-lg'>
            <ImMenu
              color='#00AB84'
              size='27px'
              className={`  ${navOpen ? "hidden" : "block"}`}
              onClick={() => {
                burgerToggle();
              }}
            />
            <FaTimes
              color='#00AB84'
              size='27px'
              className={`  ${navOpen ? "block" : "hidden"}`}
              onClick={() => {
                burgerToggle();
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
