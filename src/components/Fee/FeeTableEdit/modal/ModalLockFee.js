import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  postLockFeeCode,
  postUnLockFeeCode,
} from '../../../../apis/fee-manager';

const ModalLockFee = (props) => {
  const {
    activeModal,
    setActiveModal,
    feeCode,
    contentNotice,
    isLock,
    onGetFeeCode,
  } = props;
  const toggle = () => setActiveModal(!activeModal);

  const lockFeeItem = async () => {
    let params = {};
    params = {
      feeCode,
    };
    if (isLock === '1') {
      await postLockFeeCode(params);
    } else {
      await postUnLockFeeCode(params);
    }
    onGetFeeCode();
    toggle();
  };

  return (
    <div>
      <Modal isOpen={activeModal} centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
        <ModalBody><p className="text-center">{contentNotice}</p></ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fa fa-close" />
            Hủy
          </Button>
          {' '}
          <Button color="primary" onClick={lockFeeItem}>
            <i className="fa fa-check" />
            Đồng ý
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalLockFee;
ModalLockFee.propTypes = {
  activeModal: PropTypes.bool,
  setActiveModal: PropTypes.func,
  feeCode: PropTypes.string,
  contentNotice: PropTypes.string,
  isLock: PropTypes.string,
  onGetFeeCode: PropTypes.func,
};

ModalLockFee.defaultProps = {
  activeModal: false,
  setActiveModal: function name(params) {
    return params;
  },
  feeCode: '',
  contentNotice: '',
  isLock: '1',
  onGetFeeCode: function name(params) {
    return params;
  },
};
