import { useSearchParams } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import './globals.css'
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const auth = Buffer.from(`${process.env.NEXT_PUBLI_CLIENTID}:457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179`).toString('base64')

  useEffect(()=> {axios.post(`${process.env.NEXT_PUBLIC_ID_URUGUAY_URL}/token`, {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}==`
      }
    }
  )}, [code])
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Loading
    </main>
  )
}
