import React from "react";
import 'antd/dist/antd.css';
import { Modal } from "antd";
import CustomInput from "../input/input.component";

const QuestionUploadModal = ({isModalOpen, handleOk, handleCancel, setQuestionState, setCorrectAnswerState, setOption1, setOption2, setOption3, setOption4}) => {
    return (
    <div>
      <Modal
        title="Add Question"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{height: '100%'}}>
            <div style={{margin: '10px 0'}}>
                <CustomInput placeholder={"Question"} handleChange={setQuestionState}/>
            </div>
            <div style={{margin: '10px 0'}}>
                <CustomInput placeholder={"Correct Answer"} handleChange={setCorrectAnswerState}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width: '100%'}}>
                <div style={{display:'flex', flexDirection:'column', width: '40%'}}>
                    <div style={{margin: '10px 0', width: '100%'}}>
                        <CustomInput placeholder={"Option 1"} handleChange={setOption1}/>
                    </div>
                    <div style={{margin: '10px 0', width: '100%'}}>
                        <CustomInput placeholder={"Option 2"} handleChange={setOption2}/>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', width: '40%'}}>
                    <div style={{margin: '10px 0', width: '100%'}}>
                        <CustomInput placeholder={"Option 3"} handleChange={setOption3}/>
                    </div>
                    <div style={{margin: '10px 0', width: '100%'}}>
                        <CustomInput placeholder={"Option 4"} handleChange={setOption4}/>
                    </div>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionUploadModal;
