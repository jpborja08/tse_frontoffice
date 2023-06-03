import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

import HeaderComponent from '@components/common/header/header';
import GuiaItem from '@components/common/guiaItem';

const DATA = {
  nombrePublico: 'Empresa Ejemplo',
  razonSocial: 'Example Company Name',
  nroEmpresa: 12345,
  direccionPrincipal: '123 Main Street, City, Country',
  rubro: 'Example Industry',
  vehiculos: [
    {
      idVehiculo: 1,
      matricula: 'ABC123',
      marca: 'Example Brand 1',
      modelo: 'Example Model 1',
      peso: 1500,
      capacidadCarga: 2000,
      numeroPermiso: 1234,
      validezPermiso: '2023-06-01',
      fechaInspeccion: '2023-07-15',
    },
    {
      idVehiculo: 2,
      matricula: 'DEF456',
      marca: 'Example Brand 2',
      modelo: 'Example Model 2',
      peso: 1800,
      capacidadCarga: 2500,
      numeroPermiso: 5678,
      validezPermiso: '2023-08-01',
      fechaInspeccion: '2023-09-15',
    },
    {
      idVehiculo: 3,
      matricula: 'GHI789',
      marca: 'Example Brand 3',
      modelo: 'Example Model 3',
      peso: 2000,
      capacidadCarga: 3000,
      numeroPermiso: 91011,
      validezPermiso: '2023-10-01',
      fechaInspeccion: '2023-11-15',
    },
  ],
  choferes: [
    {
      cedula: '123456789',
    },
    {
      cedula: '987654321',
    },
    {
      cedula: '456789123',
    },
  ],
  guias: [
    {
      nombreRubroCliente: 'Retail',
      volumenCarga: 250.5,
      fecha: '2023-05-16',
      origen: 'City A',
      destino: 'City B',
      tipoCarga: 'Carga Líquida',
      idViaje: 5,
    },
    {
      nombreRubroCliente: 'Manufacturing',
      volumenCarga: 180.2,
      fecha: '2023-05-17',
      origen: 'City C',
      destino: 'City D',
      tipoCarga: 'Carga Frágil',
      idViaje: 1,
    },
    {
      nombreRubroCliente: 'Logistics',
      volumenCarga: 320.8,
      fecha: '2023-05-18',
      origen: 'City E',
      destino: 'City F',
      tipoCarga: 'Carga Refrigerada',
      idViaje: null,
    },
  ],
};

const PerfilEmpresa = () => {
  const [activeTab, setActiveTab] = useState('vehiculos');
  const router = useRouter();
  const { idEmpresa } = router.query;

  const handleModificarVehiculo = (idVehiculo) => {
    router.push(`/modificarVehiculo/${idVehiculo}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderComponent />
      <div className="flex justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-3xl mx-4 mt-10">
          <div className="px-4 py-8 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">{DATA.nombrePublico}</h1>
            <div className="mt-6 space-y-4">
              <p className="text-gray-600">
                <span className="font-semibold">Razón Social:</span> {DATA.razonSocial}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Nro. Empresa:</span> {DATA.nroEmpresa}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Dirección Principal:</span> {DATA.direccionPrincipal}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Rubro:</span> {DATA.rubro}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full">
                <Tabs>
                  <TabList className="flex mb-6 border-b border-gray-300">
                    <Tab
                      className={`mr-6 cursor-pointer ${
                        activeTab === 'vehiculos' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('vehiculos')}
                    >
                      Vehiculos
                    </Tab>
                    <Tab
                      className={`mr-6 cursor-pointer ${
                        activeTab === 'choferes' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('choferes')}
                    >
                      Choferes
                    </Tab>
                    <Tab
                      className={`cursor-pointer ${
                        activeTab === 'guias' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('guias')}
                    >
                      Guias
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <div>
                      {activeTab === 'vehiculos' && (
                        <div className="mb-4">
                          <Link href={`/altaVehiculo?idEmpresa=${idEmpresa}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">
                            Dar de alta vehiculo
                          </Link>
                        </div>
                      )}
                      {DATA.vehiculos.map((vehiculo, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg p-4 mb-4">
                          <p className="text-gray-600">
                            <span className="font-semibold">Matrícula:</span> {vehiculo.matricula}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Marca:</span> {vehiculo.marca}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Modelo:</span> {vehiculo.modelo}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Peso:</span> {vehiculo.peso}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Capacidad de carga:</span> {vehiculo.capacidadCarga}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Numero de Permiso:</span> {vehiculo.numeroPermiso}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Validéz de permiso:</span> {vehiculo.validezPermiso}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Fecha de inspección:</span> {vehiculo.fechaInspeccion}
                          </p>
                          {activeTab === 'vehiculos' && (
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                              onClick={() => handleModificarVehiculo(vehiculo.idVehiculo)}
                            >
                              Modificar vehiculo
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div>
                      {DATA.choferes.map((chofer, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg p-4 mb-4">
                          <p className="text-gray-600">
                            <span className="font-semibold">Cédula:</span> {chofer.cedula}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div>
                      {activeTab === 'guias' && (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">
                          Crear Guia
                        </button>
                      )}
                      <div>
                        {DATA.guias.map((guia, index) => (
                          <GuiaItem key={index} guia={guia} />
                        ))}
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilEmpresa;
