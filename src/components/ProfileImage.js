import React, { useRef, useState, useEffect } from "react";
import { uploadImage, getDownloadUrl } from "../firebase/user";

export const ProfileImage = ({ id }) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getDownloadUrl(id)
      .then((img) => {
        !!img && setImageUrl(img);
      })
      .catch((err) => console.log("No profile photo"));
  }, [id]);

  const fileChange = async (files) => {
    const ref = await uploadImage(id, files[0], updateProgress);
    const downloadUrl = await ref.getDownloadURL();
    setImageUrl(downloadUrl);
  };

  const updateProgress = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  };

  return (
    <div className='bg-gray-800 px-4 py-5 rounded-lg shadow-lg text-center w-100'>
      <img
        className='w-auto mx-auto rounded-full object-cover object-center'
        src={
          imageUrl ||
          "https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg"
        }
        alt='profile'
      />
      <input
        className='hidden'
        type='file'
        accept='.png, .jpg, .jpeg'
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      ></input>
      <progress
        style={{ width: "100%", height: "4px" }}
        max='100'
        value={uploadProgress}
      ></progress>
      <button
        className='text-white bg-indigo-500 border-0 mt-2 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
        onClick={() => fileInput.current.click()}
      >
        Upload Photo
      </button>
    </div>
  );
};
