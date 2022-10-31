import React, { useState } from 'react';
import styles from '../../styles/review/review.module.css';
import Nav from '../../components/nav/nav.component';

const Review = () => {

    const [newToggle, setNewToggle] = useState(true);
    const [currToggle, setCurrToggle] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setNewToggle(!newToggle);
        setCurrToggle(!currToggle);
    }

    return (
        <div className={styles.rev}>
            <div className={styles.header}>
                <Nav />
            </div>
            <div className={styles.seclink}>
                <div className={styles.newjour}>
                    <p onClick={handleClick}>New Journals</p>
                    <div style=
                        {{
                            height: newToggle ? "6px" : "2px",
                            width: "100%",
                            display: "flex",
                            backgroundColor: "#68127C",
                            borderRadius: "20px"
                        }}>
                    </div>
                </div>
                <div className={styles.currjour}>
                    <p onClick={handleClick}>Currently Reviewing</p>
                    <div style=
                        {{
                            height: currToggle ? "6px" : "2px",
                            width: "100%",
                            display: "flex",
                            backgroundColor: "#68127C",
                            borderRadius: "20px"
                        }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;