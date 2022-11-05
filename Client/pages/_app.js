// import 'antd/dist/antd.css';
import '../styles/globals.css';
import { AuthProvider, AuthContext } from '../context/auth.context';
import { useRouter } from 'next/router';
import Nav from '../components/nav/nav.component';
import Home from "./index.js";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  var allowed = true;

  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('role');

    if (pathname.startsWith('/user') && role !== 'user') {
      allowed = false;
    }
    if (pathname.startsWith('/editor') && role !== 'editor') {
      allowed = false;
    }
    if (pathname.startsWith('/associate-editor') && role !== 'associate-editor') {
      allowed = false;
    }
  }

  const ComponentToRender = allowed ? Component : Home;
  return (
    <>
      <AuthProvider>
        {
          pathname !== '/' ?
            <Nav />
            : null
        }
        <ComponentToRender {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
