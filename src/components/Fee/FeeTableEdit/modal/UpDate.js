import React, { Component } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import InfoGeneral from '../InfoGeneral';
import CaculationFee from '../CaculationFee';
import { editModalFee } from '../../../../apis/fee-manager';
import { notifyToastEditFee } from '../../../../utils/constants';
import { checkUpdateClassifySigningOrNot, validateFeeHandle, checkFeeTax } from '../../FeeTableAdd/validation';

// eslint-disable-next-line react/prefer-stateless-function
class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCaculationFee: '',
      dataGeneralFee: '',
      isUpdate: true,
      errorFeeHandle: null,
      errorCheckFeeTax: null,
      feePaymentPercent: null,
      feeFlatPercent: null,

    };
  }

  static getDerivedStateFromProps(props, state) {
    return { isShowModalUpdate: props.isShowModalUpdate };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      dataGeneralFee, isUpdate, errorFeeHandle, errorCheckFeeTax, feePaymentPercent, feeFlatPercent,
    } = this.state;
    const { isShowModalUpdate } = this.props;
    if (dataGeneralFee.additionalSigning !== nextState.dataGeneralFee.additionalSigning) {
      return true;
    } if (isShowModalUpdate !== nextProps.isShowModalUpdate) {
      return true;
    }
    if (isUpdate !== nextState.isUpdate) {
      return true;
    }
    if (errorFeeHandle !== nextState.errorFeeHandle) {
      return true;
    }

    if (errorCheckFeeTax !== nextState.errorCheckFeeTax) {
      return true;
    }
    if (feeFlatPercent !== nextState.feeFlatPercent) {
      return true;
    }
    if (feePaymentPercent !== nextState.feePaymentPercent) {
      return true;
    }
    return false;
  }

  tranfersCaculationFee = (data) => {
    this.setState({
      dataCaculationFee: data,
    });
  };

  tranfersDataGeneralFee = (data) => {
    this.setState({
      dataGeneralFee: data,
    });
  };

  callApiUpdate = async () => {
    try {
      const { dataCaculationFee, dataGeneralFee } = this.state;
      const { updateTableByEdit } = this.props;
      const { tdata } = this.props;
      if (!checkUpdateClassifySigningOrNot(tdata.classifySigning, dataGeneralFee.classifySigning, tdata.status)) {
        this.setState({ isUpdate: false });
      } else if (validateFeeHandle(dataCaculationFee.feeMinHandle, dataCaculationFee.feeMaxHandle)) {
        this.setState({
          errorFeeHandle: 'Giá trị giới hạn không hợp lệ',
        });
      } else if (!checkFeeTax(dataGeneralFee.vatTax)) {
        this.setState({
          errorCheckFeeTax: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
        });
      } else if (!checkFeeTax(dataCaculationFee.feeFlat) && dataCaculationFee.feeFlatType === 1) {
        this.setState({
          feeFlatPercent: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
        });
      } else if (!checkFeeTax(dataCaculationFee.feePayment) && dataCaculationFee.feePaymentType === 1) {
        this.setState({
          feePaymentPercent: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
        });
      } else {
        const data = await editModalFee({
          calculationForm: dataCaculationFee.calculationForm,
          calculationRules: dataCaculationFee.calculationRules,
          feeFlat: dataCaculationFee.feeFlat,
          feeFlatType: dataCaculationFee.feeFlatType,
          feeMaxHandle: dataCaculationFee.feeMaxHandle,
          feeMinHandle: dataCaculationFee.feeMinHandle,
          feePayment: dataCaculationFee.feePayment,
          feePaymentType: dataCaculationFee.feePaymentType,
          folowCal: dataCaculationFee.folowCal,
          feeName: dataGeneralFee.feeName,
          vatTax: dataGeneralFee.vatTax,
          classifySigning: dataGeneralFee.classifySigning,
          feeType: dataGeneralFee.feeType,
          modifyUser: 'admin',
          additionalSigning: dataGeneralFee.additionalSigning,
          feeCode: tdata.feeCode,
          status: tdata.status,
        });
        if (data.code === '00') {
          toastr.success(`${notifyToastEditFee.EDIT_FEE_SUCCESS}`, `${notifyToastEditFee.NOTIFY_SUCCESS}`, { timeOut: 3000 });
          const { toggleUpdateFee } = this.props;
          updateTableByEdit();
          toggleUpdateFee();
        } else {
          toastr.warning(`${data.message}`, `${notifyToastEditFee.NOTIFY_WARNING}`, { timeOut: 3000 });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { toggleUpdateFee, isShowModalUpdate, tdata } = this.props;
    const {
      dataGeneralFee, isUpdate, errorFeeHandle, errorCheckFeeTax,
      feePaymentPercent, feeFlatPercent,
    } = this.state;

    const toggle = () => toggleUpdateFee();
    return (
      <div>
        <Modal isOpen={isShowModalUpdate} toggle={toggle} size="lg" style={{ maxWidth: '1600px', width: '80%' }}>
          <ModalHeader toggle={toggle}>Bảng chỉnh sửa</ModalHeader>
          <ModalBody>
            <InfoGeneral
              tdata={tdata}
              tranfersDataGeneralFee={this.tranfersDataGeneralFee}
              isUpdate={isUpdate}
              errorCheckFeeTax={errorCheckFeeTax}
            />
            <CaculationFee
              tdata={tdata}
              tranfersCaculationFee={this.tranfersCaculationFee}
              additionalSigning={dataGeneralFee.additionalSigning}
              errorFeeHandle={errorFeeHandle}
              feeFlatPercent={feeFlatPercent}
              feePaymentPercent={feePaymentPercent}
            />
            <span className="form-text text-danger" style={{ width: '100%', textAlign: 'center' }}>{errorFeeHandle}</span>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.callApiUpdate}>Cập nhật</Button>
            {' '}
            <Button color="secondary" onClick={toggle}>Quay lại</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalUpdate);
ModalUpdate.propTypes = {
  isShowModalUpdate: PropTypes.bool.isRequired,
  toggleUpdateFee: PropTypes.func.isRequired,
  tdata: PropTypes.object.isRequired,
  updateTableByEdit: PropTypes.func.isRequired,
};
