import { useState } from "react";

const EmpresaForm = ({ onSubmit, initialData, error }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-600 font-semibold">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="razonSocial"
          className="block text-gray-600 font-semibold"
        >
          Razón Social
        </label>
        <input
          type="text"
          id="razonSocial"
          name="razonSocial"
          value={formData.razonSocial || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numero" className="block text-gray-600 font-semibold">
          Nro. Empresa
        </label>
        <input
          type="number"
          id="numero"
          name="numero"
          value={formData.numero || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="direccion"
          className="block text-gray-600 font-semibold"
        >
          Dirección Principal
        </label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      {error && (
        <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>
      )}
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

export default EmpresaForm;
