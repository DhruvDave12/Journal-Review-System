import React from "react";
import { Radio, Modal } from "antd";

const AssociateFinalCall = ({
  setAssociateFinalCall,
  open,
  handleOk,
  confirmLoading,
  handleCancel,
}) => {
  return (
    <Modal
      title="Final Decision"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div>
        <p>
          Do you want this article to be published? Your call will be the final
          call
        </p>
        <Radio.Group onChange={(e) => setAssociateFinalCall(e.target.value)}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default AssociateFinalCall;
