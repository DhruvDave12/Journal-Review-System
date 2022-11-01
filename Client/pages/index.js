import React, {useEffect, useContext} from 'react';
import styles from '../styles/home/homepage.module.css';
import cookies from 'next-cookies';
import {AuthContext} from '../context/auth.context';
import Image from 'next/image';
import { getGoogleOAuthURL } from '../utils/getGoogleURL';
import {Button} from "antd";
import { useRouter } from 'next/router'

const Home = (accessToken) => {
  const {setAccessToken, isLoggedIn} = useContext (AuthContext);
  const router = useRouter()
  useEffect (() => {
    setAccessToken (accessToken);
  }, []);

  return (
      <div className={styles.home}>
        <div>
          <div className={styles.title}>
            <p>REVI<span>OUR</span></p>
          </div>
        </div>
        <div className={styles.center_wrap}>
          <div className={styles.home_text}>

            <div className={styles.desc}>
              <p>
                A journal review system that helps you get reviews for your work within time and by people within same domain.
                All you have to pay is review the works of others too and help grow the community.
              </p>
            </div>
            <div className={styles.signup_btn}>
              {!isLoggedIn
                ? <a
                    href={getGoogleOAuthURL()}
                    style={{
                      backgroundColor: '#68127C',
                      width: '100%',
                      height: '50px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      color: 'white'
                    }}
                  >
                    Signup with Google
                  </a>
                : <Button
                    onClick={() => {router.push('/dashboard')}}
                    type="primary"
                    style={{
                      backgroundColor: '#68127C',
                      width: '100%',
                      height: '50px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                >
                  Visit Dashboard
                </Button>
              }
            </div>
          </div>
          <div className={styles.home_img}>
            <Image
              src={require ('../assets/images/blogging-bro.svg')}
              width={580}
              height={580}
            />
          </div>
        </div>
      </div>
    )
};

Home.getInitialProps = async ctx => {
  const {accessToken} = cookies (ctx);
  return accessToken ? accessToken : {};
};


export default Home;
