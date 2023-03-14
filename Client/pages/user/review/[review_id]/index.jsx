import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ReviewPage = () => {
  const router = useRouter();
  const { review_id } = router.query;
  const [currentArticleToReview, setCurrentArticleToReview] = useState(null);

  useEffect(() => {
    const fetchCurrentArticleToReview = async () => {};
  }, []);

  return (
    <div className="review-page">
      <h1>Start your review</h1>
    </div>
  );
};

export default ReviewPage;
