import '../styles/globals.css';
import {AuthProvider} from '../context/auth.context';
function MyApp({Component, pageProps}) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
