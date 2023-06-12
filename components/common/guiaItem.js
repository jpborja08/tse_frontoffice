import { useRouter } from "next/router";
import dayjs from "dayjs";

const GuiaItem = ({ index, guia }) => {
  const router = useRouter();

  const handleVerViajeClick = () => {
    router.push(`/viaje/${guia.viaje.id}`);
  };

  return (
    <div key={index} className="bg-gray-200 rounded-lg p-4 mb-4 flex">
      <div className="flex-1 space-y-2">
        <p className="text-gray-600">
          Nombre Rubro Cliente: {guia.rubro.nombre}
        </p>
        <p className="text-gray-600">Volumen de Carga: {guia.volumenCarga}</p>
        <p className="text-gray-600">
          Fecha:{" "}
          {dayjs(guia.timestamp).utc("z").local().format("dddd, MMM D, H:mm")}
        </p>
        <p className="text-gray-600">Origen: {guia.origen}</p>
        <p className="text-gray-600">Destino: {guia.destino}</p>
        <p className="text-gray-600">Tipo de Carga: {guia.tipoCarga.nombre}</p>
      </div>

      <div className="flex justify-between items-end mt-4">
        {guia.viaje !== null ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleVerViajeClick}
          >
            Ver Viaje
          </button>
        ) : (
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4">
            Crear Viaje
          </button>
        )}
      </div>
    </div>
  );
};
export default GuiaItem;
