import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/mine`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: err,
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
        Order History
      </h1>

      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white rounded-lg shadow-md'>
            <thead>
              <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                <th className='py-3 px-6 text-left'>Order ID</th>
                <th className='py-3 px-6 text-left'>Date</th>
                <th className='py-3 px-6 text-right'>Total Price</th>
                <th className='py-3 px-6 text-center'>Paid</th>
                <th className='py-3 px-6 text-center'>Delivered</th>
                <th className='py-3 px-6 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-700 text-sm font-light'>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className='border-b border-gray-200 hover:bg-gray-100'
                >
                  <td className='py-3 px-6 text-left whitespace-nowrap'>
                    <span className='font-medium'>{order._id}</span>
                  </td>
                  <td className='py-3 px-6 text-left'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className='py-3 px-6 text-right'>
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className='py-3 px-6 text-center'>
                    {order.isPaid ? (
                      <span className='bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs'>
                        {new Date(order.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className='bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs'>
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td className='py-3 px-6 text-center'>
                    {order.isDelivered ? (
                      <span className='bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs'>
                        {new Date(order.deliveredAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className='bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs'>
                        Not Delivered
                      </span>
                    )}
                  </td>
                  <td className='py-3 px-6 text-center'>
                    <Link to={`/order/${order._id}`}>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
