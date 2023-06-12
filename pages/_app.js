"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useRouter } from 'next/router';

import Header from "@components/common/header/header";
import { setAuthToken } from "@lib/session";
import AuthContext from "@lib/context";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import "dayjs/locale/es";

import "./globals.css";

dayjs.locale("es");
dayjs.extend(utc);
dayjs.Ls.en.weekStart = 1;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApp({ Component, pageProps }) {
  const [token,setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    Modal.setAppElement("#container"); // Replace "#root" with the ID of your root element
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setToken(token);
    }
    else {
      router.push('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <div id="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  );
}
