import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";

function GuiaForm({ idEmpresa, idGuia, onSubmit, choferes, viaje }) {
  const [isFormValid, setFormValid] = useState(true);
  const [chofer, setChofer] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [vehiculosChofer, setVehiculosChofer] = useState(null);

  useEffect(() => {
    if (!viaje) {
      return;
    }

    setChofer(viaje.chofer.cedula);
    setVehiculo(viaje.vehiculo.matricula);
  }, [viaje]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (chofer === null) {
      return;
    }

    const getVehiculosChofer = async () => {
      const { data } = await axios.get(`/choferes/${chofer}/vehiculos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehiculosChofer(data);

      if (data.find((v) => v.matricula === vehiculo) === undefined) {
        setVehiculo(null);
      }
    };

    getVehiculosChofer();
  }, [chofer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chofer === null || vehiculo === null) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    onSubmit({
      cedulaChofer: chofer,
      matriculaVehiculo: vehiculo,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-7 text-gray-700 w-[400px] min-h-[250px]"
    >
      <h2 className="font-bold text-xl mb-4 border-b pb-4">
        {viaje ? "Modificar viaje" : "Asignar viaje"}
      </h2>

      <div>
        {viaje !== undefined && (
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2" htmlFor="chofer">
              Guia
            </label>
            <p className="text-2xl font-bold">{idGuia}</p>
          </div>
        )}
        <div className="mb-4 w-full">
          <label className="block text-sm font-bold mb-2" htmlFor="chofer">
            Chofer
          </label>
          <Select
            id="chofer"
            maxMenuHeight={200}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
                color: "#4b5563",
              }),
            }}
            options={choferes.map((c) => ({
              value: c.cedula,
              label: c.cedula,
            }))}
            value={{
              value: chofer,
              label: chofer,
            }}
            onChange={({ value }) => setChofer(value)}
          />
        </div>
        {vehiculosChofer !== null && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="vehiculo">
              Vehiculo
            </label>
            <Select
              id="vehiculo"
              options={vehiculosChofer.map((v) => ({
                value: v.matricula,
                label: v.matricula,
              }))}
              value={{
                value: vehiculo,
                label: vehiculo,
              }}
              onChange={({ value }) => setVehiculo(value)}
              maxMenuHeight={80}
            />
          </div>
        )}
        {!isFormValid && (
          <p className="text-red-500 text-sm mb-2">
            Por favor, rellene todos los campos del formulario.
          </p>
        )}
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {viaje ? "Editar" : "Crear"}
        </button>
      </div>
    </form>
  );
}

export default GuiaForm;
