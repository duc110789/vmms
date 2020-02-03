/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Label, FormGroup, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveApproveListMerchant } from '../../../../store/actions/actionApproveMerchant';

const Refuse = (props) => {
  const {
    toggleModalDenied,
    isShowModalDenied,
    itemApprove,
    arrDeniedDesc,
    saveApproveListMerchant,
    history,
  } = props;

  const [infoCodeDenied, setInfoCodeDenied] = useState(0);
  const [noteDenied, setNoteDenied] = useState(0);
  const toggle = () => toggleModalDenied();
  const deniedFeeMerchant = async () => {
    try {
      if (infoCodeDenied !== 0) {
        const data = {
          id: parseInt(itemApprove, 10),
          approvedUser: 'string',
          deniedDesc: infoCodeDenied,
          deniedNote: noteDenied,
          action: 'DENIED',
        };
        await saveApproveListMerchant(data);
        toggle();
        history.goBack();
      } else {
        alert('Hãy chọn một lí do từ chối');
      }
    } catch (e) {
      console.log(e);
      alert('Có lỗi trong quá trình xét duyệtCó lỗi trong quá trình xét duyệt');
    }
  };

  const handleChangeCodeDenied = (event) => {
    setInfoCodeDenied(parseInt(event.target.value, 10));
  };

  const handleChangeDescription = (event) => {
    setNoteDenied(event.target.value);
  };

  return (
    <div>
      <Modal isOpen={isShowModalDenied} centered toggle={toggle}>
        <ModalHeader toggle={toggle}><div className="text-center">Lý do từ chối</div></ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md={12}>
              <h6>
                <b>Loại lý do:</b>
              </h6>
              <>
                {
                  arrDeniedDesc.map((item) => (
                    <FormGroup check key={item.code}>
                      <Label key={item.key}>
                        <Input
                          type="radio"
                          name="radio-denied"
                          onChange={handleChangeCodeDenied}
                          style={{ margin: '5px 0 0 -1.25rem' }}
                          value={item.code}
                        />
                        {item.description}
                      </Label>
                    </FormGroup>
                  ))
                }
              </>
              <h6>
                <b>Nội dung chi tiết lỗi (nếu có)</b>
              </h6>
              <textarea placeholder="" maxLength={150} className="form-control" style={{ height: '90px' }} onChange={handleChangeDescription} />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fa fa-close" />
            Quay lại
          </Button>
          {' '}
          <Button color="primary" onClick={deniedFeeMerchant}>
            <i className="fa fa-check" />
            Gửi thông tin
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Refuse.propTypes = {
  isShowModalDenied: PropTypes.bool.isRequired,
  toggleModalDenied: PropTypes.func,
  itemApprove: PropTypes.string,
  arrDeniedDesc: PropTypes.array,
  saveApproveListMerchant: PropTypes.func,
  history: PropTypes.object,
};

Refuse.defaultProps = {
  toggleModalDenied: () => {},
  itemApprove: '',
  arrDeniedDesc: [],
  saveApproveListMerchant: () => {},
  history: {},
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
  saveApproveListMerchant: (data) => dispatch(saveApproveListMerchant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Refuse));
