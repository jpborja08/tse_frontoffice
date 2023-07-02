import { useState } from "react";
import Select from "react-select";

const AssignVehicleForm = ({
  onSubmit,
  vehiculos,
  cedula,
  alreadyAssignedVehicles = [],
}) => {
  const [formData, setFormData] = useState({});

  const handleChangeSelect = (vehiculosMatricula) => {
    setFormData({ ...formData, vehiculosMatricula });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const unmappedVehicules = formData.vehiculosMatricula.map(
      ({ value }) => value
    );
    onSubmit({
      cedula,
      vehiculosMatricula: unmappedVehicules,
    });
  };

  const mappedVehicles = vehiculos.reduce((acc, { matricula }) => {
    if (!alreadyAssignedVehicles.find((mat) => mat === matricula)) {
      acc.push({
        value: matricula,
        label: matricula, //`${matricula} - ${marca} - ${modelo}`,
      });
    }
    return acc;
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="pb-10 px-20 pt-4 flex flex-col justify-between h-full"
    >
      <div className="mb-4">
        <label htmlFor="cedula" className="block text-gray-600 font-semibold">
          Cédula: {cedula}
        </label>
        <label
          htmlFor="vehiculosYaAsignados"
          className="block text-gray-600 font-semibold"
        >
          Vehículos ya asignados:{" "}
          <div>
            {alreadyAssignedVehicles.map((matricula) => (
              <p key={matricula}>{matricula}</p>
            ))}
          </div>
        </label>
        <label
          htmlFor="vehiculos"
          className="block text-gray-600 font-semibold mt-4"
        >
          Vehículos
        </label>
        <Select
          isMulti
          name="Vehículos"
          value={formData.vehiculosMatricula}
          onChange={handleChangeSelect}
          options={mappedVehicles}
          className="w-full py-2 text-black"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
};

export default AssignVehicleForm;
