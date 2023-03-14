import React from "react";
import { Modal, Input, Typography, Select, Divider } from "antd";
const { Title } = Typography;

const AssociateEditorAcceptModal = ({
  onOk,
  title,
  open,
  setOpen,
  associateLoading,
  setTimeAlloted,
  setTimeUnit,
}) => {
  const handleChange = (value) => {
    setTimeUnit(value);
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={() => setOpen(false)}
      confirmLoading={associateLoading}
    >
      <Title level={4} style={{ textAlign: "center" }}>
        Please allot the time for this article review process
      </Title>

      <Input
        placeholder={"Time Alloted (E.g. 15)"}
        onChange={(e) => setTimeAlloted(e.target.value)}
      />
      <Divider />
      <Select
        placeholder={"Time Unit"}
        onChange={handleChange}
        style={{ width: "50%" }}
        options={[
          { value: "days", label: "Days" },
          { value: "weeks", label: "Weeks" },
          { value: "months", label: "Months" },
          { value: "year", label: "Years" },
        ]}
      />
    </Modal>
  );
};

export default AssociateEditorAcceptModal;
