import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={handleRedirect}
          className='mt-6 px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-800 focus:outline-none focus:ring-2  transition duration-200'
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
