import React from "react";
import { Button } from "antd";

const ArticleCard = ({ title }) => {
    return (
        <div className="art-card">
            <p className="art-name">
                {title}
            </p>
            <div className="review-btn">
                <Button
                    type="primary"
                    style={{
                        backgroundColor: '#EEA4FF',
                        width: '100%',
                        height: '50px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '20px',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                >
                    Review
                </Button>
            </div>
            <div className="reject-btn">
                <Button
                    type="primary"
                    style={{
                        backgroundColor: '#EEA4FF',
                        width: '100%',
                        height: '50px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '20px',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                >
                    Reject
                </Button>
            </div>
            <style jsx>
                {`
                    .art-card{
                        width: 90%;
                        height: 70px;
                        background-color: #76108D;
                        margin: auto;
                        border-radius: 6px;
                        display: flex;
                        justify-content : space-around;
                        align-items: center;
                        margin-bottom : 20px;
                    }

                    .art-name{
                        width: 50%;
                        color: white;
                        font-family: 'Inter', sans-serif;
                        font-size: 20px;
                    }

                    .review-btn{
                        width: 20%;
                        height: 75%;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                    }

                    .reject-btn{
                        width: 20%;
                        height: 75%;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                    }
                `}
            </style>
        </div>
    )
}

export default ArticleCard;