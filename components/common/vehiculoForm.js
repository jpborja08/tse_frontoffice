import React, { useState, useEffect } from 'react';

function VehiculoForm({ title, idEmpresa, onSubmit, initialData }) {
  const [isFormValid, setFormValid] = useState(true);

  const [formData, setFormData] = useState({
    idEmpresa: idEmpresa || '',
    matricula: '',
    marca: '',
    modelo: '',
    peso: '',
    capacidadCarga: '',
    numeroPermiso: '',
    validezPermiso: '',
    fechaInspeccion: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        idEmpresa: initialData.id_empresa || '',
        matricula: initialData.matricula || '',
        marca: initialData.marca || '',
        modelo: initialData.modelo || '',
        peso: initialData.peso || '',
        capacidadCarga: initialData.capacidad_carga || '',
        numeroPermiso: initialData.numero_permiso || '',
        validezPermiso: initialData.validez_permiso || '',
        fechaInspeccion: initialData.fecha_inspeccion || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === '')) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_empresa">
            Id Empresa
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="id_empresa"
            name="idEmpresa"
            type="number"
            placeholder="Id Empresa"
            value={formData.idEmpresa}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matricula">
            Matrícula
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
            Marca
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelo">
            Modelo
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="peso">
            Peso
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacidad_carga">
            Capacidad de carga
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="capacidad_carga"
            name="capacidadCarga"
            type="number"
            placeholder="Capacidad de carga"
            step="0.01"
            value={formData.capacidadCarga}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero_permiso">
            Número Permiso
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="validez_permiso">
            Validez Permiso
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="validez_permiso"
            name="validezPermiso"
            type="date"
            value={formData.validezPermiso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inspeccion">
            Fecha de Inspección Técnica Vehicular
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fecha_inspeccion"
            name="fechaInspeccion"
            type="date"
            value={formData.fechaInspeccion}
            onChange={handleChange}
            required
          />
        </div>
        {!isFormValid && (
          <p className="text-red-500 text-sm mb-2">Please fill out all the fields in the form.</p>
        )}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehiculoForm;
