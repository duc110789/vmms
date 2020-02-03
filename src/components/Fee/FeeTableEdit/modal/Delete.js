import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import CONST_VARIABLE from '../../../../utils/constants';
import { postDeleteFeeCode } from '../../../../apis/fee-manager';


const ModalDeleteFee = (props) => {
  const {
    toggleDeleteFee,
    isShowModalDelete,
    feeCode,
    onDeleteFee,
  } = props;
  const toggle = () => toggleDeleteFee();

  const deleteFeeItem = async () => {
    const params = {
      feeCode,
    };
    await postDeleteFeeCode(params);
    onDeleteFee();
    toggle();
  };

  return (
    <div>
      <Modal isOpen={isShowModalDelete} centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
        <ModalBody>
          <p className="text-center">{CONST_VARIABLE.DELETE_DATA}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fa fa-close" />
            Hủy
          </Button>
          {' '}
          <Button color="primary" onClick={deleteFeeItem}>
            <i className="fa fa-check" />
            Đồng ý
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalDeleteFee;
ModalDeleteFee.propTypes = {
  isShowModalDelete: PropTypes.bool.isRequired,
  toggleDeleteFee: PropTypes.func,
  feeCode: PropTypes.string,
  onDeleteFee: PropTypes.func,
};

ModalDeleteFee.defaultProps = {
  toggleDeleteFee: function name(params) {
    return params;
  },
  onDeleteFee: function name(params) {
    return params;
  },
  feeCode: '',
};
