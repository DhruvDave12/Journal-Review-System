import React from "react";
import styles from '../../styles/home/homepage.module.css';
import Image from 'next/image';
import { Button } from 'antd';

const HomePage = () => {
    return (
        <div className={styles.home}>
            <div className={styles.nav_wrap}>
                <div className={styles.login_btn}>
                    <Button type="primary" style={{
                        backgroundColor: "white",
                        width: "100%",
                        height: "50px",
                        border: "2px solid #68127C",
                        borderRadius: "6px",
                        fontSize: "18px",
                        color: "#68127C",
                        fontFamily: "Inter, sans-serif",
                        cursor: "pointer",
                    }}>Login with Google</Button>
                </div>
            </div>
            <div className={styles.center_wrap}>
                <div className={styles.home_text}>
                    <div className={styles.title}>
                        <p>REVI<span>OUR</span></p>
                    </div>
                    <div className={styles.desc}>
                        <p>A journal review system that helps you get reviews for your work within time and by people within same domain.
                            All you have to pay is review the works of others too and help grow the community.</p>
                    </div>
                    <div className={styles.signup_btn}>
                        <p>Don't have an account yet?</p>
                        <Button type="primary" style={{
                            backgroundColor: "#68127C",
                            width: "100%",
                            height: "50px",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "18px",
                            fontFamily: "Inter, sans-serif",
                            cursor: "pointer",
                            marginRight: "40px",
                        }}>SignUp with Google</Button>
                    </div>
                </div>
                <div className={styles.home_img}>
                    <Image
                        src={require("../../assets/images/blogging-bro.svg")}
                        width={580}
                        height={580} />
                </div>
            </div>
        </div>
    )
}

export default HomePage;