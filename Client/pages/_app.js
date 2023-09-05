import '@rainbow-me/rainbowkit/styles.css';
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { AuthProvider, AuthContext } from "../context/auth.context";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Nav from "../components/nav/nav.component";
import Home from "./index.js";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  var allowed = true;

  if (typeof window !== "undefined") {
    const role = localStorage.getItem("role");

    if (pathname.startsWith("/user") && role !== "user") {
      allowed = false;
    }
    if (pathname.startsWith("/editor") && role !== "editor") {
      allowed = false;
    }
    if (
      pathname.startsWith("/associate-editor") &&
      role !== "associate-editor"
    ) {
      allowed = false;
    }
  }

  const { chains, publicClient } = configureChains(
    [sepolia],
    [
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Journal Review System',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })


  const ComponentToRender = allowed ? Component : Home;
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <AuthProvider>
            {pathname !== "/" ? <Nav /> : null}
            <ToastContainer />
            <ComponentToRender {...pageProps} />
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
