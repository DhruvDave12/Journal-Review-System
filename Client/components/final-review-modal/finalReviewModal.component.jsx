import React from "react";
import { Modal, Input, Radio } from "antd";

const FinalReviewModal = ({
  handleOk,
  confirmLoading,
  handleCancel,
  open,
  setCriticalAnalysis,
  setShouldBePublished,
}) => {
  return (
    <Modal
      title="Final Review"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Input.TextArea
        placeholder="Enter your critical analysis here"
        rows={4}
        onChange={(e) => setCriticalAnalysis(e.target.value)}
      />

      <p style={{ fontSize: 18, fontWeight: "500" }}>
        Should the article be published ?
      </p>
      <Radio.Group onChange={(e) => setShouldBePublished(e.target.value)}>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
    </Modal>
  );
};

export default FinalReviewModal;
