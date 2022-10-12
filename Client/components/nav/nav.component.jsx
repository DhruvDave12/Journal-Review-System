import React from "react";
import { ArrowUpOutlined, DownloadOutlined } from '@ant-design/icons';

const Nav = () => {
    return (
        <div className="navbar">
            <div className="name">
                <p>REVI<span>OUR</span></p>
            </div>
            <div className="nav-section">
                <div className="nav-link">
                    <p>Review</p>
                    <p>Get Reviewed</p>
                </div>
            </div>
            <div className="user-data">
                <div className="rating">
                    <div className="dashed">
                        <p>1242</p>
                    </div>
                    <ArrowUpOutlined style={{ fontSize: '20px', color: 'green' }} />
                </div>
                <div className="user-profile">
                    <p>Hi Katheryne</p>
                </div>
            </div>
            <style jsx>
                {`
                    .navbar{
                        width: 100%;
                        height: 15%;
                        display: flex;
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
                    } 

                    .user-data{
                        width: 25%;
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }

                    .rating{
                        height: 50%;
                        width: 40%;
                        display: flex;
                        justify-content: space-around;
                        padding-right: 20px;
                        align-items: center;
                        border-right: 3px solid #68127C;
                    }

                    .rating p{
                        color: green;
                        font-family: 'Inter', sans-serif;
                        font-size: 22px;
                    }

                    .dashed{
                        border-bottom: 1px dashed black;
                        width: 60%;
                        height: 80%;
                        padding-right: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .user-profile{
                        width: 70%;
                        margin-left : 20px
                    }

                    .user-profile p {
                        color: black;
                        font-family: 'Inter', sans-serif;
                        font-size: 22px;
                    }
                `}
            </style>
        </div>
    )
}

export default Nav;