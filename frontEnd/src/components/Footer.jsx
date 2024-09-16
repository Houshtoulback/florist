import { FaLinkedin } from "react-icons/fa";
import { FaTelegram, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className='flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600'>
      <div className='container'>
        <div className='my-2 flex justify-center'>
          <div className='mx-2 cursor-pointer'>
            <a href='https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile'>
              <FaLinkedin color='#fff' size='30px' />
            </a>
          </div>
          <div className='mx-2 cursor-pointer'>
            <a href='https://github.com/Houshtoulback'>
              <FaGithub color='#fff' size='30px' />
            </a>
          </div>
          <div className='mx-2 cursor-pointer'>
            <a href='https://t.me/returned_1'>
              <FaTelegram color='#fff' size='30px' />
            </a>
          </div>
        </div>
      </div>

      <div className='w-full bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'>
        <a className='text-neutral-800 dark:text-neutral-400' href='#'>
          Hamid Haghpanah, a fullStack developer
        </a>
      </div>
    </footer>
  );
}
