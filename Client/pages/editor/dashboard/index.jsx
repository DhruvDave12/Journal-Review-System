import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth.context";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  return !loading ? (
    <div className="user__dashboard">
        <h1>WELCOME TO DASHBOARD</h1>
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
