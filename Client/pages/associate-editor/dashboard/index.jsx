import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/associate-editor/dashboard/dashboard.module.css";
import { AuthContext } from "../../../context/auth.context";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import { Avatar, Button, List, Divider } from "antd";
import axiosInstance from "../../../services/axiosInstance";
import AssociateEditorAcceptModal from "../../../components/associate-editor-accept-modal/Modal";
import { showToast } from "../../../utils/showToast";

// TODO -> FIX THE BUG REGARDING WHEN THE USER ACCEPTS THEY HAVE TO REFRESH THE PAGE TO SEE THE CHANGES
const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [ongoingArticles, setOnGoingArticles] = useState([]);
  const [timeAlloted, setTimeAlloted] = useState();
  const [timeUnit, setTimeUnit] = useState();
  const [selectedReq, setSelectedReq] = useState();
  const [associateLoading, setAssociateLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [otherLoading, setOtherLoading] = useState(false);

  const associate_requests = user?.user?.associate_requests;

  useEffect(() => {
    const fetchOnGoingArticles = async () => {
      setAssociateLoading(true);
      try {
        const res = await axiosInstance.get("/associate_editor/ongoing");
        console.log("RES: ", res.data);
        if (res.status === 200) {
          setOnGoingArticles(res.data.articles);
          setAssociateLoading(false);
        } else {
          console.log("ERROR WHILE FETCHING ONGOING ARTICLES");
          setAssociateLoading(false);
        }
      } catch (err) {
        console.log("ERROR WHILE FETCHING ONGOING ARTICLES: ", err);
        setAssociateLoading(false);
      }
    };
    fetchOnGoingArticles();
  }, [otherLoading]);

  const handleRejection = async (requestID) => {
    setOtherLoading(true);
    try {
      const res = await axiosInstance.post(
        "/associate_editor/request/accept-reject",
        {
          requestID,
          acceptance_choice: "REJECT",
        }
      );
      if (res.status === 200) {
        showToast("Request Rejected Successfully", "success");
        console.log("REQUEST REJECTED SUCCESSFULLY");
        setOtherLoading(false);
      } else {
        showToast("Request Rejection Failed", "error");
        console.log("REQUEST REJECTION FAILED");
        setOtherLoading(false);
      }
    } catch (err) {
      console.log("ERROR WHILE REJECTING THE REQUEST ASSOCIATE EDITOR: ", err);
    }
  };

  const handleAcceptance = async () => {
    setOtherLoading(true);
    if (!timeAlloted || !timeUnit || !selectedReq) return;
    try {
      const res = await axiosInstance.post(
        "/associate_editor/request/accept-reject",
        {
          requestID: selectedReq,
          acceptance_choice: "ACCEPT",
          time_alloted: parseInt(timeAlloted),
          time_unit: timeUnit,
        }
      );
      if (res.status === 200) {
        showToast("Request Accepted Successfully", "success");
        console.log("REQUEST ACCEPTED SUCCESSFULLY");
        setOtherLoading(false);
        setModalOpen(false);
      }
    } catch (err) {
      showToast("Request Acceptance Failed", "error");
      setOtherLoading(false);
      console.log("ERROR WHILE ACCEPTING THE REQUEST ASSOCIATE EDITOR: ", err);
    }
  };

  const showModal = (id) => {
    setSelectedReq(id);
    setModalOpen(true);
  };

  console.log("ONGOING: ", ongoingArticles);
  return !loading || !associateLoading ? (
    <div className={styles.user__dashboard}>
      <div className={styles.your__request__title}>Here are your requests</div>
      <div className={styles.your__request__container}>
        <List
          itemLayout="horizontal"
          dataSource={associate_requests}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.article.author.picture} />}
                title={<a href="https://ant.design">{item.article.title}</a>}
                description={`By ${item.article.author.username} under the domain ${item.article.domain}`}
              />
              <div className={styles.accept__reject__container}>
                <Button
                  type="primary"
                  onClick={() => showModal(item.requestID)}
                >
                  Accept
                </Button>
                <Button
                  type="danger"
                  onClick={() => handleRejection(item.requestID)}
                >
                  Reject
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Divider />
      <div className={styles.your__request__title}>Ongoing Work</div>
      <div className={styles.your__request__container}>
        <List
          itemLayout="horizontal"
          dataSource={ongoingArticles}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author.picture} />}
                title={<a href="https://ant.design">{item.title}</a>}
                // description={`By ${item.article.author.username} under the domain ${item.article.domain}`}
              />
            </List.Item>
          )}
        />
      </div>
      <AssociateEditorAcceptModal
        associateLoading={associateLoading}
        open={modalOpen}
        setOpen={setModalOpen}
        title="Accept Request"
        onOk={handleAcceptance}
        setTimeAlloted={setTimeAlloted}
        setTimeUnit={setTimeUnit}
      />
    </div>
  ) : (
    <LazyLoader />
  );
};

export default Dashboard;
