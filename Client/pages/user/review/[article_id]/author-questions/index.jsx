import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LazyLoader from "../../../../../components/lazy-loader/lazy-loader.component";
import styles from "../../../../../styles/author-questions/AuthorQuestions.module.css";
import axiosInstance from "../../../../../services/axiosInstance";
import Question from "../../../../../components/question/question.component";
import { Button } from "antd";
import { showToast } from "../../../../../utils/showToast";
import FinalReviewModal from "../../../../../components/final-review-modal/finalReviewModal.component";

const AuthorQuestionAnswers = () => {
  const router = useRouter();

  const { article_id } = router.query;
  const [currentArticleToReview, setCurrentArticleToReview] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Final Review Modal States and routines
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [criticalAnalysis, setCriticalAnalysis] = useState("");
  const [shouldBePublished, setShouldBePublished] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleFinalReviewSubmission = async () => {
    setConfirmLoading(true);
    const res = await axiosInstance.post(`/review/final-review/${article_id}`, {
      critical_analysis: criticalAnalysis,
      should_be_published: shouldBePublished,
    });

    if (res.status === 200) {
      showToast("Final review submitted successfully", "success");
      router.push("/user/review");
    } else {
      showToast(res.data.message, "error");
    }
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCurrentArticleToReview = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`/article/get-single/${article_id}`);
      setCurrentArticleToReview(res.data.article);
      setIsLoading(false);
    };
    fetchCurrentArticleToReview();
  }, []);

  const handleSubmitForReview = async () => {
    var answersToSendArr = [];
    for (let i = 0; i < currentArticleToReview.author_questions.length; i++) {
      answersToSendArr.push({
        questionID: currentArticleToReview.author_questions[i]._id,
        answer: userAnswers[i],
      });
    }

    try {
      const res = await axiosInstance.post(
        `/review/author-question-answers/${article_id}`,
        {
          answers: answersToSendArr,
        }
      );

      if (res.status === 200) {
        showToast(
          "Your have passed the author test and is eligible for the final review.",
          "success"
        );
        showModal();
      } else {
        showToast(res.data.message, "error");
        if (res.data.score) {
          // TODO -> REMOVE THE AUTHOR FROM THE REVIEW
          
        }
      }
    } catch (err) {
      console.log("error: ", err);
      showToast("Something went wrong", "error");
    }
  };

  return !isLoading && currentArticleToReview ? (
    <div className={styles.main__page__wrapper}>
      <h1 className={styles.main__h1}>Author questions</h1>
      <p className={styles.main__p}>
        Here are some questions that you have to answer before submitting the
        final review. These questions are set by the author of the article. You
        can answer them in the form below.
      </p>

      <div className={styles.author__questions}>
        {currentArticleToReview?.author_questions?.map((question, index) => (
          <Question
            options={question.options}
            question={question.question}
            key={index}
            setUserAnswers={setUserAnswers}
            userAnswers={userAnswers}
            index={index}
          />
        ))}
      </div>

      <div className={styles.submit__wrapper}>
        <Button type="danger" onClick={handleSubmitForReview}>
          Submit for final Review
        </Button>
      </div>

      <FinalReviewModal
        confirmLoading={confirmLoading}
        handleOk={handleFinalReviewSubmission}
        handleCancel={handleCancel}
        open={open}
        setCriticalAnalysis={setCriticalAnalysis}
        setShouldBePublished={setShouldBePublished}
      />
    </div>
  ) : (
    <LazyLoader />
  );
};

export default AuthorQuestionAnswers;
