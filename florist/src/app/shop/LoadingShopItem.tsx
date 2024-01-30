export default function LoadingShopItem() {
  return (
    <div className='bg-white p-2 rounded-2xl shadow-lg flex flex-row select-none m-4'>
      <div className='h-52 rounded-xl animate-pulse'></div>
      <div className='flex flex-col flex-1 gap-3 sm:p-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='bg-gray-200 w-48 animate-pulse h-48 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
          <div className='bg-gray-200 w-full animate-pulse h-3 rounded-2xl'></div>
        </div>
        <div className='mt-auto flex gap-2'>
          <div className='bg-gray-200 w-14 h-8 animate-pulse rounded-full'></div>
          <div className='bg-gray-200 w-14 h-8 animate-pulse rounded-full'></div>
          <div className='bg-gray-200 w-14 h-8 animate-pulse rounded-full ml-auto'></div>
        </div>
      </div>
    </div>
  );
}
