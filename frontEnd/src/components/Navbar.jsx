import PropTypes from "prop-types";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImMenu, ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import SearchBox from "./SearchBox";

NavItem.propTypes = {
  content: PropTypes.node,
  link: PropTypes.string,
};

function NavItem(props) {
  const { content, link } = props;

  return (
    <Link to={link}>
      <div className='px-2 lg:px-5 py-5 lg:font-bold lg:text-lg'>{content}</div>
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
      <div className='flex h-fit'>
        <img src='/assets/greenLogo.jpg' className='w-28' alt='Logo' />
        <div className='hidden md:block'>
          <SearchBox />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex text-green-700'>
        <NavItem content='Home' link='/' />
        <NavItem content='Shop' link='/shop' />
        <NavItem content='About Us' link='/about-us' />
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
          {userInfo && (
            <div className='flex justify-center px-4 py-2 text-sm font-bold text-gray-700'>
              {userInfo.name}
            </div>
          )}
          <div className='flex justify-center my-2'>
            <SearchBox />
          </div>

          <div className='flex justify-center my-2' onClick={toggleMenu}>
            <NavItem content='Home' link='/' />
          </div>
          <div className='flex justify-center my-2' onClick={toggleMenu}>
            <NavItem content='Shop' link='/shop' />
          </div>
          <div className='flex justify-center my-2' onClick={toggleMenu}>
            <NavItem content='About Us' link='/about-us' />
          </div>
          <div className='flex justify-center my-2' onClick={toggleMenu}>
            <NavItem content='Testimonials' link='/testimonials' />
          </div>
          <div onClick={toggleMenu} className='flex justify-center relative'>
            <NavItem content='Cart' link='/cart' />
            {cartItems > 0 && (
              <span className='absolute top-2 right-5 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-rose-500 text-white'>
                {cartItems}
              </span>
            )}
          </div>
          {userInfo ? (
            <>
              <div className='flex justify-center my-2' onClick={toggleMenu}>
                <NavItem content='User Profile' link='/profile' />
              </div>

              <div className='flex justify-center my-2' onClick={toggleMenu}>
                <NavItem content='Order History' link='/orderhistory' />
              </div>

              <div
                onClick={() => {
                  signoutHandler();
                  toggleMenu();
                }}
                className='flex justify-center my-2'
              >
                <NavItem content='Sign Out' link='/' />
              </div>
            </>
          ) : (
            <div className='flex justify-center my-2' onClick={toggleMenu}>
              {" "}
              <NavItem
                content={<FaSignInAlt color='#00AB84' size='25px' />}
                link='/signin'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
