/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import CONST_VARIABLE from '../../../../utils/constants';
import { storeListMerchantLocal } from '../../../../store/actions/actionAddMerchant';

const ModalDeleteFee = (props) => {
  const {
    toggleDeleteFee,
    isShowModalDelete,
    itemDelete,
    listMerchantLocal,
    storeListMerchantLocal,
  } = props;
  const toggle = () => toggleDeleteFee();

  const deleteFeeItem = async () => {
    const newDataTable = listMerchantLocal.filter((item) => item.value !== itemDelete);
    await storeListMerchantLocal(newDataTable);
    toggle();
  };

  return (
    <div>
      <Modal isOpen={isShowModalDelete} centered toggle={toggle}>
        <ModalHeader toggle={toggle}><div className="text-center">Thông báo</div></ModalHeader>
        <ModalBody>
          <div className="text-center">{CONST_VARIABLE.DELETE_DATA_MERCHANT}</div>
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

ModalDeleteFee.propTypes = {
  isShowModalDelete: PropTypes.bool.isRequired,
  toggleDeleteFee: PropTypes.func,
  itemDelete: PropTypes.string,
  listMerchantLocal: PropTypes.array,
  storeListMerchantLocal: PropTypes.func,


};

ModalDeleteFee.defaultProps = {
  toggleDeleteFee: () => {},
  itemDelete: '',
  listMerchantLocal: [],
  storeListMerchantLocal: () => {},

};

const mapStateToProps = (state, ownProps) => ({
  listMerchantLocal: state.addMerchant.listMerchantLocal,
});

const mapDispatchToProps = (dispatch) => ({
  storeListMerchantLocal: (data) => dispatch(storeListMerchantLocal(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteFee);
