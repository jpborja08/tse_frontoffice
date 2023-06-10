import { useSearchParams } from "next/navigation";
import "tailwindcss/tailwind.css";
import "./globals.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

import { setAuthToken } from "@lib/session";
import AuthContext from "@lib/context";

export default function Home( { req, res } ) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      router.push('/perfilUsuario');
    }
    else if (!code) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `/oidc/login`,
          {
            code,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const token = response.data.access_token;
        sessionStorage.setItem("token", token);
        setToken(token);
        setAuthToken(token);
        router.push('/perfilUsuario');
      } catch (error) {
        console.error(error);
      };
    }
    fetchData();
  }, [code]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-gray-600">
      Loading...
    </main>
  );
}
