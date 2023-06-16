import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import DateTimePicker from "./dateTimePicker";

function GuiaForm({ idEmpresa, onSubmit, initialData }) {
  const [isFormValid, setFormValid] = useState(true);
  const [rubros, setRubros] = useState(null);
  const [tiposCarga, setTiposCarga] = useState(null);

  const [formData, setFormData] = useState({
    idRubro: "",
    idTipoCarga: "",
    origen: "",
    destino: "",
    volumenCarga: "",
    timestamp: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`/empresas/${idEmpresa}/guias/data`);
      setRubros(data.rubros);
      setTiposCarga(data.tiposCarga);
    };

    getInfo();
  }, []);

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
      timestamp: formData.timestamp.toISOString(),
    });
  };

  if (!rubros || !tiposCarga) {
    return <p>Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="border p-7 text-gray-700">
      <h2 className="font-bold text-xl mb-4 border-b pb-4">
        {initialData ? "Modificar guía" : "Registrar guía"}
      </h2>
      <div className="columns-2">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="rubro">
            Rubro
          </label>
          <Select
            id="rubro"
            options={rubros.map((r) => ({ value: r.id, label: r.nombre }))}
            onChange={(option) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                idRubro: option.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="tipoCarga">
            Tipo de carga
          </label>
          <Select
            id="tipoCarga"
            options={tiposCarga.map((r) => ({ value: r.id, label: r.nombre }))}
            onChange={(option) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                idTipoCarga: option.value,
              }))
            }
          />
        </div>
        <div className="mb-4 break-inside-avoid">
          <label className="block text-sm font-bold mb-2" htmlFor="origen">
            Origen
          </label>
          <input
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="origen"
            name="origen"
            type="text"
            placeholder="Origen"
            value={formData.origen}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 break-inside-avoid">
          <label className="block text-sm font-bold mb-2" htmlFor="destino">
            Destino
          </label>
          <input
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="destino"
            name="destino"
            type="text"
            placeholder="Destino"
            value={formData.destino}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="volumenCarga"
          >
            Volumen de carga
          </label>
          <input
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="volumenCarga"
            name="volumenCarga"
            type="number"
            placeholder="Volumen de carga"
            step="0.01"
            value={formData.volumenCarga}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="timestamp">
            Fecha
          </label>
          <DateTimePicker
            value={formData.timestamp}
            onChange={(value) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                timestamp: value,
              }));
            }}
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
          {initialData ? "Editar" : "Crear"}
        </button>
      </div>
    </form>
  );
}

export default GuiaForm;
