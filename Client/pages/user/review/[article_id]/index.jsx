import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axiosInstance from "../../../../services/axiosInstance";
import LazyLoader from "../../../../components/lazy-loader/lazy-loader.component";
import styles from "../../../../styles/particular-review/ParticularReview.module.css";
import { Button, Input } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { showToast } from "../../../../utils/showToast";

const { TextArea } = Input;

const ReviewPage = () => {
  const router = useRouter();

  const { article_id } = router.query;
  const [currentArticleToReview, setCurrentArticleToReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageReviewToShow, setPageReviewToShow] = useState(null);
  const [currPageReview, setCurrentPageReview] = useState(pageReviewToShow);

  useEffect(() => {
    const fetchCurrentArticleToReview = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`/article/get-single/${article_id}`);
      console.log("RES ARTICLE: ", res.data);
      setCurrentArticleToReview(res.data.article);
      setIsLoading(false);
    };
    fetchCurrentArticleToReview();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var articlePageMap =
        JSON.parse(localStorage.getItem("articlePageReview")) || {};
      var reviewArr = articlePageMap[currentArticleToReview?._id];
      if (reviewArr && reviewArr.length >= currPageNumber) {
        setPageReviewToShow(reviewArr[currPageNumber - 1]);
      } else {
        setPageReviewToShow(null);
      }
    }
  }, [currPageNumber, typeof window]);

  const handleSavingToBackendAndLocalStorage = async () => {
    if (typeof window !== "undefined") {
      var articlePageMap =
        JSON.parse(localStorage.getItem("articlePageReview")) || {};
      var reviewArr = articlePageMap[currentArticleToReview?._id];

      if (reviewArr && reviewArr.length >= currPageNumber) {
        showToast("You have already reviewed this page", "success");
        return;
      }
    }
    const res = await axiosInstance.post(
      `/review/page-review/${currentArticleToReview?._id}`,
      {
        review: currPageReview,
        pageNumber: currPageNumber,
      }
    );

    if (!res?.data?.success) {
      showToast(
        "There was some problem with the system. Please try again later",
        "error"
      );
      return;
    }

    var existingArticlePageReview =
      JSON.parse(localStorage.getItem("articlePageReview")) || {};
    var reviewArr = existingArticlePageReview[currentArticleToReview?._id];

    if (reviewArr && reviewArr.length < currPageNumber) {
      reviewArr.push(currPageReview);
    } else if (reviewArr && reviewArr.length >= currPageNumber) {
      reviewArr[currPageNumber - 1] = currPageReview;
    } else {
      reviewArr = [currPageReview];
    }

    existingArticlePageReview[currentArticleToReview?._id] = reviewArr;

    localStorage.setItem(
      "articlePageReview",
      JSON.stringify(existingArticlePageReview)
    );
    showToast("Successfully saved your review", "success");
  };

  const handleNextPage = async () => {
    await handleSavingToBackendAndLocalStorage();
    setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleRouteToAuthorQuestions = async () => {
    await handleSavingToBackendAndLocalStorage();
    router.push(`/user/review/${article_id}/author-questions`);
  };
  console.log("FILE: ", currentArticleToReview?.pdfFile?.url);
  return !isLoading && currentArticleToReview ? (
    <div>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js"></script>
      </Head>
      {/* <h1>{pageReviewToShow}</h1> */}
      <div style={{ padding: "0 20px" }} className="wrapper">
        <h1 style={{ fontSize: "30px", fontWeight: "700" }}>
          {currentArticleToReview.title}
        </h1>
        <div className={styles.complete__wrapper}>
          <div className={styles.pdf__wrapper}>
            <Document
              file={currentArticleToReview?.pdfFile?.url}
              onLoadError={(err) => {
                console.log("error", err);
              }}
              onLoadSuccess={({ numPages }) => {
                setTotalPages(numPages);
              }}
              className={styles.pdf__document}
            >
              <Page pageNumber={currPageNumber} />
            </Document>
          </div>
          <div className={styles.pdf__toolbar}>
            <p style={{ color: "black", textAlign: "right" }}>
              Page {currPageNumber} of {totalPages}
            </p>
            {/* TODO -> ADD THE EDIT REVIEW FEATURE ALSO ON THE FRONTEND */}
            <div className={styles.toolbar__up}>
              {pageReviewToShow ? (
                <TextArea
                  value={pageReviewToShow}
                  placeholder="Write your review here"
                  style={{ width: "100%", height: "100%" }}
                  rows={4}
                  onChange={(e) => {
                    setCurrentPageReview(e.target.value);
                  }}
                />
              ) : (
                <TextArea
                  placeholder="Write your review here"
                  style={{ width: "100%", height: "100%" }}
                  rows={4}
                  onChange={(e) => {
                    setCurrentPageReview(e.target.value);
                  }}
                />
              )}
            </div>
            <div className={styles.toolbar__down}>
              <div className={styles.toolbar__right__buttons}>
                <Button
                  disabled={currPageNumber >= totalPages}
                  onClick={handleNextPage}
                >
                  Next Page
                </Button>
                <Button
                  disabled={currPageNumber == 1}
                  onClick={handlePreviousPage}
                >
                  Previous Page
                </Button>
              </div>
            </div>
            {currPageNumber == totalPages && (
              <div className={styles.final__submission__button}>
                <Button
                  type="primary"
                  style={{ width: "50%" }}
                  onClick={handleRouteToAuthorQuestions}
                >
                  Submit Page Reviews
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LazyLoader />
  );
};

export default ReviewPage;
