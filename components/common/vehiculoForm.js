import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Spinner from "@components/spinner";
import { v4 as uuidv4 } from "uuid";
import { HiArrowUpTray } from "react-icons/hi2";
import clsx from "clsx";

const statusMsg = {
  PENDING: "Pendiente de aprobación",
  REJECTED: "Rechazado",
  APPROVED: "Aprobado",
};

const statusColor = {
  PENDING: "bg-gray-100",
  REJECTED: "bg-red-200",
  APPROVED: "bg-green-300",
};

function VehiculoForm({ idEmpresa, onSubmit, initialData }) {
  const [isFormValid, setFormValid] = useState(true);
  const [uploadData, setUploadData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState(null);
  const fileInput = useRef(null);

  const [formData, setFormData] = useState({
    empresaId: idEmpresa || "",
    matricula: "",
    marca: "",
    modelo: "",
    peso: "",
    capacidad: "",
    numeroPermiso: "",
    fechaExpiracionPermiso: "",
    fechaInspeccion: "",
    choferesCedula: [],
    itvPath: "",
  });

  useEffect(() => {
    const getUploadData = async () => {
      const { data } = await axios.get("/vehiculos/data");
      setUploadData(data);
    };

    getUploadData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        empresaId: initialData.empresa.id,
        matricula: initialData.matricula,
        marca: initialData.marca,
        modelo: initialData.modelo,
        peso: initialData.peso,
        capacidad: initialData.capacidad,
        numeroPermiso: initialData.numeroPermiso,
        fechaExpiracionPermiso:
          initialData.fechaExpiracionPermiso.split("T")[0],
        fechaInspeccion: initialData.fechaInspeccion.split("T")[0],
        itvPath: initialData.itvPath,
        choferesCedula: [],
      });
    }
  }, [initialData]);

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    setFilename(file.name);
    const extension = file.name.split(".").pop();
    const filename = `${uuidv4()}.${extension}`;

    const uploadUrl = `${uploadData.baseUrl}/${filename}?${uploadData.token}`;

    const formData = new FormData();
    formData.append("file", file, filename);

    setUploading(true);

    try {
      await axios.put(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-ms-blob-type": "BlockBlob",
        },
        transformRequest: (data, headers) => {
          delete headers.Authorization;
          return data;
        },
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        itvPath: filename,
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (uploading) return;

    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    onSubmit({
      ...formData,
      fechaExpiracionPermiso: `${formData.fechaExpiracionPermiso}T00:00:00`,
      fechaInspeccion: `${formData.fechaInspeccion}T00:00:00`,
    });
  };

  if (uploadData === null) {
    <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="border p-7 text-gray-700">
      <h2 className="font-bold text-xl mb-4 border-b pb-4">
        {initialData ? "Modificar vehículo" : "Registrar vehículo"}
      </h2>
      <div className="columns-2">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="matricula">
            Matrícula
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="matricula"
            name="matricula"
            type="text"
            placeholder="Matrícula"
            disabled={!!initialData}
            value={formData.matricula}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="marca">
            Marca
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="marca"
            name="marca"
            type="text"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="modelo">
            Modelo
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="modelo"
            name="modelo"
            type="text"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="peso">
            Peso
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="peso"
            name="peso"
            type="number"
            placeholder="Peso"
            step="0.01"
            value={formData.peso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 break-inside-avoid">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="capacidad_carga"
          >
            Capacidad de carga
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="capacidad_carga"
            name="capacidad"
            type="number"
            placeholder="Capacidad de carga"
            step="0.01"
            value={formData.capacidad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="numero_permiso"
          >
            Número Permiso
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="numero_permiso"
            name="numeroPermiso"
            type="number"
            placeholder="Número Permiso"
            value={formData.numeroPermiso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="validez_permiso"
          >
            Validez Permiso
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="validez_permiso"
            name="fechaExpiracionPermiso"
            type="date"
            value={formData.fechaExpiracionPermiso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="fecha_inspeccion"
          >
            Fecha de Inspección Técnica Vehicular
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="fecha_inspeccion"
            name="fechaInspeccion"
            type="date"
            value={formData.fechaInspeccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-bold mb-2" htmlFor="itv">
            Inspección Técnica Vehicular
          </label>
          <input
            ref={fileInput}
            id="itv"
            type="file"
            hidden
            onChange={onFileChange}
            accept=".pdf"
          />
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => fileInput.current.click()}
              className="bg-gray-400 text-white rounded p-1"
            >
              <HiArrowUpTray className="text-xl" />
            </button>
            {uploading ? (
              <Spinner />
            ) : (
              <p className="text-sm w-full truncate">
                {filename
                  ? filename
                  : formData.itvPath
                  ? `${formData.itvPath.slice(0, 5)}...${formData.itvPath.slice(
                      formData.itvPath.length - 8
                    )}`
                  : "Subir archivo"}
              </p>
            )}
          </div>

          {initialData ? (
            <div className="mt-5">
              <label className="block text-sm font-bold mb-2">Estado</label>
              <input
                className={clsx(
                  "appearance-none border rounded w-full py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline text-sm",
                  statusColor[initialData.status]
                )}
                type="text"
                disabled={true}
                value={statusMsg[initialData.status]}
              />
            </div>
          ) : (
            <span className="py-6 block" id="xd"></span>
          )}
        </div>
        {!isFormValid && (
          <p className="text-red-500 text-sm mb-2">
            Por favor, rellene todos los campos del formulario.
          </p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {initialData ? "Editar" : "Crear"}
        </button>
      </div>
    </form>
  );
}

export default VehiculoForm;
