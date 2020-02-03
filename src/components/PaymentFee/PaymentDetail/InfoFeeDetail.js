import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Label, Form, Row, Collapse, Card, CardBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  loadFolowCal, loadCalculationRules, loadCalculationForm,
} from '../../../store/actions/actionMerchantCommon';
import './index.scss';
import { getTypeNameFee } from '../../../utils/commonFunction';

class InfoFeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
    };
    this.handOpenInfo = this.handOpenInfo.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      dataObject, folowCal, calculationRules, calculationForm,
    } = props;
    return {
      dataObject, folowCal, calculationRules, calculationForm,
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line no-shadow
      loadFolowCal, loadCalculationRules, loadCalculationForm,
    } = this.props;
    loadFolowCal();
    loadCalculationRules();
    loadCalculationForm();
  }

  handOpenInfo() {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  }

  render() {
    const {
      isOpenInfo, dataObject, folowCal, calculationRules, calculationForm,
    } = this.state;
    let optionsFolowCal = null;
    optionsFolowCal = folowCal && folowCal.map(
      (folowcal, index) => (
        {
          code: parseInt(folowcal.code, 10),
          description: folowcal.description,
        }
      ),
    );
    const folowCalDisplay = dataObject
      ? getTypeNameFee(optionsFolowCal, dataObject && dataObject.folowCal) : 0;

    let optionsCalculationRules = null;
    optionsCalculationRules = calculationRules && calculationRules.map(
      (calculationrule, index) => (
        {
          code: parseInt(calculationrule.code, 10),
          description: calculationrule.description,
        }
      ),
    );
    const calculationRulesDisplay = dataObject
      ? getTypeNameFee(optionsCalculationRules, dataObject && dataObject.calculationRules) : 0;

    let optionsCalculationForm = null;
    optionsCalculationForm = calculationForm && calculationForm.map(
      (calculationform, index) => (
        {
          code: parseInt(calculationform.code, 10),
          description: calculationform.description,
        }
      ),
    );
    const calculationFormDisplay = dataObject
      ? getTypeNameFee(optionsCalculationForm, dataObject && dataObject.calculationForm) : 0;

    return (
      <div className="page-content">
        <div className="page-content-area">
          <Form className="form-horizoral">
            <Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <h4 className="widget-title lighter">CHI TIẾT MỨC PHÍ</h4>
                    <div className="widget-toolbar">
                      <span data-action="Collapse">
                        {isOpenInfo ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenInfo} className="show-information">
                    <Card>
                      <CardBody>
                        <div className="widget-body">
                          <div className="widget-main">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Mã phí</Label>
                                  <div className="col-sm-8">
                                    <Label><b>{dataObject && dataObject.feeCode}</b></Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Tên mức phí</Label>
                                  <div className="col-sm-8">
                                    <Label><b>{dataObject && dataObject.feeName}</b></Label>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <Label className="col-sm-4 control-label p_top">Thuế GTGT</Label>
                                  <div className="col-sm-8">
                                    <Label><b>{dataObject && dataObject.vatTax}</b></Label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <Label className="col-sm-12 control-label p_top"><b>Thông tin công thức phí</b></Label>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Hình thức tính</Label>
                                  <div className="col-sm-8">
                                    <Label><b>{calculationFormDisplay}</b></Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Quy luật tính</Label>
                                  <div className="col-sm-8">
                                    <Label><b>{calculationRulesDisplay}</b></Label>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <Label className="col-sm-4 control-label p_top">Tính theo</Label>
                                  <div className="col-sm-8">
                                    <Label><b>{folowCalDisplay}</b></Label>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                  <th rowSpan={0} colSpan={1} className="text-center">Theo phần trăm</th>
                                  <th rowSpan={2} className="text-center" colSpan={1}>Theo số tiền</th>
                                  <th rowSpan={2} className="text-center" colSpan={1}>Theo phần trăm</th>
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
                                  <td>
                                    {dataObject && dataObject.feeFlatType === 0
                                      ? dataObject.feeFlat : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.feeFlatType === 1
                                      ? dataObject.feeFlat : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.feePaymentType === 0
                                      ? dataObject.feePayment : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.feePaymentType === 1
                                      ? dataObject.feePayment : 0}
                                  </td>
                                  <td>
                                    {(dataObject && dataObject.calculationForm === 1)
                                        || (dataObject && dataObject.calculationForm === 0)
                                      ? dataObject.feeMinHandle : 0}
                                  </td>
                                  <td>
                                    {(dataObject && dataObject.calculationForm === 1)
                                        || (dataObject && dataObject.calculationForm === 0)
                                      ? dataObject.feeMaxHandle : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.calculationForm === 2
                                      && (dataObject.calculationRules === 1
                                      || dataObject.calculationRules === 3)
                                      ? dataObject.feeMinHandle : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.calculationForm === 2
                                      && (dataObject.calculationRules === 1
                                      || dataObject.calculationRules === 3)
                                      ? dataObject.feeMaxHandle : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.calculationForm === 2
                                      && dataObject.calculationRules === 2
                                      ? dataObject.feeMinHandle : 0}
                                  </td>
                                  <td>
                                    {dataObject && dataObject.calculationForm === 2
                                      && dataObject.calculationRules === 2
                                      ? dataObject.feeMaxHandle : 0}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataObject: state.merchantDetail.dataObject,
  folowCal: state.merchantCommon.folowCal,
  calculationRules: state.merchantCommon.calculationRules,
  calculationForm: state.merchantCommon.calculationForm,
});

const mapDispatchToProps = (dispatch) => ({
  loadFolowCal: () => dispatch(loadFolowCal()),
  loadCalculationRules: () => dispatch(loadCalculationRules()),
  loadCalculationForm: () => dispatch(loadCalculationForm()),
});

InfoFeeDetail.propTypes = {
  dataObject: PropTypes.object,
  folowCal: PropTypes.array,
  calculationRules: PropTypes.array,
  calculationForm: PropTypes.array,
  loadFolowCal: PropTypes.func.isRequired,
  loadCalculationRules: PropTypes.func.isRequired,
  loadCalculationForm: PropTypes.func.isRequired,
};

InfoFeeDetail.defaultProps = {
  dataObject: () => {},
  folowCal: [],
  calculationRules: [],
  calculationForm: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoFeeDetail));
