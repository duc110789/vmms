import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { notifyDelete } from '../../utils/constants';


// eslint-disable-next-line react/prefer-stateless-function
class NotifyPopUp extends Component {
  render() {
    const { modalDelete, handleSetModalDelete, handleDeleteFromTable } = this.props;
    return (
      <div>
        <Modal isOpen={modalDelete} size="lg">
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div><span>{notifyDelete.NOTIFY_BEFORE_PRESS_DELETE}</span></div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleDeleteFromTable}>Xóa bản ghi</Button>
            <Button color="secondary" onClick={handleSetModalDelete}>Quay lại</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
NotifyPopUp.propTypes = {
  modalDelete: PropTypes.bool.isRequired,
  handleSetModalDelete: PropTypes.func.isRequired,
  handleDeleteFromTable: PropTypes.func.isRequired,

};

export default NotifyPopUp;
