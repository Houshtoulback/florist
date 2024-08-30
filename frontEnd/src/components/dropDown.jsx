export default function DropDown() {
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='inline-block text-left'>
        <div className='relative group/dropdown select-none'>
          Options
          <div className=' invisible group-hover/dropdown:visible absolute right-0 top-3 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1' role='none'>
              <a
                href='#'
                className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
              >
                Account settings
              </a>
              <a
                href='#'
                className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
              >
                Support
              </a>
              <a
                href='#'
                className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
              >
                License
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
