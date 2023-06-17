import "tailwindcss/tailwind.css";
import { useState, useEffect, useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useRouter } from "next/router";
import Spinner from "@components/spinner";
import axios from "axios";
import Modal from "react-modal";
import VehiculoForm from "@components/common/vehiculoForm";
import { HiOutlineTrash, HiArrowDownTray } from "react-icons/hi2";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import clsx from "clsx";
import AuthContext from "@lib/context";

import GuiaItem from "@components/common/guiaItem";
import GuiaForm from "@components/common/guiaForm";

import ViajeForm from "@components/common/viajeForm";

import dayjs from "dayjs";

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

const vehiculoStatusColor = {
  PENDING: "bg-gray-100",
  REJECTED: "bg-red-100",
  APPROVED: "bg-green-100",
};

const vehiculoStatusMsg = {
  PENDING: "Pendiente de aprobación...",
  REJECTED: "Rechazado",
  APPROVED: "Aprobado",
};

const PerfilEmpresa = () => {
  const [activeTab, setActiveTab] = useState("vehiculos");
  const [data, setData] = useState(null);
  const [creatingVehicle, setCreatingVehicle] = useState(false);
  const [modifyingVehicle, setModifyingVehicle] = useState(null);
  const [creatingGuia, setCreatingGuia] = useState(false);
  const [creatingViajeForGuia, setCreatingViajeForGuia] = useState(null);
  const [modifyingViaje, setModifyingViaje] = useState(null);
  const [userType, setUserType] = useState(null);
  const [assigningResponsable, setAssigningResponsable] = useState(false);
  const [cedula, setCedula] = useState("");
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    setUserType(sessionStorage.getItem("userType"));
  }, [token]);

  const router = useRouter();
  const { idEmpresa } = router.query;

  const getEmpresa = async () => {
    const res = await axios.get(`/empresas/${idEmpresa}`);
    setData(res.data);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");
    setUserType(userType);

    if (!token) {
      router.push("/login");
    } else {
      if (!idEmpresa) return;

      getEmpresa();
    }
  }, [idEmpresa]);

  const createVehicle = async (vehiculo) => {
    await axios.post("/vehiculos", vehiculo);

    setCreatingVehicle(false);

    getEmpresa();
  };

  const createGuia = async (guia) => {
    await axios.post(`/empresas/${idEmpresa}/guias`, guia);

    setCreatingGuia(false);

    getEmpresa();
  };

  const createViaje = async (guia) => {
    await axios.post(
      `/empresas/${idEmpresa}/guias/${creatingViajeForGuia.id}/viaje`,
      guia
    );

    setCreatingViajeForGuia(null);

    getEmpresa();
  };

  const updateVehicle = async (vehiculo) => {
    const matricula = vehiculo.matricula;
    delete vehiculo.matricula;

    await axios.put(`/vehiculos/${matricula}`, vehiculo);

    setModifyingVehicle(null);

    getEmpresa();
  };

  const updateViaje = async (viaje) => {
    await axios.put(
      `/empresas/${idEmpresa}/guias/${modifyingViaje.guia.id}/viaje`,
      viaje
    );

    setModifyingViaje(null);

    getEmpresa();
  };

  const deleteVehicle = async (matricula) => {
    await axios.delete(`/vehiculos/${matricula}`);

    getEmpresa();
  };

  const handleAssignResponsable = async () => {
    const requestBody = {
      cedula: cedula,
      empresaId: idEmpresa,
    };

    try {
      await axios.post("/empresas/asignar", requestBody);

      setAssigningResponsable(false);
      getEmpresa();
    } catch (error) {
      console.error("Error assigning responsible:", error);
    }
  };

  const updateStatusVehiculo = async (matricula, status) => {
    await axios.put(`/vehiculos/${matricula}/status`, { status });

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
                {userType === "FUNCIONARIO" && (
                  <p>
                    <span className="font-semibold">
                      Cédula de responsable:
                    </span>{" "}
                    {data.responsable
                      ? data.responsable.replace("uy-ci-", "")
                      : "No asignado"}
                  </p>
                )}
                {userType === "FUNCIONARIO" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
                    onClick={() => setAssigningResponsable(true)}
                  >
                    Asignar responsable
                  </button>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/editarEmpresa/${idEmpresa}`)}
                >
                  Editar empresa
                </button>
                {assigningResponsable && (
                  <Modal
                    isOpen={assigningResponsable}
                    onRequestClose={() => setAssigningResponsable(false)}
                    contentLabel="Asignar Responsable"
                    style={customStyles}
                  >
                    <div className="bg-white p-4">
                      <h2 className="text-xl font-bold mb-4">
                        Asignar Responsable
                      </h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAssignResponsable();
                        }}
                      >
                        <label className="block mb-2 text-black font-semibold">
                          Cédula:
                          <input
                            type="text"
                            className="border border-gray-300 px-2 py-1 w-full text-black"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            required
                          />
                        </label>
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => setAssigningResponsable(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </Modal>
                )}
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
                        {userType === "RESPONSABLE" && (
                          <button
                            onClick={() => setCreatingVehicle(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                          >
                            Dar de alta vehiculo
                          </button>
                        )}

                        {data.vehiculos.length === 0 && (
                          <p className="text-gray-600">
                            No hay vehiculos registrados
                          </p>
                        )}

                        {data.vehiculos.map((vehiculo, index) => (
                          <div
                            key={index}
                            className={clsx(
                              "bg-gray-200 rounded-lg p-4 mb-4",
                              vehiculoStatusColor[vehiculo.status]
                            )}
                          >
                            <div className="flex items-stretch justify-between">
                              <div>
                                <p className="text-gray-600">
                                  <span className="font-semibold">
                                    Matrícula:
                                  </span>{" "}
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
                                  {vehiculo.capacidad}
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
                                  {dayjs(vehiculo.fechaExpiracionPermiso)
                                    .utc("z")
                                    .local()
                                    .format("dddd, MMM D")}
                                </p>
                                <p className="text-gray-600">
                                  <span className="font-semibold">
                                    Fecha de inspección:
                                  </span>{" "}
                                  {dayjs(vehiculo.fechaInspeccion)
                                    .utc("z")
                                    .local()
                                    .format("dddd, MMM D")}
                                </p>
                                {["FUNCIONARIO", "RESPONSABLE"].includes(
                                  userType
                                ) && (
                                  <div className="text-gray-600 flex items-center space-x-2">
                                    <span className="font-semibold">
                                      Inspección técnica vehicular:
                                    </span>

                                    <a
                                      href={vehiculo.itvUrl}
                                      className="flex items-center space-x-2 text-lg"
                                    >
                                      <HiArrowDownTray />
                                    </a>
                                  </div>
                                )}
                              </div>
                              {userType === "RESPONSABLE" && (
                                <div className="flex flex-col items-end justify-between">
                                  <button
                                    onClick={() =>
                                      deleteVehicle(vehiculo.matricula)
                                    }
                                  >
                                    <HiOutlineTrash className="text-red-500 text-xl" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div
                              className={clsx(
                                "flex items-center justify-between",
                                { "mt-4": vehiculo.status !== "APPROVED" }
                              )}
                            >
                              {vehiculo.status !== "APPROVED" &&
                              userType === "RESPONSABLE" ? (
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => setModifyingVehicle(vehiculo)}
                                >
                                  Modificar vehiculo
                                </button>
                              ) : (
                                <>
                                  {(userType !== "FUNCIONARIO" ||
                                    vehiculo.status !== "PENDING") && (
                                    <span></span>
                                  )}
                                </>
                              )}

                              {userType === "FUNCIONARIO" &&
                                vehiculo.status === "PENDING" && (
                                  <div className="flex items-center space-x-3">
                                    <button
                                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        updateStatusVehiculo(
                                          vehiculo.matricula,
                                          "APPROVED"
                                        )
                                      }
                                    >
                                      Aprobar
                                    </button>
                                    <button
                                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                      onClick={() =>
                                        updateStatusVehiculo(
                                          vehiculo.matricula,
                                          "REJECTED"
                                        )
                                      }
                                    >
                                      Rechazar
                                    </button>
                                  </div>
                                )}

                              <div className="flex items-center space-x-2">
                                <p className="text-gray-700 text-sm">
                                  {vehiculoStatusMsg[vehiculo.status]}
                                </p>
                                {vehiculo.status === "APPROVED" && (
                                  <div className="bg-green-500 rounded-full p-1">
                                    <HiOutlineCheck className="text-white" />
                                  </div>
                                )}
                                {vehiculo.status === "REJECTED" && (
                                  <div className="bg-red-500 rounded-full p-1">
                                    <HiOutlineX className="text-white" />
                                  </div>
                                )}
                              </div>
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
                        {data.guias.length === 0 && (
                          <p className="text-gray-600">
                            No hay guias registrados
                          </p>
                        )}
                        <button
                          onClick={() => setCreatingGuia(true)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                          Crear Guia
                        </button>
                        <div>
                          {data.guias.map((guia, index) => (
                            <GuiaItem
                              key={index}
                              guia={guia}
                              handleCreateViaje={() =>
                                setCreatingViajeForGuia(guia)
                              }
                              handleUpdateViaje={(viaje) =>
                                setModifyingViaje(viaje)
                              }
                            />
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

      <Modal
        isOpen={creatingGuia}
        onRequestClose={() => setCreatingGuia(false)}
        contentLabel="Crear Guia"
        style={customStyles}
      >
        <GuiaForm onSubmit={createGuia} />
      </Modal>

      {data !== null && (
        <>
          <Modal
            isOpen={creatingViajeForGuia !== null}
            onRequestClose={() => setCreatingViajeForGuia(null)}
            contentLabel="Crear Viaje"
            style={customStyles}
          >
            <ViajeForm
              idEmpresa={idEmpresa}
              idGuia={creatingViajeForGuia !== null && creatingViajeForGuia.id}
              choferes={data.choferes}
              onSubmit={createViaje}
            />
          </Modal>

          <Modal
            isOpen={modifyingViaje !== null}
            onRequestClose={() => setModifyingViaje(null)}
            contentLabel="Modificar viaje"
            style={customStyles}
          >
            <ViajeForm
              idEmpresa={idEmpresa}
              idGuia={modifyingViaje !== null && modifyingViaje.guia.id}
              choferes={data.choferes}
              onSubmit={updateViaje}
              viaje={modifyingViaje}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default PerfilEmpresa;
