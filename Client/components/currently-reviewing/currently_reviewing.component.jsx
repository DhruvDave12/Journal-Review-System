import React from "react";
import styles from "../../styles/component-styles/currently_review.module.css";
import ArticleCard from "../article-card/article-card.component";

const CurrentlyReviewing = ({currently_reviewing}) => {
  return (
    <div className={styles.currReviewing}>
      {
        currently_reviewing && currently_reviewing.length === 0 ? (
            <p style={{fontWeight: '300', fontSize: 28, textAlign:'center', color: 'black'}}>No journals in review 😴</p>
        ) :
        currently_reviewing && currently_reviewing.map((request) => (
            <ArticleCard onAccept={() => {}} onReject={() => {}} request={request} isAcceptedForReviewing={true}/>  
        ))
      }
    </div>
  );
};

export default CurrentlyReviewing;
