/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Label, FormGroup, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Refuse = (props) => {
  const {
    history,
  } = props;
  return (
    <div>
      <Modal isOpen centered>
        <ModalHeader><div className="text-center">Lý do từ chối</div></ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md={12}>
              <h6>
                <b>Loại lý do:</b>
              </h6>
              <>
                <FormGroup check inline style={{ width: '100%' }}>
                  <Label check>
                    <Input type="checkbox" />
                    {' '}
Thông tin chung không đúng
                  </Label>
                </FormGroup>
                <FormGroup check inline style={{ width: '100%' }}>
                  <Label check>
                    <Input type="checkbox" />
                    {' '}
Thông tin phí không đúng
                  </Label>
                </FormGroup>
                <FormGroup check inline style={{ width: '100%' }}>
                  <Label check>
                    <Input type="checkbox" />
                    {' '}
Thông tin chi tiết phí không đúng
                  </Label>
                </FormGroup>
                <FormGroup check inline style={{ width: '100%' }}>
                  <Label check>
                    <Input type="checkbox" />
                    {' '}
                    Khác
                  </Label>
                </FormGroup>
              </>
              <h6>
                <b>Nội dung chi tiết lỗi (nếu có)</b>
              </h6>
              <textarea placeholder="" maxLength={150} className="form-control" style={{ height: '90px' }} />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary">
            <i className="fa fa-close" />
            Quay lại
          </Button>
          {' '}
          <Button color="primary">
            <i className="fa fa-check" />
            Gửi thông tin
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Refuse.propTypes = {
  history: PropTypes.object,
};

Refuse.defaultProps = {
  history: {},
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Refuse));
