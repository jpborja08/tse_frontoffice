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

const SESSION_TIMEOUT = 60 * 60 * 1000; // 60 minutes in milliseconds

export default function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const router = useRouter();
  let logoutTimer;

  useEffect(() => {
    Modal.setAppElement("#container");
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setToken(token);
      startLogoutTimer();
    }
    else {
      router.push('/login');
    }
  }, []);

  const startLogoutTimer = () => {
    clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
      sessionStorage.removeItem('token');
    }, SESSION_TIMEOUT);
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    startLogoutTimer();
  };

  const handleLogout = () => {
    clearTimeout(logoutTimer);
    sessionStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const resetTimerOnUserActivity = () => {
      resetLogoutTimer();
    };

    window.addEventListener('mousemove', resetTimerOnUserActivity);
    window.addEventListener('keydown', resetTimerOnUserActivity);

    return () => {
      window.removeEventListener('mousemove', resetTimerOnUserActivity);
      window.removeEventListener('keydown', resetTimerOnUserActivity);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <div id="container">
        <Header />
        <Component {...pageProps} onLogout={handleLogout} />
      </div>
    </AuthContext.Provider>
  );
}
