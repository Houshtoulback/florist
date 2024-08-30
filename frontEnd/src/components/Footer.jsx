import PropTypes from "prop-types";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram, FaGithub } from "react-icons/fa6";
Footer.propTypes = {
  light: PropTypes.bool,
};
export default function Footer() {
  return (
    <footer className='flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600'>
      <div className='container'>
        <div className='my-2 flex justify-center'>
          <div className='mx-2 cursor-pointer'>
            <FaLinkedin color='#fff' size='30px' />
          </div>
          <div className='mx-2 cursor-pointer'>
            <FaGithub color='#fff' size='30px' />
          </div>
          <div className='mx-2 cursor-pointer'>
            <FaTelegram color='#fff' size='30px' />
          </div>
        </div>
      </div>

      <div className='w-full bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'>
        <a
          className='text-neutral-800 dark:text-neutral-400'
          href='https://tailwind-elements.com/'
        >
          Hamid Haghpanah, a fullStack developer
        </a>
      </div>
    </footer>
  );
}
