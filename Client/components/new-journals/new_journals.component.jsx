import React from "react";
import styles from "../../styles/component-styles/new_journals.module.css";
import ArticleCard from "../article-card/article-card.component";

const NewJournals = ({requests, onAccept, onReject}) => {
  return (
    <div className={styles.newjourlist}>
      {
        requests && requests.length === 0 ? (
            <p style={{fontWeight: '300', fontSize: 28, textAlign:'center'}}>No new journals in request 😴</p>
        ) :
        requests && requests.map((request) => (
            <ArticleCard key={request._id} request={request} onAccept={onAccept} onReject={onReject} isAcceptedForReviewing={false}/>
        ))
      }
    </div>
  );
};

export default NewJournals;
