import '../styles/globals.css';
import {AuthProvider} from '../context/auth.context';
import { useRouter } from 'next/router';
import Nav from '../components/nav/nav.component';

function MyApp({Component, pageProps}) {
  const {pathname} = useRouter ();
  return (
    <AuthProvider>
      {
        pathname !== '/' ?
        <Nav />
        : null
      }
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
