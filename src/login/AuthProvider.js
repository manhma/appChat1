import { onAuthStateChanged } from "firebase/auth";
import React, { Children, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../actions/checkAuth";
import { auth, db } from "../firebase/config";

export default function AuthProvider(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        dispatch(loginUser({ displayName, email, uid, photoURL }));
        navigate("/");
      } else {
        // User is signed out
        // ...
        dispatch(logoutUser());
        navigate("/login");
      }
    });

    return () => {
      onSub();
    };
  }, [navigate]);

  return <div>{props.children}</div>;
}
