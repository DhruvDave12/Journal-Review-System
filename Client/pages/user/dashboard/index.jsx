import "antd/lib/select/style/index.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Select, Button, Modal } from "antd";
import styles from "../../../styles/dashboard/dashboard.module.css";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import axiosInstance from "../../../services/axiosInstance";
import SelectDomain from "../../../components/select-domain/selectDomain.component";
import { showToast } from "../../../utils/showToast";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  const [selectedDomains, setSelectedDomains] = useState([]);
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsModalVisible(
        localStorage.getItem("@hasDomain") &&
          localStorage.getItem("@hasDomain") === "true"
          ? false
          : true
      );
    }
    const fetchDomainOptions = async () => {
      const res = await axiosInstance.get("/user/domain/options");
      setOptions(res.data.domainOptions);
    };
    fetchDomainOptions();
  }, []);

  const handleOk = async () => {
    try {
      await axiosInstance.post("/user/details", {
        domain: selectedDomains,
      });
      setIsModalVisible(false);
      localStorage.setItem("@hasDomain", true);
    } catch (err) {
      console.log("ERROR WHILE ADDING DOMAIN: ", err);
    }
  };

  const handleCancel = () => {
    showToast("Please select your domain(s) to continue", "error");
  };

  return !loading ? (
    <div className={styles.user_dashboard}>
      <h1 style={{ fontSize: "36px" }}>Welcome {user?.user?.username} 👋</h1>
      <p style={{ fontSize: "20px", fontWeight: "400" }}>
        You can start by keeping your own articles for review or can review
        others article. Get started by choosing the options for Review or Get
        Reviewed.
      </p>

      <Modal
        title="Select Domain"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SelectDomain
          options={options}
          setSelectedDomains={setSelectedDomains}
        />
      </Modal>
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
