export default function CheckOut() {
  return (
    <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
      <div className='mb-2 flex justify-between'>
        <p className='text-gray-700'>Subtotal</p>
        <p className='text-gray-700'>$129.99</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-gray-700'>Shipping</p>
        <p className='text-gray-700'>$4.99</p>
      </div>
      <hr className='my-4' />
      <div className='flex justify-between'>
        <p className='text-lg font-bold'>Total</p>
        <div className=''>
          <p className='mb-1 text-lg font-bold'>$134.98 USD</p>
          <p className='text-sm text-gray-700'>including VAT</p>
        </div>
      </div>
      <button className='mt-6 w-full rounded-md bg-green-600 py-1.5 transition font-medium text-green-50 hover:bg-green-700'>
        Check out
      </button>
    </div>
  );
}
