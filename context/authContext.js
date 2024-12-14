import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response?.user };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const signUp = async (email, password, name) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, logOut, login, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
