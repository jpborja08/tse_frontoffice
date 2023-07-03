import "tailwindcss/tailwind.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const MonitoreoDeViajesPage = () => {
  const [viajes, setViajes] = useState([]);

  const getFlagIconClass = (bandera) => {
    if (bandera === null) return 'text-gray-500';
    if (bandera) {
      return 'text-green-500';
    }
    else {
      return 'text-red-500';
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get('/viajes/monitoreo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setViajes(response.data);
      } catch (error) {
        console.error('Error fetching viajes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">Monitoreo de Viajes</h1>
          {viajes.map((viaje) => (
            <div key={viaje.id} className="bg-gray-200 rounded-lg p-4 mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Fecha de Inicio:</span> {viaje.viaje.fechaComienzo}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Fecha de Fin:</span> {viaje.viaje.fechaFinalizacion || 'No definida'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Empresa:</span> {viaje.viaje.guia.empresa.nombre}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Destino:</span> {viaje.viaje.guia.destino}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Origen:</span> {viaje.viaje.guia.origen}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Vehículo:</span> {viaje.viaje.vehiculo.matricula}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Volumen de Carga:</span> {viaje.viaje.guia.volumenCarga}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Rubro:</span> {viaje.viaje.guia.rubro.nombre}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Tipo de Carga:</span> {viaje.viaje.guia.tipoCarga.nombre}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Id Guia:</span> {viaje.viaje.guia.id}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Chofer:</span> {viaje.viaje.chofer.cedula || viaje.viaje.chofer}
                </p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center">
                  <span className={`mr-2 text-xl ${getFlagIconClass(viaje['pesajesvalidos'])}`}>
                    <FontAwesomeIcon icon={faFlag} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitoreoDeViajesPage;

