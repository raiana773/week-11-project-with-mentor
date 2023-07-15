import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ACCTIONS, ADMINS } from "../utils/consts";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../fairebase";
import { notifyError } from "../components/Toastify";
import { Try } from "@mui/icons-material";

const authContext = createContext();

export function useAuthContext() {
  return useContext(authContext);
}

const initState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACCTIONS.user:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}

function AuthContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  async function register({ email, password, displayName, photoURL }) {
    try {
      console.log({ email, password, displayName, photoURL });
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
    } catch (error) {
      notifyError(error.code);
    }
  }

  async function login({ email, password }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("успешно защел в аккаунт");
    } catch (error) {
      notifyError(error.code);
      // console.log("неверный логин или пароль");
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      dispatch({
        type: ACCTIONS.user,
        payload: user,
      });
    });
  }, []);

  function isAdmin() {
    if (state.user) {
      const bool = ADMINS.includes(state.user.email);
      return bool;
    }
  }

  const value = {
    user: state.user,
    register,
    login,
    logout,
    isAdmin,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContext;
