import React, { Component } from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getTypeNameFee } from '../../../utils/commonFunction';

class ItemFee extends Component {
  // eslint-disable-next-line class-methods-use-this
  displayTypeFee(type) {
    if (type === 0) {
      // eslint-disable-next-line no-param-reassign
      type = 'Theo số tiền';
    } else {
      // eslint-disable-next-line no-param-reassign
      type = 'Theo phần trăm';
    }
    return type;
  }


  render() {
    const { item } = this.props;

    const listCalculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM'));
    const listCalculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES'));
    const listFolowCal = JSON.parse(localStorage.getItem('FOLOW_CAL'));

    const itemCalculationForm = getTypeNameFee(listCalculationForm, item.calculationForm);
    const itemCalculationRules = getTypeNameFee(listCalculationRules, item.calculationRules);
    const itemFolowCall = getTypeNameFee(listFolowCal, item.folowCal);
    const feeFlatType = this.displayTypeFee(item.feeFlatType);
    const feePaymentType = this.displayTypeFee(item.feePaymentType);
    return (
      <div className="box-seperate">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <Label className="col-sm-4 control-label p_top">Mã phí</Label>
              <div className="col-sm-8">
                <Label><b>{item.feeCode}</b></Label>
              </div>
            </div>
            <div className="form-group">
              <Label className="col-sm-4 control-label p_top">Tên mức phí</Label>
              <div className="col-sm-8">
                <Label><b>{item.feeName}</b></Label>
              </div>
            </div>
            <div className="form-group">
              <Label className="col-sm-4 control-label p_top">Thuế GTGT</Label>
              <div className="col-sm-8">
                <Label><b>{item.vatTax ? `${item.vatTax}%` : 0}</b></Label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <Label className="col-sm-12 control-label p_top"><b>Thông tin công thức phí</b></Label>
            </div>
            <div className="form-group">
              <Label className="col-sm-4 control-label p_top">HÌnh thức tính</Label>
              <div className="col-sm-8">
                <Label><b>{itemCalculationForm}</b></Label>
              </div>
            </div>
            <div className="form-group">
              <Label className="col-sm-4 control-label p_top">Quy luật tính</Label>
              <div className="col-sm-8">
                <Label><b>{item.calculationForm === 2 ? itemCalculationRules : ''}</b></Label>
              </div>
            </div>
            <div className="form-group">
              <Label className="col-sm-4 control-label p_top">Tính theo</Label>
              <div className="col-sm-8">
                <Label><b>{item.calculationForm === 2 ? itemFolowCall : ''}</b></Label>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan={1} className="text-center" bgcolor="#ececec">Phí cố định</th>
              <th colSpan={3} className="text-center" bgcolor="#ececec">Phí xử lý thanh toán</th>
              <th colSpan={2} className="text-center" bgcolor="#ececec">Giá trị giao dịch</th>
              <th colSpan={2} className="text-center" bgcolor="#ececec">Số lượng giao dịch</th>
            </tr>
            <tr>
              <th rowSpan={0} colSpan={1} className="text-center">{feeFlatType}</th>
              <th rowSpan={2} className="text-center" colSpan={1}>{feePaymentType}</th>
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
              <td>{item.feeFlat}</td>
              <td>{item.feePayment}</td>
              <td>{item.feeMinHandle}</td>
              <td>{item.feeMaxHandle}</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default ItemFee;
ItemFee.propTypes = {
  item: PropTypes.object,
};
ItemFee.defaultProps = {
  item: {},
};
