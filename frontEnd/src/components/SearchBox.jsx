import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchMethod, setSearchMethod] = useState("product");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      const searchParam = searchMethod === "category" ? "category" : "query";
      navigate(`/search/?${searchParam}=${query}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className='flex items-center w-fit text-white'>
      <form onSubmit={handleSearch} className='flex w-full max-w-md'>
        <input
          type='text'
          id='searchInput'
          placeholder='Search...'
          className='w-3/4 py-2 pl-5 text-sm text-gray-700 bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent'
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          id='searchMethod'
          className='w-4/12 py-2 bg-gray-100 text-xs border-s-2 text-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent'
          onChange={(e) => setSearchMethod(e.target.value)}
        >
          <option value='product'>By product</option>
          <option value='category'>By category</option>
        </select>
        <button
          type='submit'
          className='ml-2 py-2 px-4 text-sm text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent'
        >
          Search
        </button>
      </form>
    </div>
  );
}
