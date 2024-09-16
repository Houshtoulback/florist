import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import CustomSlider from "./slider";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function FilterCollapse() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/products/categories`
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
              {categories.map((category) => (
                <Link to={`/search?category=${category}`} key={category}>
                  <label className='block my-1'>
                    <input type='checkbox' className='mr-2' />
                    {category}
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
                <input type='radio' name='rating' className='mr-2' />1 Star & Up
              </label>
              <label className='block'>
                <input type='radio' name='rating' className='mr-2' />2 Stars &
                Up
              </label>
              <label className='block'>
                <input type='radio' name='rating' className='mr-2' />3 Stars &
                Up
              </label>
              <label className='block'>
                <input type='radio' name='rating' className='mr-2' />4 Stars &
                Up
              </label>
              <label className='block'>
                <input type='radio' name='rating' className='mr-2' />5 Stars
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
