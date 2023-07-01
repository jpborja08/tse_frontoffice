import "tailwindcss/tailwind.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const MonitoreoDeViajesPage = () => {
  const [viajes, setViajes] = useState([
    {
      id: 1,
      fechaInicio: '2023-05-01',
      fechaFin: '2023-05-03',
      nombreEmpresa: 'Empresa A',
      idEmpresa: 1,
      destino: 'Destino A',
      origen: 'Origen A',
      volumenCarga: '10 tons',
      rubro: 'Rubro A',
      tipoCarga: 'Tipo A',
      idGuia: 1,
      cedulaChofer: '1234567890',
      idChofer: 1,
      bandera: 'green',
    },
    {
      id: 2,
      fechaInicio: '2023-05-02',
      fechaFin: '2023-05-04',
      nombreEmpresa: 'Empresa B',
      idEmpresa: 2,
      destino: 'Destino B',
      origen: 'Origen B',
      volumenCarga: '8 tons',
      rubro: 'Rubro B',
      tipoCarga: 'Tipo B',
      idGuia: 2,
      cedulaChofer: '0987654321',
      idChofer: 2,
      bandera: 'red',
    },
  ]);

  const getFlagIconClass = (bandera) => {
    switch (bandera) {
      case 'green':
        return 'text-green-500';
      case 'red':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-600 text-center">Monitoreo de Viajes</h1>
          {viajes.map((viaje) => (
            <div key={viaje.id} className="bg-gray-200 rounded-lg p-4 mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Fecha de Inicio:</span> {viaje.fechaInicio}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Fecha de Fin:</span> {viaje.fechaFin || 'No definida'}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Empresa:</span> {viaje.nombreEmpresa}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Destino:</span> {viaje.destino}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Origen:</span> {viaje.origen}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Volumen de Carga:</span> {viaje.volumenCarga}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Rubro:</span> {viaje.rubro}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Tipo de Carga:</span> {viaje.tipoCarga}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Id Guia:</span> {viaje.idGuia}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Cedula Chofer:</span> {viaje.cedulaChofer}
                </p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center">
                  {viaje.bandera && (
                    <span className={`mr-2 text-xl ${getFlagIconClass(viaje.bandera)}`}>
                      <FontAwesomeIcon icon={faFlag} />
                    </span>
                  )}
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

