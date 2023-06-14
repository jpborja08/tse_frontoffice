import 'tailwindcss/tailwind.css';
import 'react-tabs/style/react-tabs.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@components/spinner";

const PerfilUsuario = () => {
  const [data, setData] = useState(null);
  const [nombreEmpresa, setNombreEmpresa] = useState(null);
  const router = useRouter();
  const [userType, setUserType] = useState(null);

  const getUserInfo = async (token) => {
    try {
      const res = await axios.get('/oidc/userinfo',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.info);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");
    setUserType(userType);

    if (!token) {
      router.push('/login');
    }
    else {;
      getUserInfo(token);
      if (userType === "RESPONSABLE") {
        setNombreEmpresa(JSON.parse(sessionStorage.getItem("empresa_responsable")).nombre);
      }
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-3xl mx-4 mt-10">
            {data ? (
            <div className="px-4 py-8 sm:p-10">
              <h1 className="text-2xl font-bold mb-6 text-gray-600">{data.primer_nombre} {data.primer_apellido}</h1>
                <div className="mt-6 space-y-4">
                  <p className="text-gray-600"><span className="font-semibold">Email:</span> {data.email}</p>
                  <p className="text-gray-600"><span className="font-semibold">Primer Nombre:</span> {data.primer_nombre}</p>
                  <p className="text-gray-600"><span className="font-semibold">Segundo Nombre:</span> {data.segundo_nombre}</p>
                  <p className="text-gray-600"><span className="font-semibold">Primer Apellido:</span> {data.primer_apellido}</p>
                  <p className="text-gray-600"><span className="font-semibold">Segundo Apellido:</span> {data.segundo_apellido}</p>
                  {data.tipo_documento?.nombre === "C.I." ?(
                    <p className="text-gray-600"><span className="font-semibold">Cédula de Identidad:</span> {data.numero_documento}</p>
                  ) : null}
                  {nombreEmpresa &&(
                    <p className="text-gray-600"><span className="font-semibold">Empresa de la cual es responsable:</span> {nombreEmpresa}</p>
                  )}
                </div>
            </div>
            ) : (
              <Spinner />
            )}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;

