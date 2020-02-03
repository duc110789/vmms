import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  postFeeLock,
  postFeeUnLock,
} from '../../../apis/fee-manager';

const ModalLockFee = (props) => {
  const {
    activeModal,
    setActiveModal,
    itemModal,
    contentNotice,
    isLock,
    onGetDataNew,
  } = props;
  const toggle = () => setActiveModal(!activeModal);

  const lockFeeItem = async () => {
    const params = {
      feeType: itemModal.feeType,
      classifySigning: itemModal.classifySigning,
      status: itemModal.status,
    };
    if (isLock === '1') {
      await postFeeLock(params);
    } else {
      await postFeeUnLock(params);
    }
    onGetDataNew();
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
  itemModal: PropTypes.object,
  contentNotice: PropTypes.string,
  isLock: PropTypes.string,
  onGetDataNew: PropTypes.func,
};

ModalLockFee.defaultProps = {
  activeModal: false,
  setActiveModal: function name(params) {
    return params;
  },
  itemModal: {},
  contentNotice: '',
  isLock: '1',
  onGetDataNew: function name(params) {
    return params;
  },
};
