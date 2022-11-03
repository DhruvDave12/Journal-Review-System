import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from "antd";
import styles from '../../../../../styles/newarticle/newart-form.module.css';

const NewArticleForm = () => {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className={styles.art_form_wrap}>
            <p className={styles.form_heading}>New Article For Review</p>
            <form className={styles.article_form}>
                <div className={styles.arttitle_div}>
                    <p>Article title : </p>
                    <input type="text" className={styles.arttitle_input} required />
                </div>
                <div className={styles.arttitle_div}>
                    <p>Article domain : </p>
                    <input type="text" className={styles.arttitle_input} required />
                </div>
                <div className={styles.upload_btn}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />} style={{
                            width: '100%',
                            height: '50px',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '18px',
                            fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer',
                        }}> Click to Upload Article</Button>
                    </Upload>
                </div>
            </form>
        </div>
    )
}

export default NewArticleForm;

