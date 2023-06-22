import { useState } from "react";

const ChoferForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="cedula" className="block text-gray-600 font-semibold">
          Cédula
        </label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          value={formData.cedula || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
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

export default ChoferForm;
