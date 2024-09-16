import { useState } from "react";
import ReactSlider from "react-slider";

export default function CustomSlider() {
  const [values, setValues] = useState([100, 500]);

  const handleChange = (newValues) => {
    //  sliders don't overlap :
    if (newValues[0] < values[1] && newValues[1] > values[0]) {
      setValues(newValues);
    }
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
    </div>
  );
}
