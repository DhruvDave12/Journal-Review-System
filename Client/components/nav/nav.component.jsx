import React, { useState } from "react";
import { ArrowUpOutlined, DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const Nav = () => {
    const { user } = useContext(AuthContext);
    const [revToggle, setRevToggle] = useState(false);
    const [getToggle, setGetToggle] = useState(false);

    const router = useRouter();

    const toReview = (e) => {
        e.preventDefault();
        setRevToggle(true);
        setGetToggle(false);
        router.push('/user/review');
    }

    const toGetReview = (e) => {
        e.preventDefault();
        setRevToggle(false);
        setGetToggle(true);
        router.push('/getreview');
    }

    return (
        <div className="navbar">
            <div className="name">
                <p>REVI<span>OUR</span></p>
            </div>
            <div className="nav-section">
                <div className="nav-link">
                    <p onClick={toReview} style={{ borderBottom: revToggle ? "3px solid #68127C" : "none" }}>Review</p>
                    <p onClick={toGetReview} style={{ borderBottom: getToggle ? "4px solid #68127C" : "none" }}>Get Reviewed</p>
                </div>
            </div >
            <div className="user-data">
                <div className="rating">
                    <p className="dashed">1242</p>
                    <ArrowUpOutlined style={{ fontSize: '20px', color: 'green' }} />
                </div>
                <div className="user-profile">
                    <p>Hi {user?.user?.username}</p>
                </div>
            </div>
            <style jsx>
                {`
                    .navbar{
                        width: 100%;
                        height: 15vh;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .name{
                        width: 20%;
                        height: 100%;
                        display: flex;
                        font-family: 'Grandstander', cursive;
                        align-items: center;
                        justify-content: center;
                    }

                    .name p {
                        font-size: 45px;
                        color: black;
                    }

                    .name span {
                        color: #68127C;
                    }

                    .nav-section{
                        width: 60%;
                        height: 100%;
                        display: block;
                    }

                    .nav-link{
                        width: 55%;
                        height : 100%;
                        display: flex;
                        margin: auto;
                        justify-content: space-around;
                        align-items: center;
                    }

                    .nav-link p{
                        color: black;
                        font-family: 'Inter', sans-serif;
                        font-size: 22px;
                        cursor: pointer;
                        padding-bottom: 4px;
                    } 

                    .user-data{
                        width: 25%;
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }

                    .rating{
                        height: 50px;
                        width: 40%;
                        display: flex;
                        justify-content: space-around;
                        padding-right: 20px;
                        align-items: center;
                        border-right: 3px solid #68127C;
                    }

                    .dashed{
                        border-bottom: 2px dashed black;
                        width: 60%;
                        height: 36px;
                        padding-right: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        color: green;
                        font-family: 'Inter', sans-serif;
                        font-size: 22px;
                    }

                    .user-profile{
                        width: 70%;
                        margin-left : 20px;
                    }

                    .user-profile p {
                        color: black;
                        font-family: 'Inter', sans-serif;
                        font-size: 22px;
                    }
                `}
            </style>
        </div >
    )
}

export default Nav;