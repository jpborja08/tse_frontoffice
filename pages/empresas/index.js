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
        <span className="font-semibold">Nombre Público:</span> {empresa.nombrePublico}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Nro. Empresa:</span> {empresa.nroEmpresa}
      </p>
      <Link href={`/perfilEmpresa/${empresa.idEmpresa}`} passHref className="text-blue-500 hover:underline">
        Ver Perfil
      </Link>
    </div>
  );
};

const EmpresasPage = () => {
  const [empresas, setEmpresas] = useState([]);

  // useEffect(() => {
  //   const fetchEmpresas = async () => {
  //     try {
  //       const response = await axios.get('/empresas');
  //       setEmpresas(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchEmpresas();
  // }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">Empresas</h1>
          {DATA.map((empresa) => (
            <EmpresaCard key={empresa.idEmpresa} empresa={empresa} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpresasPage;
