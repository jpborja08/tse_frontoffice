import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthContext from "@lib/context";

const HeaderComponent = () => {
  const router = useRouter();
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const [userType, setUserType] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);

  useEffect(() => {
    if (!token) {
      setToken(sessionStorage.getItem("token"));
    }
    setShowLogoutButton(typeof window !== "undefined" && token);
    const userType = sessionStorage.getItem("userType");
    setUserType(userType);
    if (userType === "RESPONSABLE") {
      setIdEmpresa(JSON.parse(sessionStorage.getItem("empresa_responsable")).id);
    };
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
      {showLogoutButton && (
        <div>
          <Link href="/perfilUsuario" passHref>
            CARGA UY
          </Link>
          <Link href="/perfilUsuario" passHref className="text-gray-300 hover:text-white hover:border-b-2 hover:border-white ml-6">
            PerfilUsuario
          </Link>
          {(userType === "RESPONSABLE") && (
            <Link
              href={`/perfilEmpresa/${idEmpresa}`}
              passHref
              className="text-gray-300 hover:text-white hover:border-b-2 hover:border-white ml-6"
            >
              PerfilEmpresa
            </Link>
          )}
          {(userType === "FUNCIONARIO") && (
            <Link href="/empresas" passHref className="text-gray-300 hover:text-white hover:border-b-2 hover:border-white ml-6">
              Empresas
            </Link>
          )}
          {(userType === "FUNCIONARIO") && (
            <Link href="/monitoreoDeViajes" passHref className="text-gray-300 hover:text-white hover:border-b-2 hover:border-white ml-6">
              Monitoreo de viajes
            </Link>
          )}
          <Link href="/publicaciones" passHref className="text-gray-300 hover:text-white hover:border-b-2 hover:border-white ml-6">
            Publicaciones
          </Link>
        </div>
        )}
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
