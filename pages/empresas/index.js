import "tailwindcss/tailwind.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

import EmpresaForm from "@components/common/empresaForm";

const EmpresaCard = ({ empresa }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <p className="text-gray-600">
        <span className="font-semibold">Nombre Público:</span> {empresa.nombre}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Nro. Empresa:</span> {empresa.numero}
      </p>
      {empresa.permitida && (
        <p className="text-gray-600">
          <span className="font-semibold">Cumple permisos</span>
        </p>
      )}
      {!empresa.permitida && (
        <p className="text-gray-600">
          <span className="font-semibold">No cumple permisos</span>
        </p>
      )}
      <Link
        href={`/perfilEmpresa/${empresa.id}`}
        passHref
        className="text-blue-500 hover:underline"
      >
        Ver Perfil
      </Link>
    </div>
  );
};

const EmpresasPage = () => {
  const [empresas, setEmpresas] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get("/empresas", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateEmpresa = async (formData) => {
    try {
      setError(null);
      const response = await axios.post("/empresas", formData);
      fetchEmpresas();
      setShowCreateForm(false);
    } catch (error) {
      setError(
        error?.response?.data?.includes("transaction")
          ? "Se rompio todo gurise quiero que lo sepan"
          : error.response.data
      );
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">
            Empresas
          </h1>
          {empresas.map((empresa) => (
            <EmpresaCard key={empresa.id} empresa={empresa} />
          ))}
          <div className="flex justify-end mt-6">
            {!showCreateForm && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowCreateForm(true)}
              >
                Crear Empresa
              </button>
            )}
          </div>
          {showCreateForm && (
            <div className="mt-6">
              <EmpresaForm onSubmit={handleCreateEmpresa} error={error} />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCancelCreate}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpresasPage;
