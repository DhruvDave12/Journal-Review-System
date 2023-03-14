import React from "react";
import { Modal, Avatar, List, Button } from "antd";

const CustomAsyncModal = ({
  openModal,
  confirmLoadingModal,
  handleCancel,
  associateData,
  handleOnRequest,
}) => {
  return (
    <Modal
      title="Assign Associate Editor"
      visible={openModal}
      confirmLoading={confirmLoadingModal}
      onCancel={handleCancel}
    >
      <List
        itemLayout="horizontal"
        dataSource={associateData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item?.picture} />}
              title={item.username}
              // TODO -> Add domain here in decription
              description={item.email}
            />
            <Button type="primary" onClick={() => handleOnRequest(item._id)}>
              Send Request
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CustomAsyncModal;
