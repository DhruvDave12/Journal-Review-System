import React from "react";
import { Button } from "antd";

const ReportBar = ({ report, handleOnView }) => {
  return (
    <div className="art-card">
      <div className="art__upper__wrapper">
        <p className="art-name">{report?.article?.title}</p>
        <p className="art__under">By {report?.reviewer?.username}</p>
        <p className="art__publish">
          {report?.should_be_published ? "PUBLISH" : "DONT PUBLISH"}
        </p>
      </div>
      <div className="reject-btn">
        <Button
          onClick={() => handleOnView(report)}
          type="primary"
          style={{
            backgroundColor: "#EEA4FF",
            width: "100%",
            height: "50px",
            border: "none",
            borderRadius: "6px",
            fontSize: "20px",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            color: "black",
          }}
        >
          View
        </Button>
      </div>

      <style jsx>
        {`
          .art-card {
            width: 90%;
            height: 70px;
            background-color: #76108d;
            margin: auto;
            border-radius: 6px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 20px;
          }

          .art__upper__wrapper {
            width: 60%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .art-name {
            width: 50%;
            color: white;
            font-family: "Inter", sans-serif;
            font-size: 20px;
          }
          .art__under {
            color: white;
            font-family: "Inter", sans-serif;
            font-size: 20px;
          }
          .art__publish{
            color: white;
            font-family: "Inter", sans-serif;
            font-size: 20px;
          }
          .review-btn {
            width: 20%;
            height: 75%;
            display: flex;
            justify-content: center;
            flex-direction: column;
          }

          .reject-btn {
            width: 20%;
            height: 75%;
            display: flex;
            justify-content: center;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
};

export default ReportBar;
