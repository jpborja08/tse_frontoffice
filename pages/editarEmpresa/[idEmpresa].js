import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@components/spinner";

import EmpresaForm from "@components/common/empresaForm";

const EditarEmpresa = () => {
  const [empresaData, setEmpresaData] = useState(null);

  const router = useRouter();
  const { idEmpresa } = router.query;

  const getEmpresa = async () => {
    const res = await axios.get(`/empresas/${idEmpresa}`);
    setEmpresaData(res.data);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push('/login');
    }
    else {
      if (!idEmpresa) return;

      getEmpresa();
    }
  }, [idEmpresa]);

  const updateEmpresa = async (empresa) => {
    await axios.put(`/empresas/${idEmpresa}`, empresa); // change this to the correct endpoint after it is created

    router.push(`/empresas/${idEmpresa}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {empresaData === null ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-3xl mx-4 mt-10">
            <div className="px-4 py-8 sm:p-10">
              <h1 className="text-2xl font-bold mb-6 text-gray-600">
                Editar Empresa
              </h1>
              <div className="mt-6 space-y-4 text-gray-600">
                <EmpresaForm
                  onSubmit={updateEmpresa}
                  initialData={empresaData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarEmpresa;
