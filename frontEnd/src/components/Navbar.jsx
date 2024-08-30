import PropTypes from "prop-types";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImMenu, ImCross } from "react-icons/im";
import { useContext, useState } from "react";

NavItem.propTypes = {
  content: PropTypes.node,
  link: PropTypes.string,
};

function NavItem(props) {
  const { content, link } = props;

  return (
    <Link to={link}>
      <div className='px-2 lg:px-5 py-5 font-bold lg:text-lg'>{content}</div>
    </Link>
  );
}

Navbar.propTypes = {
  cartItems: PropTypes.number,
};

export default function Navbar(props) {
  const navigate = useNavigate();
  const { cartItems } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    navigate("/");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='bg-white w-full h-20 flex justify-between items-center px-5 lg:px-20 xl:px-32 border-b'>
      <div>
        <img src='/assets/greenLogo.jpg' className='w-28' alt='Logo' />
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex text-green-700'>
        <NavItem content='Home' link='/' />
        <NavItem content='Shop' link='/shop' />
        <NavItem content='About Us' link='/about-us' />
        <NavItem content='Testimonials' link='/testimonials' />
        <div className='relative'>
          <NavItem
            content={<FaShoppingCart color='#00AB84' size='25px' />}
            link='/cart'
          />
          {cartItems > 0 && (
            <span className='absolute top-5 right-5 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white'>
              {cartItems}
            </span>
          )}
        </div>
        {userInfo ? (
          <div className='relative group/dropdown select-none'>
            <NavItem
              content={<CgProfile color='#00AB84' size='25px' />}
              link='/signin'
            />
            <div className='invisible group-hover/dropdown:visible absolute right-0 top-9 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1' role='none'>
                <div className='block px-4 py-2 text-sm text-gray-700'>
                  {userInfo.name}
                </div>
                <Link
                  to='/profile'
                  className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
                >
                  User Profile
                </Link>
                <Link
                  to='/orderhistory'
                  className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
                >
                  Order History
                </Link>
                <Link
                  to='/'
                  onClick={signoutHandler}
                  className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
                >
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <NavItem
            content={<FaSignInAlt color='#00AB84' size='25px' />}
            link='/signin'
          />
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden'>
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <ImCross color='#00AB84' size='35px' />
          ) : (
            <ImMenu color='#00AB84' size='35px' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-20 left-0 w-full bg-white shadow-md z-10 flex flex-col text-green-700 md:hidden'>
          <NavItem content='Home' link='/' />
          <NavItem content='Shop' link='/shop' />
          <NavItem content='About Us' link='/about-us' />
          <NavItem content='Testimonials' link='/testimonials' />
          <div className='relative'>
            <NavItem
              content={<FaShoppingCart color='#00AB84' size='25px' />}
              link='/cart'
            />
            {cartItems > 0 && (
              <span className='absolute top-2 right-5 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-rose-500 text-white'>
                {cartItems}
              </span>
            )}
          </div>
          {userInfo ? (
            <>
              <div className='block px-4 py-2 text-sm text-gray-700'>
                {userInfo.name}
              </div>
              <Link
                to='/profile'
                className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
                onClick={toggleMenu}
              >
                User Profile
              </Link>
              <Link
                to='/orderhistory'
                className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
                onClick={toggleMenu}
              >
                Order History
              </Link>
              <Link
                to='/'
                onClick={() => {
                  signoutHandler();
                  toggleMenu();
                }}
                className='block hover:bg-gray-200 px-4 py-2 text-sm text-gray-700'
              >
                Sign Out
              </Link>
            </>
          ) : (
            <NavItem
              content={<FaSignInAlt color='#00AB84' size='25px' />}
              link='/signin'
              onClick={toggleMenu}
            />
          )}
        </div>
      )}
    </div>
  );
}
