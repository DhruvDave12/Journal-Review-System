import React, {useEffect, useState} from 'react';
import styles from '../../../styles/review/review.module.css';
import NewJournals
  from '../../../components/new-journals/new_journals.component';
import CurrentlyReviewing
  from '../../../components/currently-reviewing/currently_reviewing.component';
import axiosInstance from '../../../services/axiosInstance';
import LazyLoader from '../../../components/lazy-loader/lazy-loader.component';

const Review = () => {
  const [newJournalToggle, setNewJournalToggle] = useState (true);
  const [newReviewRequests, setNewReviewRequests] = useState ([]);
  const [currentlyReviewing, setCurrentlyReviewing] = useState ([]);
  const [loading, setLoading] = useState (false);

  useEffect (() => {
    const fetchNewReviewRequests = async () => {
      const response = await axiosInstance.get ('/review/requests');
      if (response.status === 200) {
        setNewReviewRequests (response.data.requests);
      } else {
        console.log (response.data.message);
      }
    };

    const fetchCurrentlyReviewing = async () => {
      const response = await axiosInstance.get ('/review/currently-reviewing');
      if (response.status === 200) {
        console.log ('RES: ', response.data.currently_reviewing);
        setCurrentlyReviewing (response.data.currently_reviewing);
      } else {
        console.log (response.data.message);
      }
    };

    fetchNewReviewRequests();
    fetchCurrentlyReviewing();
  }, [loading]);

  const handleOnAcceptArticle = async (articleID) => {
    try {
        setLoading(true);
        const response = await axiosInstance.post(`review/requests/accept/${articleID}`);
        if(response.status === 200){
            //TODO -> set a toast using react toastify
            console.log("REQUEST ACCEPTED SUCCESSFULLY");
        } else {
            //TODO -> set a toast using react toastify
            console.log(response.data.message);
        }
        setLoading(false);
    } catch (err) {
        console.log (err);
    }
  }

  const handleOnRejectArticle = async (articleID) => {
    try {
        setLoading(true);
        const response = await axiosInstance.post(`review/requests/reject/${articleID}`);
        if(response.status === 200){
            //TODO -> set a toast using react toastify
            console.log("REQUEST REJECTED SUCCESSFULLY");
        } else {
            //TODO -> set a toast using react toastify
            console.log(response.data.message);
        }
        setLoading(false);
    } catch (err) {
        console.log (err);
    }
  }


  return (
    !loading ?
    <div className={styles.rev}>
      <div className={styles.seclink}>
        <div className={styles.newjour}>
          <p onClick={() => setNewJournalToggle (true)}>New Journals</p>
          <div
            style={{
              height: newJournalToggle ? '6px' : '2px',
              width: '100%',
              display: 'flex',
              backgroundColor: '#68127C',
              borderRadius: '20px',
            }}
          />
        </div>
        <div className={styles.currjour}>
          <p onClick={() => setNewJournalToggle (false)}>
            Currently Reviewing
          </p>
          <div
            style={{
              height: !newJournalToggle ? '6px' : '2px',
              width: '100%',
              display: 'flex',
              backgroundColor: '#68127C',
              borderRadius: '20px',
            }}
          />
        </div>
      </div>
      {newJournalToggle
        ? <NewJournals requests={newReviewRequests} onAccept={handleOnAcceptArticle} onReject={handleOnRejectArticle}/>
        : <CurrentlyReviewing currently_reviewing={currentlyReviewing} />}
    </div> : <LazyLoader />
  );
};

export default Review;
