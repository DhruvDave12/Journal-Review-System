import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth.context";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import "antd/dist/antd.css";
import styles from "../../../styles/editor/homepage/homepage.module.css";
import { Divider, Avatar, List, Modal } from "antd";
import axiosInstance from "../../../services/axiosInstance";
import CustomAsyncModal from "../../../components/custom-request-modal/custom-request-modal.component";
import { Select, Input, Space } from "antd";
import { showToast } from "../../../utils/showToast";
const { Search } = Input;

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);
  const [associateData, setAssociateData] = useState([]);
  const [currSelectedReq, setCurrSelectedReq] = useState();
  const [displayReq, setDisplayReq] = useState([]);

  const onChange = (value) => {
    console.log("REQ: ", requests);
    if (value === "all") {
      setDisplayReq(requests);
    } else {
      const displayArr = requests.filter((req) => {
        if (value === "not_requested") {
          return !req.isRequested && !req.isFulfilled;
        }
        if (value === "accepted") {
          return req.isFulfilled;
        }
        if (value === "pending") {
          return req.isRequested && !req.isFulfilled;
        }
      });
      setDisplayReq(displayArr);
    }
  };
  const onSearch = (value) => {
    const displayReq = requests.filter((req) => {
      return (
        req.article.title.toLowerCase().includes(value.toLowerCase()) ||
        req.owner.username.toLowerCase().includes(value.toLowerCase())
      );
    });
    setDisplayReq(displayReq);
  };

  useEffect(() => {
    const getAllRequests = async () => {
      const res = await axiosInstance.get("/editor/article/requests");
      if (res.status !== 200) {
        console.log("Error: ", res);
      } else {
        setRequests(res?.data?.requests);
        setDisplayReq(res?.data?.requests);
      }
    };
    getAllRequests();
  }, []);

  const showModal = async (requestID) => {
    setCurrSelectedReq(requestID);
    try {
      const res = await axiosInstance.get(
        `/editor/associate/editors/${requestID}`
      );
      if (res.status !== 200) {
        console.log("Error: ", res);
      } else {
        setAssociateData(res?.data?.associateEditors);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
    setOpenModal(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  const handleOnRequest = async (associateEditorID) => {
    try {
      const res = await axiosInstance.post("/editor/article/associate", {
        requestID: currSelectedReq,
        associateEditorID: associateEditorID,
      });

      if (res.status === 200) {
        console.log("Request sent successfully");
        showToast("Request sent successfully", "success");
        setOpenModal(false);
      }
    } catch (err) {
      showToast("Error while sending request to the associate editor", "error");
      console.log("Error while sending request to the associate editor: ", err);
    }
  };

  const getStatus = (isRequested, isFulfilled) => {
    if (isFulfilled) {
      return "ACCEPTED";
    }
    if (isRequested && !isFulfilled) {
      return "PENDING";
    }
    return "REJECTED";
  };

  return !loading && user ? (
    <div className={styles.editor__dashboard}>
      <p className={styles.title}>Welcome back, {user?.user?.username} 👋</p>
      <Divider />

      <div className={styles.top__wrapper}>
        <div className={styles.sub__title}>New Article Requests</div>
        <Search
          placeholder="Search Article, Author...."
          onSearch={onSearch}
          style={{ width: "30%" }}
        />
        <Select
          placeholder="Filter Status"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "not_requested",
              label: "Not Requested",
            },
            {
              value: "accepted",
              label: "Accepted",
            },
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "all",
              label: "Show All",
            },
          ]}
        />
      </div>
      {displayReq.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={displayReq}
          renderItem={(item) => (
            <List.Item
              onClick={
                !item.isRequested && !item.isFulfilled
                  ? () => showModal(item._id)
                  : null
              }
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.article.title}
                description={item.owner.username}
              />
              {/* show status */}
              <div style={{ width: "10%" }}>
                {getStatus(item.isRequested, item.isFulfilled) ===
                "REJECTED" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "30%" }}>
                      <div
                        style={{
                          backgroundColor: "red",
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ color: "black", fontSize: 14 }}>
                        NOT REQUESTED
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "30%" }}>
                      <div
                        style={{
                          backgroundColor:
                            getStatus(item.isRequested, item.isFulfilled) ===
                            "PENDING"
                              ? "#d89614"
                              : "#8bbb11",
                          width: 15,
                          height: 15,
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ color: "black", fontSize: 14 }}>
                        {getStatus(item.isRequested, item.isFulfilled)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
      ) : (
        <p className={styles.pending__text}>No pending requests</p>
      )}

      <CustomAsyncModal
        openModal={openModal}
        confirmLoadingModal={confirmLoadingModal}
        handleCancel={handleCancel}
        associateData={associateData}
        handleOnRequest={handleOnRequest}
      />
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
