import React, { useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/get-reviewed/getreview.module.css";

const GetReviewed = () => {
  const router = useRouter();
  return (
    <div className={styles.get_rev}>
      <div className={styles.addnewart}>
        <Button
          onClick={() => {
            router.push("/user/get-reviewed/newarticle/forms");
          }}
          type="primary"
          style={{
            border: "none",
            opacity: "36%",
            display: "flex",
            borderRadius: "6px",
            cursor: "pointer",
            background: "none",
          }}
        >
          <Image
            src={require("../../../assets/images/add.svg")}
            width={30}
            height={30}
          />
        </Button>
      </div>
    </div>
  );
};

export default GetReviewed;
