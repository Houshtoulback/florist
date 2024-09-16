import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://gol-foroushi.liara.run/api/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>error</div>
  ) : (
    <div className='bg-gray-100'>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <div className='container mx-auto p-6 w-4/6'>
        <h1 className='mb-10 text-center text-2xl font-bold'>
          Order {orderId}
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-green-700 border-b pb-2 mb-4'>
              Order items
            </h2>
            <div className='space-y-4 max-h-64 overflow-y-auto no-scrollbar'>
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className='flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow'
                >
                  <div>
                    <Link to={`/product/${item.slug}`}>
                      <p className='text-gray-700'>{item.name}</p>
                    </Link>
                    <p className='text-sm text-gray-500'>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className='text-gray-700 font-semibold'>${item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-green-700 border-b pb-2 mb-4'>
              Shipping Address
            </h2>
            <div className='bg-gray-50 p-4 rounded-lg shadow'>
              <p className='text-gray-700'>
                <span className='font-semibold'>Full Name:</span>{" "}
                {order.shippingAddress.fullName}
              </p>
              <p className='text-gray-700'>
                <span className='font-semibold'>Address:</span>{" "}
                {order.shippingAddress.address}
              </p>
              <p className='text-gray-700'>
                <span className='font-semibold'>City:</span>{" "}
                {order.shippingAddress.city}
              </p>
              <p className='text-gray-700'>
                <span className='font-semibold'>Postal Code:</span>{" "}
                {order.shippingAddress.postalCode}
              </p>
            </div>

            <div className='mt-4'>
              {order.isDelivered ? (
                <div className='bg-green-100 p-4 rounded-lg shadow-md'>
                  <p className='text-green-700 font-semibold'>
                    Delivered on: {order.deliveredAt}
                  </p>
                </div>
              ) : (
                <div className='bg-red-100 p-4 rounded-lg shadow-md'>
                  <p className='text-red-700 font-semibold'>
                    This order has not been delivered yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-green-700 border-b pb-2 mb-4'>
              Payment Details
            </h2>
            {order.isPaid ? (
              <div className='bg-gray-50 p-4 rounded-lg shadow'>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Payment ID:</span>{" "}
                  {order.paymentResult.id}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Status:</span>{" "}
                  {order.paymentResult.status}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Date:</span> {order.paidAt}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Email:</span>{" "}
                  {order.paymentResult.email_address}
                </p>
              </div>
            ) : (
              <div className='bg-red-100 p-4 rounded-lg shadow'>
                <p className='text-red-700 font-semibold'>
                  This order has not been paid yet.
                </p>
              </div>
            )}
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-green-700 border-b pb-2 mb-4'>
              Order Summary
            </h2>
            <div className='bg-gray-50 p-4 rounded-lg shadow'>
              <div className='flex justify-between items-center mb-4'>
                <p className='text-gray-700'>Items Price</p>
                <p className='text-gray-700 font-semibold'>
                  ${order.itemsPrice}
                </p>
              </div>
              <div className='flex justify-between items-center mb-4'>
                <p className='text-gray-700'>Shipping Price</p>
                <p className='text-gray-700 font-semibold'>
                  ${order.shippingPrice}
                </p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-gray-700'>Tax Price</p>
                <p className='text-gray-700 font-semibold'>${order.taxPrice}</p>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between items-center text-lg font-bold text-gray-800'>
                <p>Total Price</p>
                <p>$41.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
