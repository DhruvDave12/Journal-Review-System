import React, {useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Upload, message} from 'antd';
import styles from '../../../../../styles/newarticle/newart-form.module.css';
import CustomInput from '../../../../../components/input/input.component';
import QuestionUploadModal
  from '../../../../../components/question-upload-modal/question-upload-modal.component';
  import FileInput from '../../../../../components/file-input/file-input.component';
import axiosInstance from '../../../../../services/axiosInstance';
import LazyLoader from '../../../../../components/lazy-loader/lazy-loader.component';
const NewArticleForm = () => {
  const [authorQuestions, setAuthorQuestions] = useState ([]);
  const [title, setTitle] = useState ('');
  const [domain, setDomain] = useState ('');
  const [isModalOpen, setIsModalOpen] = useState (false);
  const [question, setQuestionState] = React.useState ('');
  const [correctAnswer, setCorrectAnswerState] = React.useState ('');
  const [option1, setOption1] = React.useState ('');
  const [option2, setOption2] = React.useState ('');
  const [option3, setOption3] = React.useState ('');
  const [option4, setOption4] = React.useState ('');

  const [totalPages, setTotalPages] = React.useState(0);
  const [acceptedScore, setAcceptedScore] = React.useState(0);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [apiLoading, setApiLoading] = useState(false);
  
  
  const handleCancel = () => {
    setIsModalOpen (false);
  };
  const showModal = () => {
    setIsModalOpen (true);
  };
  const handleOk = () => {
    const optionss = [option1, option2, option3, option4];

    setAuthorQuestions ([
      ...authorQuestions,
      {question: question, correct_answer: correctAnswer, options: optionss},
    ]);

    setCorrectAnswerState('');
    setQuestionState('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setIsModalOpen (false);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAuthorQuestion = {
        "author_questions": authorQuestions
    }
    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('title', title);
    formData.append('domain', domain);
    formData.append('totalPages', totalPages);
    formData.append('accepted_score', acceptedScore);
    formData.append('author_questions', JSON.stringify(finalAuthorQuestion));
    setApiLoading(true);
    try{    
        await axiosInstance.post('/article/create', formData);
        console.log("ARTICLE SUCCEFSSFULLY CREATED");
        setApiLoading(false);
    } catch (err){
        console.log(err);
        setApiLoading(false);
    }
    
}
  return (
    !apiLoading ?
    <div className={styles.art_form_wrap}>
      <p className={styles.form_heading}>New Article For Review</p>
      <form className={styles.article_form}>
        <div className={styles.input__wrapper}>
          <div style={{width: '80%'}}>
            <CustomInput label={'Article Title'} handleChange={setTitle} />
          </div>
          <div style={{width: '80%'}}>
            <CustomInput label={'Article Domain'} handleChange={setDomain} />
          </div>
          <div style={{width: '80%'}}>
            <CustomInput label={'Total Pages'} handleChange={setTotalPages} />
          </div>
          <div style={{width: '80%'}}>
            <CustomInput label={'Accepted Score'} handleChange={setAcceptedScore} />
          </div>
        </div>
        <div className={styles.upload_btn}>
            <div style={{margin: '20px 0'}}>
            <FileInput setFile={setFile} loading={loading} setLoading={setLoading} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
            </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
          <Button
            type="primary"
            style={{
              width: '80%',
              height: '50px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '18px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
            }}
            onClick={showModal}
          >
            Click to add a question
          </Button>
        </div>
        <div style={{width: '100%', display:'flex', justifyContent:'center'}}>
            <div style={{width: '80%', margin: '20px 0'}}>
                {authorQuestions.length === 0
                ? <p style={{fontWeight: '300', fontSize: 28, textAlign: 'center'}}>
                    No questions added 😪
                    </p>
                : <div>
                    {authorQuestions.map (ques => (
                        <p style={{fontWeight: '500', fontSize: 25}}>{ques.question}</p>
                    ))}

                    </div>}
            </div>
        </div>
            
            <div style={{width: '100%', display: 'flex', justifyContent:'center'}}>

            <Button 
            type="primary"
            onClick={handleSubmit}
            style={{width: '80%', borderRadius: 10}}
            >
                 Submit
            </Button>
            </div>
      </form>

      <QuestionUploadModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        setQuestionState={setQuestionState}
        setCorrectAnswerState={setCorrectAnswerState}
        setOption1={setOption1}
        setOption2={setOption2}
        setOption3={setOption3}
        setOption4={setOption4}
      />
    </div>
    : <LazyLoader />
  );
};

export default NewArticleForm;
