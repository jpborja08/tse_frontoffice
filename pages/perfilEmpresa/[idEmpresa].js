import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useRouter } from "next/router";
import Spinner from "@components/spinner";
import axios from "axios";
import Modal from "react-modal";
import VehiculoForm from "@components/common/vehiculoForm";
import { HiOutlineTrash } from "react-icons/hi2";

import GuiaItem from "@components/common/guiaItem";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    maxHeight: "90vh",
    borderRadius: "10px",
  },
  overlay: {
    position: "fixed",
    zIndex: 1020,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const PerfilEmpresa = () => {
  const [activeTab, setActiveTab] = useState("vehiculos");
  const [data, setData] = useState(null);
  const [creatingVehicle, setCreatingVehicle] = useState(false);
  const [modifyingVehicle, setModifyingVehicle] = useState(null);

  const router = useRouter();
  const { idEmpresa } = router.query;

  const getEmpresa = async () => {
    const res = await axios.get(`/empresas/${idEmpresa}`);
    setData(res.data);
  };

  useEffect(() => {
    if (!idEmpresa) return;

    getEmpresa();
  }, [idEmpresa]);

  const createVehicle = async (vehiculo) => {
    await axios.post("/vehiculos", vehiculo);

    setCreatingVehicle(false);

    getEmpresa();
  };

  const updateVehicle = async (vehiculo) => {
    const matricula = vehiculo.matricula;
    delete vehiculo.matricula;

    await axios.put(`/vehiculos/${matricula}`, vehiculo);

    setModifyingVehicle(null);

    getEmpresa();
  };

  const deleteVehicle = async (matricula) => {
    await axios.delete(`/vehiculos/${matricula}`);

    getEmpresa();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-3xl mx-4 mt-10">
          {data === null ? (
            <Spinner />
          ) : (
            <div className="px-4 py-8 sm:p-10">
              <h1 className="text-2xl font-bold mb-6 text-gray-600">
                {data.nombre}
              </h1>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  <span className="font-semibold">Razón Social:</span>{" "}
                  {data.razonSocial}
                </p>
                <p>
                  <span className="font-semibold">Nro. Empresa:</span>{" "}
                  {data.numero}
                </p>
                <p>
                  <span className="font-semibold">Dirección Principal:</span>{" "}
                  {data.direccion}
                </p>
              </div>
              <div className="flex justify-center mt-8">
                <div className="w-full">
                  <Tabs>
                    <TabList className="flex mb-6 border-b border-gray-300">
                      <Tab
                        className={`mr-6 cursor-pointer ${
                          activeTab === "vehiculos"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("vehiculos")}
                      >
                        Vehiculos
                      </Tab>
                      <Tab
                        className={`mr-6 cursor-pointer ${
                          activeTab === "choferes"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("choferes")}
                      >
                        Choferes
                      </Tab>
                      <Tab
                        className={`cursor-pointer ${
                          activeTab === "guias"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("guias")}
                      >
                        Guias
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <div>
                        <div className="mb-4">
                          <button
                            onClick={() => setCreatingVehicle(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                          >
                            Dar de alta vehiculo
                          </button>
                        </div>

                        {data.vehiculos.length === 0 && (
                          <p className="text-gray-600">
                            No hay vehiculos registrados
                          </p>
                        )}

                        {data.vehiculos.map((vehiculo, index) => (
                          <div
                            key={index}
                            className="bg-gray-200 rounded-lg p-4 mb-4"
                          >
                            <p className="text-gray-600">
                              <span className="font-semibold">Matrícula:</span>{" "}
                              {vehiculo.matricula}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Marca:</span>{" "}
                              {vehiculo.marca}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Modelo:</span>{" "}
                              {vehiculo.modelo}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Peso:</span>{" "}
                              {vehiculo.peso}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">
                                Capacidad de carga:
                              </span>{" "}
                              {vehiculo.capacidadCarga}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">
                                Numero de Permiso:
                              </span>{" "}
                              {vehiculo.numeroPermiso}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">
                                Validéz de permiso:
                              </span>{" "}
                              {vehiculo.fechaInspeccion}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">
                                Fecha de inspección:
                              </span>{" "}
                              {vehiculo.fechaInspeccion}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setModifyingVehicle(vehiculo)}
                              >
                                Modificar vehiculo
                              </button>

                              <button
                                onClick={() =>
                                  deleteVehicle(vehiculo.matricula)
                                }
                              >
                                <HiOutlineTrash className="text-red-500 text-xl" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div>
                        {data.choferes.length === 0 && (
                          <p className="text-gray-600">
                            No hay choferes registrados
                          </p>
                        )}

                        {data.choferes.map((chofer, index) => (
                          <div
                            key={index}
                            className="bg-gray-200 rounded-lg p-4 mb-4"
                          >
                            <p className="text-gray-600">
                              <span className="font-semibold">Cédula:</span>{" "}
                              {chofer.cedula}
                            </p>
                          </div>
                        ))}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div>
                        {data.choferes.length === 0 && (
                          <p className="text-gray-600">
                            No hay guias registrados
                          </p>
                        )}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                          Crear Guia
                        </button>
                        <div>
                          {data.guias.map((guia, index) => (
                            <GuiaItem key={index} guia={guia} />
                          ))}
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={creatingVehicle}
        onRequestClose={() => setCreatingVehicle(false)}
        contentLabel="Alta de vehiculo"
        style={customStyles}
      >
        <VehiculoForm idEmpresa={idEmpresa} onSubmit={createVehicle} />
      </Modal>

      <Modal
        isOpen={modifyingVehicle !== null}
        onRequestClose={() => setModifyingVehicle(null)}
        contentLabel="Modificación de vehiculo"
        style={customStyles}
      >
        <VehiculoForm
          idEmpresa={idEmpresa}
          onSubmit={updateVehicle}
          initialData={modifyingVehicle}
        />
      </Modal>
    </div>
  );
};

export default PerfilEmpresa;
