import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import HeaderComponent from "@components/common/Header/header";

const CEDULAS_DE_CHOFERES = ["12345678", "87654321", "98765432", "23456789"];
const MATRICULAS_DE_VEHICULOS = ["ABC123", "XYZ789", "DEF456", "GHI987"];

const ViajePage = () => {
  const router = useRouter();
  const { idViaje } = router.query;
  const [viajeData, setViajeData] = useState({
    idGuia: '',
    cedulaChofer: '',
    matriculaVehiculo: '',
  });
  const [selectedCedula, setSelectedCedula] = useState('');
  const [selectedMatricula, setSelectedMatricula] = useState('');

  // Fetch viaje data based on idViaje
  useEffect(() => {
    // Add your code here to fetch the viaje data using idViaje and update the `viajeData` state
    // Example code:
    const fetchViajeData = async () => {
      try {
        // Make an API call or fetch the data from your data source
        const response = await fetch(`/api/viajes/${idViaje}`);
        // const data = await response.json();

        // Update the viajeData state with the fetched data
        const data = {
          idGuia: "G001",
          cedulaChofer: '12345678',
          matriculaVehiculo: 'ABC123'
        }
        if (data.cedulaChofer) setSelectedCedula(data.cedulaChofer);
        if (data.matriculaVehiculo) setSelectedMatricula(data.matriculaVehiculo);
        setViajeData(data);
      } catch (error) {
        console.error('Error fetching viaje data:', error);
      }
    };

    // Call the fetchViajeData function
    fetchViajeData();
  }, [idViaje]);

  // Handle form submission for updating cedulaChofer and matriculaVehiculo
  const handleCedulaChange = (event) => {
    setSelectedCedula(event.target.value);
  };
  
  const handleMatriculaChange = (event) => {
    setSelectedMatricula(event.target.value);
  };

  const handleSubmit = () => {
    // Perform submission logic here
    console.log("Submitted:", selectedCedula, selectedMatricula);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderComponent />
      <div className="flex justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-3xl mx-4 mt-10">
          <div className="px-4 py-8 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">Detalles del Viaje</h1>
            <div className="mt-6 space-y-4">
              <p className="text-gray-600">IdGuia: {viajeData.idGuia}</p>
              <p className="text-gray-600">
                Cédula Chofer:
                <select
                  className="border border-gray-300 px-2 py-1 rounded-md ml-2"
                  value={selectedCedula || ""}
                  onChange={handleCedulaChange}
                >
                  <option value="">Asignar Chofer</option>
                  {CEDULAS_DE_CHOFERES.map((cedula) => (
                    <option key={cedula} value={cedula}>
                      {cedula}
                    </option>
                  ))}
                </select>
              </p>
              <p className="text-gray-600">
                Matricula Vehiculo:
                <select
                  className="border border-gray-300 px-2 py-1 rounded-md ml-2"
                  value={selectedMatricula || ""}
                  onChange={handleMatriculaChange}
                >
                  <option value="">Asignar Vehiculo</option>
                  {MATRICULAS_DE_VEHICULOS.map((matricula) => (
                    <option key={matricula} value={matricula}>
                      {matricula}
                    </option>
                  ))}
                </select>
              </p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleSubmit}
                disabled={!selectedCedula || !selectedMatricula}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViajePage;
