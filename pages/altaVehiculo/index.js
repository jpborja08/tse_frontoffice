import "tailwindcss/tailwind.css";
import React from "react";
import { useRouter } from "next/router";

import VehiculoForm from "@components/common/vehiculoForm";
import HeaderComponent from "@components/common/header/header";

function AltaVehiculo() {
  const router = useRouter();
  const { idEmpresa } = router.query;

  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <VehiculoForm
      title="Alta de Vehículo"
      idEmpresa={idEmpresa}
      onSubmit={handleSubmit}
    />
  );
}

export default AltaVehiculo;
