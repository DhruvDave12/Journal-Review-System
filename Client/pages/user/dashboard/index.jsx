import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth.context";
import styles from '../../../styles/dashboard/dashboard.module.css';
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  return !loading ? (
    <div className="user__dashboard">
        
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
