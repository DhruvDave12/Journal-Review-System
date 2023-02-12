import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth.context";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import "antd/dist/antd.css";
import styles from "../../../styles/editor/homepage/homepage.module.css";
import { Divider, Avatar, List } from "antd";
import axiosInstance from "../../../services/axiosInstance";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getAllRequests = async () => {
      const res = await axiosInstance.get("/editor/article/requests");
      if (res.status !== 200) {
        console.log("Error: ", res);
      } else {
        setRequests(res?.data?.requests);
      }
    };

    getAllRequests();
  }, []);

  return !loading && user ? (
    <div className={styles.editor__dashboard}>
      <p className={styles.title}>Welcome back, {user?.user?.username} 👋</p>

      <Divider />

      <p className={styles.sub__title}>Pending Requests</p>

      {requests.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={requests}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.article.title}</a>}
                description={item.owner.username}
              />
            </List.Item>
          )}
        />
      ) : (
        <p className={styles.pending__text}>No pending requests</p>
      )}
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
