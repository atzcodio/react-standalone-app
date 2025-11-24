import React from 'react';
import { Modal, Button } from 'antd';

interface ConfirmationModalProps {
  message: string;
  confirmCallback: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, confirmCallback, onClose }) => {
  const handleOk = () => {
    confirmCallback();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Confirmation"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Confirm
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
