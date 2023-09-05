import React, { useState, useEffect} from "react";
import { ArrowUpOutlined, DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Nav = () => {
    const { user, contract } = useContext(AuthContext);
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
        router.push('/user/get-reviewed');
    }

    useEffect(() => {
        const getUserScoree = async () => {
            try {
              console.log("ID: ", user?.user?._id);
              const fetchedScore = await contract?.getUserScore(user?.user?._id);
              console.log("FEMTCHED SCOMRE: ", fetchedScore);
            } catch (err) {
                console.log("ERROR WHILE FETCHING SCORE FROM CONTRACT: ", err);
            }
          }
          
          getUserScoree();
    }, [contract, user]);
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
                    <div className="dashed">1242</div>
                    <ArrowUpOutlined style={{ fontSize: '20px', color: 'green' }} />
                </div>
                <div className="user-profile">
                    <div className="user_text">Hi {user?.user?.username}</div>
                    <ConnectButton />
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
                    .user_text {
                        font-family: 'Inter', sans-serif;
                        font-size: 1.2rem;
                        color: black;
                        margin-right: 10px;
                    }
                    .name{
                        width: 15%;
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
                        width: 40%;
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
                        width: 40%;
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }

                    .rating{
                        width: 20%;
                        display: flex;
                        justify-content: space-around;
                        padding-right: 20px ;
                        align-items: center;
                        border-right: 3px solid #68127C;
                    }

                    .dashed{
                        border-bottom: 2px dashed black;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        color: green;
                        font-family: 'Inter', sans-serif;
                        font-size: 1.2rem;
                        margin-right: 10px;
                    }

                    .user-profile{
                        width: 80%;
                        margin-left : 20px;
                        display: flex;
                        justify-content: space-around;
                    }

                    .user-profile p {
                        color: black;
                        font-family: 'Inter', sans-serif;
                        font-size: 1.2rem;
                    }
                `}
            </style>
        </div >
    )
}

export default Nav;