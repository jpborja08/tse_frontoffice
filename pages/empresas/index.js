import "tailwindcss/tailwind.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DATA = [
  {
    idEmpresa: 1,
    nombrePublico: 'Empresa A',
    nroEmpresa: 12345,
  },
  {
    idEmpresa: 2,
    nombrePublico: 'Empresa B',
    nroEmpresa: 67890,
  },
  {
    idEmpresa: 3,
    nombrePublico: 'Empresa C',
    nroEmpresa: 54321,
  },
];

const EmpresaCard = ({ empresa }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <p className="text-gray-600">
        <span className="font-semibold">Nombre Público:</span> {empresa.nombre}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Nro. Empresa:</span> {empresa.numero}
      </p>
      <Link href={`/perfilEmpresa/${empresa.id}`} passHref className="text-blue-500 hover:underline">
        Ver Perfil
      </Link>
    </div>
  );
};

const EmpresasPage = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchEmpresas = async (token) => {
      try {
        const response = await axios.get('/empresas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmpresas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmpresas(token);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">Empresas</h1>
          {empresas.map((empresa) => (
            <EmpresaCard key={empresa.id} empresa={empresa} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpresasPage;
