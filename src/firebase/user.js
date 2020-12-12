import { firestore, storage } from "./config";

export const createUserDocument = async (user) => {
  // get a reference to the Firestore document
  const docRef = firestore.doc(`/users/${user.uid}`);

  // create user object

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    specialty: "",
  };

  // write to CLoud Firestore

  return docRef.set(userProfile);
};

export const updateUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);

  return docRef.update(user);
};

export const uploadImage = async (userId, file, progress) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `/users/${userId}/profile-photo`;
    const fileRef = storage.ref().child(filePath);

    // upload task

    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress(snapshot);
      },
      (error) => reject(error),
      () => {
        resolve(uploadTask.snapshot.ref);
      }
    );
  });
};

export const getDownloadUrl = async (userId) => {
  const filePath = `/users/${userId}/profile-photo`;
  return storage.ref().child(filePath).getDownloadURL();
};
