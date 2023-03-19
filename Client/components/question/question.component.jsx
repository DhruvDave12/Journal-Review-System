import React, { useState } from "react";
import { Radio } from "antd";
import styles from "../../styles/component-styles/Question.module.css";

const Question = ({
  question,
  options,
  setUserAnswers,
  userAnswers,
  index,
}) => {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
    if (userAnswers.length < index) {
      setUserAnswers([...userAnswers, e.target.value]);
    } else {
      userAnswers[index] = e.target.value;
      setUserAnswers([...userAnswers]);
    }
  };

  return (
    <div className={styles.question__wrapper}>
      <div className={styles.question__ques}>Q{index+1} {question}</div>
      <div className={styles.question__options}>
        <Radio.Group onChange={onChange} value={value}>
          {options.map((option) => (
            <Radio value={option} style={{fontSize: 19}}>{option}</Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default Question;
