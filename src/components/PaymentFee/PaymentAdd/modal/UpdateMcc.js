import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const UpdateMcc = (props) => {
  const {
    toggleUpdateMcc,
    isShowModalUpdateMcc,
    // listMccDetail,
  } = props;

  const toggle = () => toggleUpdateMcc();

  return (
    <div>
      <Modal isOpen={isShowModalUpdateMcc} centered toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Chi tiết</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <h3>content</h3>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-middle bigger-150 btn-primary" onClick={toggle}>
            <i className="fa fa-arrow-left mr-1" />
            Quay lại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateMcc;
UpdateMcc.propTypes = {
  isShowModalUpdateMcc: PropTypes.any,
  toggleUpdateMcc: PropTypes.any,
  // listMccDetail: PropTypes.any,
};

UpdateMcc.defaultProps = {
  isShowModalUpdateMcc: null,
  toggleUpdateMcc: null,
  // listMccDetail: null,
};
