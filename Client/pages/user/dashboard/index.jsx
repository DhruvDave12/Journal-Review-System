import 'antd/lib/select/style/index.css';
import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Select } from 'antd';
import styles from '../../../styles/dashboard/dashboard.module.css';
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";

const Dashboard = () => {

  const { user, loading } = useContext(AuthContext);

  const options = [
    {
      value: "Blockchain",
      label: "Blockchain"
    }, {
      value: "Artificial Intelligence",
      label: "Artificial Intelligence"
    }, {
      value: "Data Science",
      label: "Data Science"
    },{
      value: "Computer Architecture",
      label: "Computer Architecture"
    },{
      value: "Computer Networks",
      label: "Computer Networks"
    },{
      value: "Image and Video Processing",
      label: "Image and Video Processing"
    },{
      value: "Embedded Systems",
      label: "Embedded Systems"
    },{
      value: "Operating Systems",
      label: "Operating Systems"
    }
  ]

  return !loading ? (
    <div className={styles.user_dashboard}>
      <p className={styles.select_domain}>
        Select Your Specific Domain/s
      </p>
      <Select mode="multiple" style={{
        width: '80%',
        margin: '20px 0',
      }} placeholder="Select Domains" onChange={() => { }} options={options} />
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
