import Link from 'next/link';

function HeaderComponent() {  

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <Link href="/" passHref>
          CARGA UY
        </Link>
      </div>
      <div>
        <button className="text-white text-sm bg-red-500 py-2 px-4 rounded-md">
          Logout
        </button>
      </div>
    </header>
  );
}
export default HeaderComponent
