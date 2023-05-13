import 'tailwindcss/tailwind.css';

export default function Login() {
  const handleLogin = async () => {
    const state = "grupo8" + Math.floor(Math.random()*1000000000);
    const scope = 'openid%20personal%20email'
    const url = `${process.env.NEXT_PUBLIC_ID_URUGUAY_LOGIN}?response_type=code&scope=${scope}&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&state=${state}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
    window.location.replace(url)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button className="h-10 px-6 font-semibold rounded-md bg-sky-800 text-white" onClick={handleLogin}>
        Login con ID Uruguay
      </button>
    </main>
  )
}
