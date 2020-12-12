import firebase from "firebase/app";
import "firebase/auth";
import { createUserDocument } from "./user";

export const signup = async ({ firstName, lastName, email, password }) => {
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  const user = resp.user;

  user.sendEmailVerification().then(
    function () {
      console.log("Email sent successfully");
    },
    function (error) {
      console.log(error);
    }
  );

  await resp.user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createUserDocument(user);
  return user;
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
  const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return resp.user;
};
