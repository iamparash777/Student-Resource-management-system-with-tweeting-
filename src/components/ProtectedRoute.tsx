import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../src/app/firebase/config'; // Make sure to import your Firebase auth instance

const ProtectedRoute = <P extends object>(WrappedComponent: React.ComponentType<P>, adminOnly: boolean = false) => {
  const WithProtection = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          setIsAdmin(user.email === 'pparashh777@gmail.com');
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          router.push('/auth/login');
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (!isAuthenticated) {
      return null;
    }

    if (adminOnly && !isAdmin) {
      router.push('/dashboard');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithProtection.displayName = `ProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithProtection;
};

export default ProtectedRoute;
