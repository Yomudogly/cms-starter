import React, { useEffect, useState } from "react";
import { useSession } from "../firebase/UserProvider";
import { useForm } from "react-hook-form";
import { firestore } from "../firebase/config";
import { useParams } from "react-router-dom";
import { updateUserDocument } from "../firebase/user";
import { Header } from "../components/Header";
import { ProfileImage } from "../components/ProfileImage";

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const docRef = firestore.collection("users").doc(params.id);

    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        setUserDocument(doc.data());
        const formData = Object.entries(doc.data()).map((entry) => ({
          [entry[0]]: entry[1],
        }));

        setValue(formData);
      }
    });
    return unsubscribe;
  }, [user.uid, setValue, params.id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUserDocument({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!userDocument) {
    return null;
  }

  const formClassName = `${isLoading ? "loading" : ""}`;

  return (
    <section className='h-screen text-gray-500 bg-gray-900 body-font'>
      <Header></Header>

      <div className='container w-5/6 mx-auto flex px-5 py-19 md:flex-row flex-col items-center'>
        <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10'>
          <ProfileImage id={params.id} />
        </div>
        <div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
          <form
            autoComplete='off'
            className={formClassName}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='relative mb-4'>
              <label htmlFor='name' className='leading-7 text-sm text-gray-400'>
                Name
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='name'
                  placeholder='Name'
                  ref={register}
                />
              </label>

              <label
                htmlFor='email'
                className='leading-7 text-sm text-gray-400'
              >
                Email
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='email'
                  name='email'
                  disabled
                  placeholder='Email'
                  ref={register}
                />
              </label>

              <label
                htmlFor='address'
                className='leading-7 text-sm text-gray-400'
              >
                Address
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='address'
                  placeholder='Address'
                  ref={register}
                />
              </label>

              <label htmlFor='city' className='leading-7 text-sm text-gray-400'>
                City
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='city'
                  placeholder='City'
                  ref={register}
                />
              </label>
              <label
                htmlFor='state'
                className='leading-7 text-sm text-gray-400'
              >
                State
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='state'
                  placeholder='State'
                  ref={register}
                />
              </label>
              <label htmlFor='zip' className='leading-7 text-sm text-gray-400'>
                Zip
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='zip'
                  placeholder='Zip'
                  ref={register}
                />
              </label>

              <label
                htmlFor='phone'
                className='leading-7 text-sm text-gray-400'
              >
                Phone
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='phone'
                  placeholder='Phone'
                  ref={register}
                />
              </label>

              <label
                htmlFor='specialty'
                className='leading-7 text-sm text-gray-400'
              >
                Specialty
                <input
                  className='w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  type='text'
                  name='specialty'
                  placeholder='Specialty'
                  ref={register}
                />
              </label>
            </div>

            <button
              type='submit'
              className='text-white bg-indigo-500 border-0 mt-2 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
