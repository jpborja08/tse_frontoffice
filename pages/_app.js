"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

import Header from "@components/common/header/header";
import { setAuthToken } from "@lib/session";
import AuthContext from "@lib/context";

import "./globals.css";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApp({ Component, pageProps }) {
  const [token,setToken] = useState(null);

  useEffect(() => {
    Modal.setAppElement("#container"); // Replace "#root" with the ID of your root element
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={ {token, setToken} } >
      <div id="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  );
}
