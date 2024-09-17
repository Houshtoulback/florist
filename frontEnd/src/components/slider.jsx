import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";

export default function CustomSlider() {
  const [values, setValues] = useState([100, 500]);
  const navigate = useNavigate();

  const handleChange = (newValues) => {
    // Prevent sliders from overlapping
    if (newValues[0] < values[1] && newValues[1] > values[0]) {
      setValues(newValues);
    }
  };

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

  const handleButtonClick = () => {
    const priceRange = `${values[0]}-${values[1]}`;
    navigate(getFilterUrl({ price: priceRange }));
  };

  return (
    <div className='w-3/5 max-w-lg mx-auto p-4'>
      <ReactSlider
        className='custom-slider'
        thumbClassName='custom-thumb'
        trackClassName='custom-track'
        value={values}
        onChange={handleChange}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        min={0}
        max={1000}
        step={10}
        minDistance={0} // no overlap
      />
      <div className='flex justify-between text-gray-700 mt-2'>
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>
      <button
        onClick={handleButtonClick}
        className='mt-4 px-4 py-2 bg-green-700 text-white rounded'
      >
        Apply Filter
      </button>
    </div>
  );
}
