import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import CustomSlider from "./slider";

import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function FilterCollapse() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;

    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `https://gol-foroushi.liara.run/api/products/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error("problem with fetching categories.");
      }
    };
    fetchCategories();
  }, []);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full rounded-md shadow-md'>
      <button
        onClick={toggleCollapse}
        className='w-full bg-gray-300 p-3 flex justify-center items-center'
      >
        {isOpen ? (
          <FaCaretUp color='#000' size='20px' />
        ) : (
          <FaCaretDown color='#000' size='20px' />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className='p-4 bg-gray-100 md:flex'>
          {/* Filter by Price */}
          <div className='flex-1 text-center mb-4'>
            <h3 className='font-semibold mb-2'>Filter by Price</h3>
            <div className='flex items-center space-x-2'>
              <CustomSlider />
            </div>
            <div className='flex justify-between text-sm mt-2'></div>
          </div>

          {/* Filter by Categories */}
          <div className='flex-1 text-center mb-4'>
            <h3 className='font-semibold mb-2'>Filter by Categories</h3>
            <div className='space-y-2'>
              <Link to={getFilterUrl({ category: "all" })}>
                <label className='block my-1'>
                  <input type='checkbox' className='mr-2' />
                  any
                </label>
              </Link>
              {categories.map((c) => (
                <Link to={getFilterUrl({ category: c })} key={c}>
                  <label className='block my-1'>
                    <input type='checkbox' className='mr-2' />
                    {c}
                  </label>
                </Link>
              ))}
            </div>
          </div>

          {/* Filter by Rating */}
          <div className='flex-1 text-center mb-4'>
            <h3 className='font-semibold mb-2'>Filter by Rating</h3>
            <div className='space-y-2'>
              <label className='block'>
                <Link to={getFilterUrl({ rating: 1 })}>
                  <input type='radio' name='rating' className='mr-2' />1 Star &
                  Up
                </Link>
              </label>
              <label className='block'>
                <Link to={getFilterUrl({ rating: 2 })}>
                  <input type='radio' name='rating' className='mr-2' />2 Stars &
                  Up
                </Link>
              </label>
              <label className='block'>
                <Link to={getFilterUrl({ rating: 3 })}>
                  <input type='radio' name='rating' className='mr-2' />3 Stars &
                  Up
                </Link>
              </label>
              <label className='block'>
                <Link to={getFilterUrl({ rating: 4 })}>
                  <input type='radio' name='rating' className='mr-2' />4 Stars &
                  Up
                </Link>
              </label>
              <label className='block'>
                <Link to={getFilterUrl({ rating: 5 })}>
                  <input type='radio' name='rating' className='mr-2' />5 Stars
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
