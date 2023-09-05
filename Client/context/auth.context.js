import { useEffect, useState, createContext } from "react";
import axiosInstance from "../services/axiosInstance";
import { Contract, ethers } from "ethers";
import { SEPOLIA_CONTRACT_ADDRESS } from "../utils/constants";
import JRSContract from "../artifacts/JournalReview.json";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  const initializeContract = async () => {
    const provider = new ethers.providers.Web3Provider(window?.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("signer: ", signer);
    setSigner(signer);
    setContract(new Contract(SEPOLIA_CONTRACT_ADDRESS, JRSContract.abi, signer));
  }

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/user/details");
        console.log("RES FROM USER: ", res.data);
        if (res.status === 200) {
          localStorage.setItem("role", res?.data?.user?.role);
          setUser(res.data);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
        initializeContract();
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (Object.keys(accessToken).length > 0) {
      console.log("ACCESS TOKEN: ", accessToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, setAccessToken, isLoggedIn, loading, contract, signer }}
    >
      {children}
    </AuthContext.Provider>
  );
};
