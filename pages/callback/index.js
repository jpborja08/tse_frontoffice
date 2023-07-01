import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      // Redirect to the home page with the code as a query parameter
      router.push(`/?code=${code}`);
    } else {
      // Handle the case when the code is not available
      // You can redirect to an error page or handle it as needed
      router.push('/error');
    }
  }, [router.query]);

  return <div>Redirecting...</div>;
};

export default CallbackPage;
