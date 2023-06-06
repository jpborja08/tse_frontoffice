import React, { useState, useEffect } from "react";

function VehiculoForm({ title, idEmpresa, onSubmit, initialData }) {
  const [isFormValid, setFormValid] = useState(true);

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
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        empresaId: initialData.id_empresa || "",
        matricula: initialData.matricula || "",
        marca: initialData.marca || "",
        modelo: initialData.modelo || "",
        peso: initialData.peso || "",
        capacidad: initialData.capacidad_carga || "",
        numeroPermiso: initialData.numero_permiso || "",
        fechaExpiracionPermiso: initialData.validez_permiso || "",
        fechaInspeccion: initialData.fecha_inspeccion || "",
        choferesCedula: [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
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

  return (
    <form onSubmit={handleSubmit} className="border p-7 text-gray-700">
      <h2 className="font-bold text-xl mb-4 border-b pb-4">Alta de vehiculo</h2>
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
        <div className="mb-4">
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
          Crear
        </button>
      </div>
    </form>
  );
}

export default VehiculoForm;
