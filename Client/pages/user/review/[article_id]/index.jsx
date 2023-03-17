import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axiosInstance from "../../../../services/axiosInstance";
import LazyLoader from "../../../../components/lazy-loader/lazy-loader.component";
import styles from "../../../../styles/particular-review/ParticularReview.module.css";
import { Button, Input } from "antd";
const { TextArea } = Input;

import { Document, Page, pdfjs } from "react-pdf";

const ReviewPage = () => {
  const router = useRouter();
  const { article_id } = router.query;
  const [currentArticleToReview, setCurrentArticleToReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [currPageReview, setCurrentPageReview] = useState(null);

  useEffect(() => {
    const fetchCurrentArticleToReview = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`/article/get-single/${article_id}`);
      setCurrentArticleToReview(res.data.article);
      setIsLoading(false);
    };
    fetchCurrentArticleToReview();
  }, []);

  const handleNextPage = () => {
    // TODO -> DO THE PAGE WISE REVIEW THING IN THE BACKEND BY CALLING THE API HERE
    setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  return !isLoading && currentArticleToReview ? (
    <div>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js"></script>
      </Head>

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
            <div className={styles.toolbar__up}>
              <TextArea
                placeholder="Write your review here"
                style={{ width: "100%", height: "100%" }}
                rows={4}
                onChange={(e) => {
                  setCurrentPageReview(e.target.value);
                }}
              />
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
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LazyLoader />
  );
};

export default ReviewPage;
