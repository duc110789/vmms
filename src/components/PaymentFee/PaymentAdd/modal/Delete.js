/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import CONST_VARIABLE from '../../../../utils/constants';
import { removeMccNational } from '../../../../store/actions/actionMerchantCommon';

const ModalDeleteFee = (props) => {
  const {
    toggleDeleteFee,
    isShowModalDelete,
    itemDelete,
    removeMccNational,
  } = props;
  const toggle = () => toggleDeleteFee();
  const deleteFeeItem = async () => {
    await removeMccNational(itemDelete);
    toggle();
  };

  return (
    <div>
      <Modal isOpen={isShowModalDelete} centered toggle={toggle}>
        <ModalHeader toggle={toggle}><div className="text-center">Thông báo</div></ModalHeader>
        <ModalBody>
          <div className="text-center">{CONST_VARIABLE.DELETE_DATA_BANKS}</div>
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


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
  removeMccNational: (data) => dispatch(removeMccNational(data)),
});

ModalDeleteFee.propTypes = {
  isShowModalDelete: PropTypes.bool.isRequired,
  toggleDeleteFee: PropTypes.func,
  itemDelete: PropTypes.object,
  removeMccNational: PropTypes.func,
};

ModalDeleteFee.defaultProps = {
  toggleDeleteFee: () => {},
  itemDelete: {},
  removeMccNational: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteFee);
