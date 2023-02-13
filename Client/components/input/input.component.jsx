import React from "react";
import styles from "../../styles/component-styles/custom_input.module.css";

const CustomInput = ({label, placeholder, handleChange}) => {
  return (
    <div className={styles.arttitle_div}>
      <p>{label ? `${label} :`: null}</p>
      <input type="text" className={styles.arttitle_input} placeholder={placeholder} onChange={e => handleChange(e.target.value)} required />
    </div>
  );
};


export default CustomInput;
