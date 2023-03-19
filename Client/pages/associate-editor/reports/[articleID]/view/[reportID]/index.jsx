import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../../../../services/axiosInstance";
import LazyLoader from "../../../../../../components/lazy-loader/lazy-loader.component";
import { Card, Divider, Tag } from "antd";

const ViewReport = () => {
  const router = useRouter();
  const { reportID } = router.query;
  const [report, setReport] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`/review/get-review/${reportID}`);
      if (res.status === 200) {
        setReport(res.data.review);
      } else {
        showToast("Something went wrong", "error");
      }
      setIsLoading(false);
    };

    fetchReport();
  }, []);

  var questionAnswerOfReviewer = [];
  var score = 0;

  for (let i = 0; i < report?.article?.author_questions?.length; i++) {
    if (
      report?.author_question_answers[i]?.answer ===
      report?.article?.author_questions[i].correct_answer
    )
      score++;

    questionAnswerOfReviewer.push({
      question: report?.article?.author_questions[i].question,
      correctAnswer: report?.article?.author_questions[i].correct_answer,
      reviwerAnswer: report?.author_question_answers[i]?.answer,
      isCorrect:
        report?.author_question_answers[i]?.answer ===
        report?.article?.author_questions[i].correct_answer,
    });
  }
  return !isLoading && report ? (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Report #{report._id} {report?.should_be_published ? "✅" : "❌"}
      </h1>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          title="Reviewer Details"
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontWeight: "500" }}>{report?.reviewer?.username}</p>
          <p style={{ fontWeight: "500" }}>{report?.reviewer?.email}</p>
          <p style={{ fontWeight: "500" }}>
            Reviewers Decision:{" "}
            <p
              style={{
                fontWeight: "500",
                color: report?.should_be_published ? "green" : "red",
              }}
            >
              {report?.should_be_published ? "PUBLISH" : "DONT PUBLISH"}
            </p>
          </p>
          <p style={{ fontWeight: "600" }}>Domain</p>
          <div
            style={{
              width: "30%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {report?.reviewer?.domain?.map((domainName) => (
              <Tag color="magenta">{domainName}</Tag>
            ))}
          </div>
        </Card>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Critical Analysis</h1>
        <p style={{ fontSize: "20px" }}>{report?.critical_analysis}</p>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h1>Page Wise Reviews</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "90%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              rowGap: 10,
            }}
          >
            {report?.page_reviews[0].comments.map((review) => (
              <Card
                title={`Page ${review?.page_number}`}
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <p style={{ fontWeight: "500" }}>{review?.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Divider />
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Reviewer answers to questions</h1>
        <h1>Total Score: {score}</h1>
        <div
          style={{
            width: "90%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            rowGap: 10,
          }}
        >
          {questionAnswerOfReviewer.map((result, index) => (
            <Card
              title={`Question ${index + 1}`}
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p style={{ fontWeight: "500" }}>
                {result.question} {result.isCorrect ? "✅" : "❌"}
              </p>
              <p style={{ fontWeight: "500" }}>
                Correct Answer: {result.correctAnswer}
              </p>
              <p style={{ fontWeight: "500" }}>
                Reviewer Answer: {result.reviwerAnswer}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <LazyLoader />
  );
};

export default ViewReport;
