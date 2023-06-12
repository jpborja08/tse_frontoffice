import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PublicacionShowPage = () => {
  const router = useRouter();
  const { idPublicacion } = router.query;
  const [publicacion, setPublicacion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/publicacion/${idPublicacion}`);
        setPublicacion(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (idPublicacion) {
      fetchData();
    }
  }, [idPublicacion]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          {publicacion ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-gray-600">
                {publicacion.titulo}
              </h1>
              <p className="text-gray-800">{publicacion.contenido}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicacionShowPage;
