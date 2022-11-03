import React, { useState } from 'react';
import { Button } from "antd";
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from '../../../styles/get-reviewed/getreview.module.css';

const GetReviewed = () => {
    const router = useRouter()
    return (
        <div className={styles.get_rev}>
            <div className={styles.addnewart}>
                <Button
                    onClick={() => { router.push('/user/get-reviewed/newarticle/forms') }}
                    type="primary"
                    style={{
                        zIndex: '10',
                        position: 'absolute',
                        backgroundColor: '#68127C',
                        width: '50px',
                        height: '50px',
                        opacity: '36%',
                        display: 'flex',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                </Button>
                <Image
                    src={require('../../../assets/images/add.svg')}
                    width={30}
                    height={30}
                />
            </div>
        </div>
    )
}

export default GetReviewed;