/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Input as RInput, FormGroup, Label,
} from 'reactstrap';
import NumberFormat from 'react-number-format';
import Creatable from 'react-select/creatable';
import { categoryTime } from '../../../utils/constants';

class CaculationFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculationForm: 'Theo công thức',
      feeFlatType: 0,
      calculationRules: 0,
      feePaymentType: 0,
      folowCal: 0,
      feeFlat: 0,
      feePayment: 0,
      feeMinHandle: 0,
      feeMaxHandle: 0,
    };
  }

  componentDidMount() {
    const { tdata } = this.props;
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM')).map((formCacultion) => ({ value: formCacultion.description, label: formCacultion.description }));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES')).map((ruleCaculation) => ({ value: ruleCaculation.description, label: ruleCaculation.description }));
    if (tdata) {
      this.setState({
        calculationForm: getCaculationForm[tdata.calculationForm - 1].value,
        feeFlatType: tdata.feeFlatType,
        calculationRules: getCaculationRules[tdata.calculationRules - 1].value,
        feePaymentType: tdata.feePaymentType,
        folowCal: tdata.folowCal === 1 ? 'Ngày' : (tdata.folowCal === 2 ? 'Tuần' : 'Tháng'),
        feeFlat: tdata.feeFlat.toString(),
        feePayment: tdata.feePayment.toString(),
        feeMinHandle: tdata.feeMinHandle,
        feeMaxHandle: tdata.feeMaxHandle,
      });
    }
  }

  componentDidUpdate() {
    const { tranfersCaculationFee } = this.props;
    const {
      calculationForm,
      feeFlatType,
      calculationRules,
      feePaymentType,
      folowCal,
      feeFlat,
      feePayment,
      feeMinHandle,
      feeMaxHandle,
    } = this.state;
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM'));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES'));
    const sendingData = {
      calculationForm: (calculationForm === getCaculationForm[0].description || calculationForm === '')
        ? parseInt(getCaculationForm[0].code, 10) : parseInt(getCaculationForm[1].code, 10),
      calculationRules: calculationRules === getCaculationRules[0].description
        ? parseInt(getCaculationRules[0].code, 10)
        : (calculationRules === getCaculationRules[1].description
          ? parseInt(getCaculationRules[1].code, 10)
          : (calculationRules === getCaculationRules[2].description
            ? parseInt(getCaculationRules[2].code, 10) : 1)),
      folowCal: folowCal === 'Ngày' ? 1 : (folowCal === 'Tuần' ? 2 : (folowCal === 'Tháng' ? 3 : 3)),
      feeFlatType,
      feePaymentType,
      feeFlat: typeof feeFlat === 'string' && feeFlat.includes('%') === true ? parseFloat(feeFlat.replace(/,/g, '.')) : (typeof feeFlat === 'string' && feeFlat !== '' && feeFlat.includes('%') === false ? parseFloat(feeFlat.replace(/,/g, '')) : feeFlat),
      feePayment: typeof feePayment === 'string' && feePayment.includes('%') === true ? parseFloat(feePayment.replace(/,/g, '.')) : (typeof feePayment === 'string' && feePayment.includes('%') === false ? parseFloat(feePayment.replace(/,/g, '')) : feePayment),
      feeMinHandle: feeMinHandle !== 0 && typeof feeMinHandle === 'string' ? parseFloat(feeMinHandle.replace(/,/g, '')) : feeMinHandle,
      feeMaxHandle: feeMaxHandle !== 0 && typeof feeMaxHandle === 'string' ? parseFloat(feeMaxHandle.replace(/,/g, '')) : feeMaxHandle,

    };
    tranfersCaculationFee(sendingData);
  }

  inputHandleChange = (event, controlName) => {
    if (controlName === 'feeFlatType') {
      this.setState({
        [controlName]: parseInt(event.target.value, 10),
        feeFlat: 0,
      });
    } else if (controlName === 'feePaymentType') {
      this.setState({
        [controlName]: parseInt(event.target.value, 10),
        feePayment: 0,
      });
    } else {
      this.setState({
        [controlName]: event.target.value,
      });
    }
  }

  feeMinHandleChange = (event) => {
    this.inputHandleChange(event, 'feeMinHandle');
  }

  feeMaxHandleChange = (event) => {
    this.inputHandleChange(event, 'feeMaxHandle');
  }

  feeFlatTypeHandleChange = (event) => {
    this.inputHandleChange(event, 'feeFlatType');
  }

  feePaymentTypeHandleChange = (event) => {
    this.inputHandleChange(event, 'feePaymentType');
  }

  feeFlatHandleChange = (event) => {
    this.inputHandleChange(event, 'feeFlat');
  }

  feePaymentHandleChange = (event) => {
    this.inputHandleChange(event, 'feePayment');
  }

  render() {
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM')).map((caculation) => ({ value: caculation.description, label: caculation.description }));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES')).map((ruleCacu) => ({ value: ruleCacu.description, label: ruleCacu.description }));
    const {
      calculationForm,
      feeFlatType,
      calculationRules,
      feePaymentType,
      folowCal,
      feeFlat,
      feePayment,
      feeMinHandle,
      feeMaxHandle,
    } = this.state;

    const {
      tdata, additionalSigning, feeFlatPercent, feePaymentPercent,
    } = this.props;
    return (
      <div className="border gp-add-fee">
        <h5 className="mb-3 text-left">Công thức phí</h5>
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="5" className="label-left">
                <Label htmlFor="code">Công thức phí:</Label>
              </Col>
              <Col lg="7">
                <Creatable
                  options={getCaculationForm}
                  isMulti={false}
                  onChange={(selectedOption) => this.setState({
                    calculationForm: selectedOption.value,
                  })}
                  value={{
                    value: calculationForm,
                    label: (calculationForm || 'Theo công thức'),
                  }}
                  isDisabled={!!(tdata.status === 1 && additionalSigning === 0)}

                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        {
        calculationForm === 'Theo bậc thang' ? (
          <Row>
            <Col md="6">
              <FormGroup row>
                <Col lg="5" className="label-left">
                  <Label htmlFor="code">Quy Luật Tính</Label>
                </Col>
                <Col lg="7">
                  <Creatable
                    options={getCaculationRules}
                    isMulti={false}
                    placeholder="Tất cả"
                    onChange={(selectedOption) => this.setState({
                      calculationRules: selectedOption.value,
                    })}
                    value={{
                      value: calculationRules,
                      label: (calculationRules || 'Tất cả'),
                    }}
                    isDisabled={!!(tdata.status === 1 && additionalSigning === 0)}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Col lg="7">
                  <Creatable
                    options={categoryTime}
                    isMulti={false}
                    placeholder="Tháng"
                    onChange={(selectedOption) => this.setState({
                      folowCal: selectedOption.value,
                    })}
                    value={{
                      value: folowCal,
                      label: (folowCal || 'Tháng'),
                    }}
                    isDisabled={calculationRules === 'Giá trị giao dịch' || (tdata.status === 1 && additionalSigning === 0)}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
        ) : (<div />)
      }
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="12" className="label-left" style={{ textAlign: 'left' }}>
                <Label htmlFor="code" className="font-weight-bold">Phí cố định:</Label>
              </Col>
            </FormGroup>
            <FormGroup className="account-settings-pointer" row>
              <Col lg="5" style={{ textAlign: 'left' }}>
                <Label className="permission-title">
                  <RInput
                    type="radio"
                    value={0}
                    name="permissions[]"
                    onChange={this.feeFlatTypeHandleChange}
                    checked={feeFlatType === 0}
                  />
                Theo số tiền
                </Label>
              </Col>
              <Col lg="7">
                <NumberFormat
                  maxLength="10"
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  name="code"
                  onChange={this.feeFlatHandleChange}
                  thousandSeparator
                  value={feeFlatType === 0 ? feeFlat : ''}
                  disabled={feeFlatType !== 0}
                  allowNegative={false}
                />
              </Col>
            </FormGroup>
            <FormGroup className="account-settings-pointer" row>
              <Col lg="5" style={{ textAlign: 'left' }}>
                <Label className="permission-title">
                  <RInput
                    type="radio"
                    value={1}
                    name="permissions[]"
                    onChange={this.feeFlatTypeHandleChange}
                    checked={feeFlatType === 1}
                  />
                Theo phần trăm
                </Label>
              </Col>
              <Col lg="7">
                <NumberFormat
                  allowNegative={false}
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  name="code"
                  onChange={this.feeFlatHandleChange}
                  disabled={feeFlatType !== 1}
                  value={feeFlatType === 1 ? feeFlat : null}
                  maxLength={5}
                />
                <div className="input-group-ic">%</div>
                <span className="form-text text-danger" style={{ position: 'absolute', zIndex: '100', top: '20px' }}>{feeFlatPercent}</span>
              </Col>
            </FormGroup>
            {
            calculationForm === 'Theo công thức' ? (
              <FormGroup row>
                <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                  <Label htmlFor="code" className="font-weight-bold">Phí xử lý tối thiếu:</Label>
                </Col>
                <Col lg="7">
                  <NumberFormat
                    placeholder="VND"
                    label="Fee Code"
                    type="text"
                    className="form-control"
                    onChange={this.feeMinHandleChange}
                    thousandSeparator
                    prefix=""
                    value={feeMinHandle}
                    allowNegative={false}
                    maxLength={10}
                  />
                </Col>
              </FormGroup>
            ) : ((calculationForm === 'Theo bậc thang' && calculationRules === 'Giá trị giao dịch') || calculationRules === 'Doanh số' ? (
              <FormGroup row>
                <Col lg="5" className="label-left">
                  <Label htmlFor="code" className="font-weight-bold">Giá trị giao dịch từ:</Label>
                </Col>
                <Col lg="7">
                  <NumberFormat
                    label="Fee Code"
                    type="text"
                    className="form-control"
                    onChange={this.feeMinHandleChange}
                    thousandSeparator
                    prefix=""
                    value={feeMinHandle}
                    allowNegative={false}
                    maxLength={10}
                  />
                </Col>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                  <Label htmlFor="code" className="font-weight-bold">Số lượng giao dịch từ:</Label>
                </Col>
                <Col lg="7">
                  <NumberFormat
                    label="Fee Code"
                    type="text"
                    className="form-control placehoder-right"
                    onChange={this.feeMinHandleChange}
                    thousandSeparator
                    prefix=""
                    placeholder="VND"
                    value={feeMinHandle}
                    allowNegative={false}
                    maxLength={10}
                  />
                  <div className="input-group-ic">VND</div>
                </Col>
              </FormGroup>
            )
            )
          }
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="12" className="label-left" style={{ textAlign: 'left' }}>
                <Label htmlFor="code1" className="font-weight-bold" >Phí xử lý thanh toán:</Label>
              </Col>
            </FormGroup>
            <FormGroup className="account-settings-pointer" row>
              <Col lg="5" style={{ textAlign: 'left' }}>
                <Label className="permission-title">
                  <RInput
                    type="radio"
                    value="0"
                    name="permiss"
                    onChange={this.feePaymentTypeHandleChange}
                    checked={feePaymentType === 0}
                  />
                Theo số tiền
                </Label>
              </Col>
              <Col lg="7">
                <NumberFormat
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  onChange={this.feePaymentHandleChange}
                  thousandSeparator
                  prefix=""
                  maxLength="10"
                  disabled={feePaymentType !== 0}
                  value={feePaymentType === 0 ? feePayment : null}
                  allowNegative={false}
                />
              </Col>
            </FormGroup>
            <FormGroup className="account-settings-pointer" row>
              <Col lg="5" style={{ textAlign: 'left' }}>
                <Label className="permission-title">
                  <RInput
                    type="radio"
                    value="1"
                    name="permiss"
                    onChange={this.feePaymentTypeHandleChange}
                    checked={feePaymentType === 1}
                  />
                Theo phần trăm
                </Label>
              </Col>
              <Col lg="7">
                <NumberFormat
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  onChange={this.feePaymentHandleChange}
                  disabled={feePaymentType !== 1}
                  value={feePaymentType === 1 ? feePayment : null}
                  maxLength={5}
                />
                <div className="input-group-ic">%</div>
                <span className="form-text text-danger" style={{ position: 'absolute', zIndex: '100', top: '20px' }}>{feePaymentPercent}</span>
              </Col>
            </FormGroup>
            {calculationForm === 'Theo công thức' ? (
              <FormGroup row>
                <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                  <Label htmlFor="code" className="font-weight-bold">Phí xử lý tối đa:</Label>
                </Col>
                <Col lg="7">
                  <NumberFormat
                    thousandSeparator
                    prefix=""
                    label="Fee Code"
                    type="text"
                    className="form-control"
                    onChange={this.feeMaxHandleChange}
                    value={feeMaxHandle}
                    allowNegative={false}
                    maxLength={10}
                  />
                </Col>
              </FormGroup>
            ) : (
              (calculationForm === 'Theo bậc thang' && calculationRules === 'Doanh số') || calculationRules === 'Giá trị giao dịch' ? (
                <FormGroup row>
                  <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                    <Label htmlFor="code1" className="font-weight-bold">
                    Giá trị giao dịch đến :
                    </Label>
                  </Col>
                  <Col lg="7">
                    <NumberFormat
                      thousandSeparator
                      prefix=""
                      label="Fee Code"
                      type="text"
                      className="form-control"
                      onChange={this.feeMaxHandleChange}
                      value={feeMaxHandle}
                      allowNegative={false}
                      maxLength={10}
                    />
                  </Col>
                </FormGroup>
              ) : (
                <FormGroup row>
                  <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                    <Label htmlFor="code1" className="font-weight-bold">
                    Số lượng giao dịch đến :
                    </Label>
                  </Col>
                  <Col lg="7">
                    <NumberFormat
                      thousandSeparator
                      prefix=""
                      label="Fee Code"
                      type="text"
                      className="form-control"
                      onChange={this.feeMaxHandleChange}
                      value={feeMaxHandle}
                      allowNegative={false}
                      maxLength={10}
                    />
                  </Col>
                </FormGroup>
              )
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default CaculationFee;


CaculationFee.propTypes = {
  tdata: PropTypes.object,
  tranfersCaculationFee: PropTypes.func.isRequired,
  additionalSigning: PropTypes.number,
  feeFlatPercent: PropTypes.string,
  feePaymentPercent: PropTypes.string,
};

CaculationFee.defaultProps = {
  tdata: null,
  additionalSigning: null,
  feeFlatPercent: null,
  feePaymentPercent: null,
};
