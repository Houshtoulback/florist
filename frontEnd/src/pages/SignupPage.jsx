import axios from "axios";

import logo from "../../public/logo.png";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        { name, email, password }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate(redirect || "/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };
  useEffect(() => {
    if (state.userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, state.userInfo]);
  return (
    <div>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className='flex min-h-full flex-col justify-center px-6 py-16 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img className='mx-auto h-48 w-auto' src={logo} alt='Your Company' />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            onSubmit={submitHandler}
            className='space-y-6'
            action='#'
            method='POST'
          >
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Name
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <label
                htmlFor='confirmpassword'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Confirm password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='confirmpassword'
                name='confirmpassword'
                type='confirmpassword'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6'
              />
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?
            <Link
              to={`/signin?redirect=${redirect}`}
              className='font-semibold leading-6 text-emerald-600 hover:text-emerald-500'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
