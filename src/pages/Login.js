import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";

function Login(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const routeOnLogin = async (user) => {
    const token = await user.getIdTokenResult();
    if (token.claims.admin) {
      props.history.push("/users");
    } else {
      props.history.push(`/profile/${user.uid}`);
    }
  };

  const onSubmit = async (data) => {
    let loggedInUser;

    setLoading(true);
    try {
      loggedInUser = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (loggedInUser) {
      routeOnLogin(loggedInUser);
    } else {
      setLoading(false);
    }
  };

  const formClassName = `${isLoading ? "loading" : ""}`;

  return (
    <section className='text-gray-500 bg-gray-900 body-font'>
      <div className='absolute inset-0 bg-gray-900'>
        <iframe
          title='map'
          width='100%'
          height='100%'
          frameBorder='0'
          marginHeight='0'
          marginWidth='0'
          scrolling='no'
          src='https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Inhance+Digital&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed'
          style={{ filter: "grayscale(1) contrast(1.2) opacity(0.18)" }}
        ></iframe>
      </div>
      <div className='container px-4 py-20 mx-auto flex'>
        <div className='lg:w-1/3 md:w-1/2 bg-gray-900 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10'>
          <h2 className='text-white text-lg mb-1 font-medium title-font'>
            VB CMS
          </h2>
          <p className='leading-relaxed mb-5 text-gray-500'>
            Time to extend your physical exhibit with real-time 3D environment
          </p>
          <form
            autoComplete='off'
            className={formClassName}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='relative mb-4'>
              <label
                htmlFor='email'
                className='leading-7 text-sm text-gray-400'
              >
                Email
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='email'
                  name='email'
                  placeholder='Email'
                  ref={register}
                />
              </label>
            </div>
            <div className='relative mb-4'>
              <label
                htmlFor='password'
                className='leading-7 text-sm text-gray-400'
              >
                Password
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='password'
                  name='password'
                  placeholder='Password'
                  ref={register}
                />
              </label>
            </div>
            <button
              type='submit'
              className='text-white bg-indigo-500 border-0 mt-2 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              Login
            </button>
          </form>
          <p className='text-xs text-gray-600 mt-3'>
            or <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
