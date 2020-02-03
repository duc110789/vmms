import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import  thousandsSeparators from '../../utils/commonFunction';
// eslint-disable-next-line react/prefer-stateless-function

class PopUpDetail extends Component {
  thousandsSeparators = (num) => {
    const num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  }

  render() {
    const {
      modalDetail, handleSetModalDetail, dataDetailFromTable,
    } = this.props;
    return (
      <div>
        <Modal isOpen={modalDetail} size="lg" style={{ maxWidth: '1600px', width: '80%' }}>
          <ModalHeader>Chi tiết bảng phí</ModalHeader>
          <ModalBody>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan={2} className="text-center" bgcolor="#ececec">Phí cố định</th>
                  <th colSpan={4} className="text-center" bgcolor="#ececec">Phí xử lý thanh toán</th>
                  <th colSpan={2} className="text-center" bgcolor="#ececec">Giá trị giao dịch</th>
                  <th colSpan={2} className="text-center" bgcolor="#ececec">Số lượng giao dịch</th>
                </tr>
                <tr>
                  <th rowSpan={0} colSpan={1} className="text-center">Theo số tiền</th>
                  <th rowSpan={0} className="text-center" colSpan={1}>Theo phần trăm</th>
                  <th rowSpan={0} colSpan={1} className="text-center">Theo số tiền</th>
                  <th rowSpan={0} className="text-center" colSpan={1}>Theo phần trăm</th>
                  <th colSpan={2} className="text-center">Giới hạn phí thanh toán</th>
                  <th rowSpan={2} className="text-center">Từ</th>
                  <th rowSpan={2} className="text-center">Đến</th>
                  <th rowSpan={2} className="text-center">Từ</th>
                  <th rowSpan={2} className="text-center">Đến</th>
                </tr>
                <tr>
                  <th className="text-center">Tối thiểu</th>
                  <th className="text-center">Tối đa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>{dataDetailFromTable.feeFlatType === 0 ? this.thousandsSeparators(dataDetailFromTable.feeFlat) : null}</td>
                  <td>{dataDetailFromTable.feeFlatType === 1 ? dataDetailFromTable.feeFlat : null}</td>
                  <td>{dataDetailFromTable.feePaymentType === 0 ? this.thousandsSeparators(dataDetailFromTable.feePayment) : null}</td>
                  <td>{dataDetailFromTable.feePaymentType === 1 ? dataDetailFromTable.feePayment : null}</td>
                  <td>{dataDetailFromTable.calculationForm === 1 ? this.thousandsSeparators(dataDetailFromTable.feeMinHandle) : null}</td>
                  <td>{dataDetailFromTable.calculationForm === 1 ? this.thousandsSeparators(dataDetailFromTable.feeMaxHandle) : null}</td>
                  <td>{(dataDetailFromTable.calculationRules === 1 || dataDetailFromTable.calculationRules === 3) && dataDetailFromTable.calculationForm === 2 ? this.thousandsSeparators(dataDetailFromTable.feeMinHandle) : null}</td>
                  <td>{(dataDetailFromTable.calculationRules === 1 || dataDetailFromTable.calculationRules === 3) && dataDetailFromTable.calculationForm === 2 ? this.thousandsSeparators(dataDetailFromTable.feeMaxHandle) : null}</td>
                  <td>{dataDetailFromTable.calculationRules === 2 && dataDetailFromTable.calculationForm === 2 ? this.thousandsSeparators(dataDetailFromTable.feeMinHandle) : null}</td>
                  <td>{dataDetailFromTable.calculationRules === 2 && dataDetailFromTable.calculationForm === 2 ? this.thousandsSeparators(dataDetailFromTable.feeMaxHandle) : null}</td>
                </tr>
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter className="text-center">
            <Button color="secondary" onClick={handleSetModalDetail}>Quay lại</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
PopUpDetail.propTypes = {
  modalDetail: PropTypes.bool.isRequired,
  handleSetModalDetail: PropTypes.func.isRequired,
  dataDetailFromTable: PropTypes.object.isRequired,


};

export default PopUpDetail;
