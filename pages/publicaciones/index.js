import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const PublicacionesPage = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchData = async (token) => {
      try {
        const response = await axios.get("/publicacion", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPublicaciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(token);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">Publicaciones</h1>
          {publicaciones.map((publicacion) => (
            <div
              key={publicacion.idPublicacion}
              className="bg-gray-200 p-4 rounded-lg mb-4"
            >
              <Link href={`/publicacion/${publicacion.idPublicacion}`} passHref className="block">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{publicacion.titulo}</h2>
                <p className="line-clamp-3 mb-4 text-gray-800">
                  {publicacion.contenido}
                </p>
                <Link
                  href={`/publicaciones/${publicacion.id}`}
                  passHref
                  className="text-blue-500 font-bold hover:underline"
                >
                  Read more
                </Link>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicacionesPage;
