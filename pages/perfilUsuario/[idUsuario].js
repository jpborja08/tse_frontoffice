import 'tailwindcss/tailwind.css';
import 'react-tabs/style/react-tabs.css';
import { useRouter } from 'next/router';

import HeaderComponent from '@components/common/header/header';

const DATA = {
  email: 'example@example.com',
  primer_nombre: 'John',
  segundo_nombre: 'Doe',
  primer_apellido: 'Smith',
  segundo_apellido: 'Johnson',
  cédula_identidad: '1234567890',
  idEmpresa: '12345',
};

const PerfilUsuario = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderComponent />
      <div className="flex justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-3xl mx-4 mt-10">
          <div className="px-4 py-8 sm:p-10">
            <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
            <div className="mt-6 space-y-4">
              <p className="text-gray-600"><span className="font-semibold">Email:</span> {DATA.email}</p>
              <p className="text-gray-600"><span className="font-semibold">Primer Nombre:</span> {DATA.primer_nombre}</p>
              <p className="text-gray-600"><span className="font-semibold">Segundo Nombre:</span> {DATA.segundo_nombre}</p>
              <p className="text-gray-600"><span className="font-semibold">Primer Apellido:</span> {DATA.primer_apellido}</p>
              <p className="text-gray-600"><span className="font-semibold">Segundo Apellido:</span> {DATA.segundo_apellido}</p>
              <p className="text-gray-600"><span className="font-semibold">Cédula de Identidad:</span> {DATA.cédula_identidad}</p>
              {DATA.idEmpresa && (
                <p className="text-gray-600"><span className="font-semibold">Empresa de la cual es responsable:</span> {DATA.idEmpresa}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;

