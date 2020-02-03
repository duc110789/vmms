import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

const ModalCommon = (props) => {
  const {
    isOpen, onClickToCloseModal, notifyModal, data, clickToButtonInMoDal,
  } = props;
  const onCLickLockModal = async () => {
    await clickToButtonInMoDal(data);
  };
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader>{notifyModal.title}</ModalHeader>
        <ModalBody>
          {notifyModal.content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onCLickLockModal}>{notifyModal.button}</Button>
          <Button color="secondary" onClick={onClickToCloseModal}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalCommon.propTypes = {
  isOpen: PropTypes.bool,
  onClickToCloseModal: PropTypes.func,
  notifyModal: PropTypes.object,
  data: PropTypes.any,
  clickToButtonInMoDal: PropTypes.func,
};

ModalCommon.defaultProps = {
  isOpen: false,
  onClickToCloseModal: () => {},
  notifyModal: null,
  data: null,
  clickToButtonInMoDal: () => {},
};

export default ModalCommon;
