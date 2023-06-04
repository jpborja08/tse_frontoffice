import 'tailwindcss/tailwind.css';
import React from 'react';
import VehiculoForm from '@components/common/vehiculoForm';
import HeaderComponent from '@components/common/header/header';

const INITIAL_DATA = { //HERE WE NEED TO GET THE DATA OF THE VEHICULO USING THE ID PASSED
  id_empresa: 123,
  matricula: 'ABC123',
  marca: 'Ford',
  modelo: 'Focus',
  peso: 1500,
  capacidad_carga: 2000,
  numero_permiso: 456,
  validez_permiso: '2023-01-01',
  fecha_inspeccion: '2022-12-31',
};

const ModificarVehiculo = () => {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <HeaderComponent />
      <VehiculoForm
        title="Modificar Vehículo"
        onSubmit={handleSubmit}
        initialData={INITIAL_DATA}
      />
    </div>
  );
};

export default ModificarVehiculo;

