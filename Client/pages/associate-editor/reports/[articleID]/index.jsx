import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../../services/axiosInstance";
import { showToast } from "../../../../utils/showToast";
import LazyLoader from "../../../../components/lazy-loader/lazy-loader.component";
import { Button, Divider } from "antd";
import ReportBar from "../../../../components/report-bar/reportBar.component";
import AssociateFinalCall from "../../../../components/associate-final-call/associateFinalCall.component";
import { AuthContext } from "../../../../context/auth.context";

const ArticleReports = () => {
  const router = useRouter();
  const {contract} = useContext(AuthContext);

  const { articleID } = router.query;

  const [currentArticle, setCurrentArticle] = useState();
  const [reports, setReports] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [associateFinalCall, setAssociateFinalCall] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const updateContract = async (associateCall) => {
    const mongoIDs = currentArticle.reviews.map((review) => review.reviewer);
    const reviewersComment = currentArticle.reviews.map((review) => {
      return review.should_be_published ? "YES" : "NO";
    })   
    const call = associateCall === true ? "YES" : "NO";
    const tx = await contract?.updateUserReputation(mongoIDs, reviewersComment,call);
    // wait for the above transaction to complete
    const succTx = await tx.wait();
    console.log("Tx: ", succTx);
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await axiosInstance.post(
      `/associate_editor/final-decision/${articleID}`,
      {
        decision: associateFinalCall,
      }
    );
    if (res.status === 200) {
      await updateContract(associateFinalCall);
      showToast("Final Decision Taken Successfully", "success");
      router.push("/associate-editor/dashboard");
      setIsModalVisible(false);
    } else {
      showToast("Final Decision Failed", "error");
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchArticleReports = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(
        `/associate_editor/reports/${articleID}`
      );
      if (res.status === 200) {
        setReports(res.data.reviews);
      } else {
        showToast("Something went wrong", "error");
      }
      setIsLoading(false);
    };

    const fetchCurrentArticle = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`/article/get-single/${articleID}`);
      if (res.status === 200) {
        setCurrentArticle(res.data.article);
      } else {
        showToast("Something went wrong", "error");
      }
      setIsLoading(false);
    };

    fetchCurrentArticle();
    fetchArticleReports();
  }, []);

  const handleOnView = (report) => {
    router.push(`/associate-editor/reports/${articleID}/view/${report._id}`);
  };

  var countOfPublishYes = 0;
  for (let i = 0; i < reports?.length; i++) {
    if (reports[i].should_be_published === true) countOfPublishYes++;
  }

  const handleTakeFinalDecision = () => {
    showModal();
  };

  return !isLoading && reports && currentArticle ? (
    <div
      style={{
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Reports</h1>
        <Button
          type="danger"
          onClick={handleTakeFinalDecision}
          disabled={currentArticle?.associate_decision}
        >
          Take Final Decision
        </Button>
      </div>
      <Divider />
      <h1 style={{ textAlign: "center" }}>
        {countOfPublishYes} out of {reports.length} reviewers have suggested to
        publish this article.
      </h1>
      <Divider />
      {reports.map((report, index) => (
        <ReportBar report={report} handleOnView={handleOnView} />
      ))}

      <AssociateFinalCall
        open={isModalVisible}
        setAssociateFinalCall={setAssociateFinalCall}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
      />
    </div>
  ) : (
    <LazyLoader />
  );
};

export default ArticleReports;
