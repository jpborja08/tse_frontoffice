import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthContext from "@lib/context";

const HeaderComponent = () => {
  const router = useRouter();
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  useEffect(() => {
    setShowLogoutButton(typeof window !== "undefined" && token);
  }, [token]);

  const handleLogOut = async () => {
    const logOut = async () => {
      try {
        const response = await axios.post(
          `/oidc/logout`,
          {
            access_token: token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("token");
          setToken(null);
          setShowLogoutButton(false);
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    logOut();
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <Link href="/" passHref>
          CARGA UY
        </Link>
      </div>
      {showLogoutButton && (
        <div>
          <button
            className="text-white text-sm bg-red-500 py-2 px-4 rounded-md"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
