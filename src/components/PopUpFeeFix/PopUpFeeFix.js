/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Input as RInput, Button,
  FormGroup, Label,
} from 'reactstrap';
import Creatable from 'react-select/creatable';
import NumberFormat from 'react-number-format';
import { validateFeeHandle, checkFeeTax } from '../Fee/FeeTableAdd/validation';

import { categoryTime } from './config';


class PopUpFeeFix extends Component {
  constructor(props) {
    super(props);
    const { dataFromTable, index } = this.props;
    console.log('datafromTable', dataFromTable);
    this.state = {
      feeType: dataFromTable.feeType,
      classifySigning: dataFromTable.classifySigning,
      feeCode: dataFromTable.feeCode,
      feeName: dataFromTable.feeName,
      vatTax: dataFromTable.vatTax.toString(),
      calculationForm: dataFromTable.calculationForm,
      calculationRules: dataFromTable.calculationRules,
      folowCal: dataFromTable.folowCal,
      feeFlat: dataFromTable.feeFlat.toString(),
      feeFlatType: dataFromTable.feeFlatType,
      feePayment: dataFromTable.feePayment.toString(),
      feeMinHandle: dataFromTable.feeMinHandle,
      feeMaxHandle: dataFromTable.feeMaxHandle,
      index,
      feePaymentType: dataFromTable.feePaymentType,
      status: 0,
      rowNum: 0,
      countFeeCode: 0,
      errorFeeHandle: null,
      errorCheckFeeTax: null,
      checkPercentFeeFlat: null,
      checkPercentFeePayment: null,
    };
  }

  componentDidMount() {
    const { dataFromTable } = this.props;
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM')).map((caculation) => ({ value: caculation.description, label: caculation.description }));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES')).map((ruleCaculation) => ({ value: ruleCaculation.description, label: ruleCaculation.description }));
    const getFeeType = localStorage.getItem('FEE_TYPE') ? JSON.parse(localStorage.getItem('FEE_TYPE')).map((feeTypeDes) => ({ value: feeTypeDes.description, label: feeTypeDes.description })) : null;
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')).map((classifySigning) => ({ value: classifySigning.description, label: classifySigning.description }));
    this.setState({
      feeType: getFeeType[dataFromTable.feeType - 1].value,
      classifySigning: getClassifySigning[dataFromTable.classifySigning - 1].value,
      calculationForm: getCaculationForm[dataFromTable.calculationForm - 1].value,
      calculationRules: getCaculationRules[dataFromTable.calculationRules - 1].value,
      folowCal: dataFromTable.folowCal === 1 ? 'Ngày' : (dataFromTable.folowCal === 2 ? 'Tuần' : 'Tháng'),
    });
  }

  inputHandleChange = (event, controlName) => {
    if (controlName === 'feeFlatType') {
      this.setState({
        [controlName]: parseInt(event.target.value, 10),
        feeFlat: '',
      });
    } else if (controlName === 'feePaymentType') {
      this.setState({
        [controlName]: parseInt(event.target.value, 10),
        feePayment: '',
      });
    } else {
      this.setState({
        [controlName]: event.target.value,
      });
    }
  }


  feeCodeHandleChange = (event) => {
    this.inputHandleChange(event, 'feeCode');
  }

  feeNameHandleChange = (event) => {
    this.inputHandleChange(event, 'feeName');
  }

  vatTaxHandleChange = (event) => {
    this.inputHandleChange(event, 'vatTax');
  }


  feeFlatHandleChange = (event) => {
    this.inputHandleChange(event, 'feeFlat');
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

  feePaymentHandleChange = (event) => {
    this.inputHandleChange(event, 'feePayment');
  }

  handleUpdateAddFee = async () => {
    const { handleDataFromPopUp, handleSetModal } = this.props;
    const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE'));
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM'));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES'));
    const {
      calculationForm, calculationRules, classifySigning,
      feeCode, feeFlat, feeFlatType, feeMaxHandle, feeMinHandle, feeName,
      feePaymentType, feeType, folowCal, index, vatTax, feePayment, status, rowNum, countFeeCode,
    } = this.state;
    const feeMin = feeMinHandle !== 0 && typeof feeMinHandle === 'string' ? parseFloat(feeMinHandle.replace(/,/g, '')) : feeMinHandle;
    const feeMax = feeMaxHandle !== 0 && typeof feeMaxHandle === 'string' ? parseFloat(feeMaxHandle.replace(/,/g, '')) : feeMaxHandle;
    if (validateFeeHandle(feeMin, feeMax)) {
      this.setState({
        errorFeeHandle: 'Phí xử lý thanh toán không hợp lệ',
      });
    } else if (!checkFeeTax(vatTax)) {
      this.setState({
        errorCheckFeeTax: 'Phí xử lý thanh toán không hợp lệ',
      });
    } else if (!checkFeeTax(feeFlat) && feeFlatType === 1) {
      this.setState({
        checkPercentFeeFlat: 'Phí xử lý thanh toán không hợp lệ',
      });
    } else if (!checkFeeTax(feePayment) && feePaymentType === 1) {
      this.setState({
        checkPercentFeePayment: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
      });
    } else {
      const sentData = {
        feeType: feeType === getFeeType[0].description
          ? parseInt(getFeeType[0].code, 10) : feeType,
        classifySigning: classifySigning === getClassifySigning[0].description
          ? parseInt(getClassifySigning[0].code, 10)
          : (classifySigning === getClassifySigning[1].description
            ? parseInt(getClassifySigning[1].code, 10) : parseInt(getClassifySigning[2].code, 10)),
        feeCode,
        feeName,
        vatTax: vatTax !== '' && typeof vatTax === 'string' ? parseFloat(vatTax.replace(/,/g, '.')) : vatTax,
        calculationForm: (calculationForm === getCaculationForm[0].description || calculationForm === '')
          ? parseInt(getCaculationForm[0].code, 10) : parseInt(getCaculationForm[1].code, 10),
        calculationRules: calculationRules === getCaculationRules[0].description
          ? parseInt(getCaculationRules[0].code, 10)
          : (calculationRules === getCaculationRules[1].description
            ? parseInt(getCaculationRules[1].code, 10)
            : (calculationRules === getCaculationRules[2].description
              ? parseInt(getCaculationRules[2].code, 10) : 1)),
        folowCal: folowCal === 'Ngày' ? 1 : (folowCal === 'Tuần' ? 2 : (folowCal === 'Tháng' ? 3 : 3)),
        feeFlat: typeof feeFlat === 'string' && feeFlat.includes('%') === true ? parseFloat(feeFlat.replace(/,/g, '.')) : (typeof feeFlat === 'string' && feeFlat.includes('%') === false ? parseFloat(feeFlat.replace(/,/g, '')) : feeFlat),

        feeFlatType: parseInt(feeFlatType, 10),
        feePayment: typeof feePayment === 'string' && feePayment.includes('%') === true ? parseFloat(feePayment.replace(/,/g, '.')) : (typeof feePayment === 'string' && feePayment.includes('%') === false ? parseFloat(feePayment.replace(/,/g, '')) : feePayment),
        feePaymentType: parseInt(feePaymentType, 10),
        feeMinHandle: feeMinHandle !== 0 && typeof feeMinHandle === 'string' ? parseFloat(feeMinHandle.replace(/,/g, '')) : feeMinHandle,
        feeMaxHandle: feeMaxHandle !== 0 && typeof feeMaxHandle === 'string' ? parseFloat(feeMaxHandle.replace(/,/g, '')) : feeMaxHandle,
        index,
        status,
        rowNum,
        countFeeCode,
      };
      await handleDataFromPopUp(sentData);
      await handleSetModal();
    }
  }

  render() {
    const getFeeType = localStorage.getItem('FEE_TYPE') ? JSON.parse(localStorage.getItem('FEE_TYPE')).map((feeTypeDes) => ({ value: feeTypeDes.description, label: feeTypeDes.description })) : null;
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')).map((classifySigning) => ({ value: classifySigning.description, label: classifySigning.description }));
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM')).map((formCacultion) => ({ value: formCacultion.description, label: formCacultion.description }));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES')).map((ruleCaculation) => ({ value: ruleCaculation.description, label: ruleCaculation.description }));
    const {
      className, dataFromTable, modal, handleSetModal,
    } = this.props;

    const {
      feeType, classifySigning, calculationForm, calculationRules, folowCal, vatTax,
      feeFlatType, feePaymentType, feeFlat, feeMinHandle, feePayment, feeMaxHandle,
      errorFeeHandle, errorCheckFeeTax, checkPercentFeeFlat, checkPercentFeePayment,
    } = this.state;
    return (
      <div className="animated fadeIn">

        <Modal isOpen={modal} handleSetModal={this.handleSetModal} className={className} style={{ maxWidth: '1600px', width: '80%' }}>
          <ModalHeader className="text-center" toggle={this.handleSetModal}>Bảng tính phí</ModalHeader>
          <ModalBody>
            <Row>
              <Form style={{ width: '100%', display: 'flex' }}>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Loại phí:</Label>
                    </Col>
                    <Col lg="7">
                      <Creatable
                        options={getFeeType}
                        isMulti={false}
                        onChange={(selectedOption) => this.setState({
                          feeType: selectedOption.value,
                        })}
                        value={{
                          value: feeType,
                          label: (feeType || (dataFromTable.feeType === 1 ? getFeeType[0].value : 'Chọn')),
                        }}
                        isDisabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Phân loại ký kết</Label>
                    </Col>
                    <Col lg="7">
                      <Creatable

                        options={getClassifySigning}
                        isMulti={false}
                        placeholder="Tất cá"
                        onChange={(selectedOption) => this.setState({
                          classifySigning: selectedOption.value,
                        })}
                        value={{
                          value: classifySigning,
                          label: (classifySigning
                          || (getClassifySigning[dataFromTable.classifySigning - 1].value)),
                        }}
                        isDisabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Mã phí</Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feeCodeHandleChange}
                        disabled
                      />
                    </Col>
                  </FormGroup>


                </Col>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Tên mức phí</Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feeNameHandleChange}
                        maxLength="100"
                        defaultValue={dataFromTable && dataFromTable.feeName}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="account-settings-pointer">
                    <Col lg="12" className="label-left">
                      <Label className="permission-title">
                        <RInput
                          type="checkbox"
                          value="1"
                          name="permissions[]"
                          disabled
                        />
                        Bổ sung kí kết
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Thuế GTGT(%)</Label>
                    </Col>
                    <Col lg="7">

                      <NumberFormat
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.vatTaxHandleChange}
                        value={vatTax}
                        defaultValue={1}
                        maxLength={5}
                        allowNegative={false}
                      />
                    </Col>
                    <span className="form-text text-danger">{errorCheckFeeTax}</span>
                  </FormGroup>

                </Col>
              </Form>
            </Row>
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
                        placeholder="Tất cả"
                        onChange={(selectedOption) => this.setState({
                          calculationForm: selectedOption.value,
                        })}
                        value={{
                          value: calculationForm,
                          label: (calculationForm
                            || (getCaculationForm[dataFromTable
                            && dataFromTable.calculationForm - 1]
                            && getCaculationForm[dataFromTable
                            && dataFromTable.calculationForm - 1].value)),
                        }}
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
                              label: (calculationRules
                                // eslint-disable-next-line max-len
                                || getCaculationRules[dataFromTable && dataFromTable.calculationRules - 1].value),
                            }}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup row>
                        <Col lg="7">
                          <Creatable
                            isClearable
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
                            isDisabled={calculationRules === 'Giá trị giao dịch'}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                ) : (null)
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
                        placeholder="VND"
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feeFlatHandleChange}
                        thousandSeparator
                        prefix=""
                        disabled={feeFlatType !== 0}
                        value={feeFlatType === 0 ? feeFlat : ''}
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
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feeFlatHandleChange}
                        disabled={feeFlatType !== 1}
                        value={feeFlatType === 1 ? feeFlat : ''}
                        allowNegative={false}
                        maxLength={5}
                      />
                      <div className="input-group-ic">%</div>
                      <span className="form-text text-danger">
                        {checkPercentFeeFlat}
                      </span>
                    </Col>
                  </FormGroup>
                  {
                    calculationForm === 'Theo công thức' ? (
                      <FormGroup row>
                        <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                          <Label htmlFor="code" className="font-weight-bold">Xử lý tối thiếu:</Label>
                        </Col>
                        <Col lg="7">
                          <NumberFormat
                            placeholder="VND"
                            onChange={this.feeMinHandleChange}
                            label="Fee Code"
                            type="text"
                            className="form-control"
                            name="code"
                            value={feeMinHandle}
                            thousandSeparator
                            prefix=""
                            allowNegative={false}
                            maxLength="10"
                          />
                        </Col>
                      </FormGroup>
                    ) : (calculationForm === 'Theo bậc thang' && (calculationRules === 'Doanh số' || calculationRules === 'Giá trị giao dịch') ? (
                      <FormGroup row>
                        <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                          <Label htmlFor="code" className="font-weight-bold">Giá trị giao dịch từ:</Label>
                        </Col>

                        <Col lg="7">
                          <NumberFormat

                            placeholder="VND"
                            maxLength="10"
                            label="Fee Code"
                            type="text"
                            className="form-control"
                            name="code"
                            onChange={this.feeMinHandleChange}
                            thousandSeparator
                            prefix=""
                            value={feeMinHandle}
                            allowNegative={false}
                          />
                        </Col>
                      </FormGroup>
                    ) : (
                      <FormGroup row>
                        <Col lg="5" className="label-left">
                          <Label htmlFor="code" className="font-weight-bold">Số lượng giao dịch từ:</Label>
                        </Col>

                        <Col lg="7">
                          <NumberFormat
                            placeholder="VND"
                            label="Fee Code"
                            type="text"
                            className="form-control"
                            name="code"
                            onChange={this.feeMinHandleChange}
                            thousandSeparator
                            prefix=""
                            value={feeMinHandle}
                            allowNegative={false}
                            maxLength="10"
                          />
                        </Col>
                      </FormGroup>
                    ))
                  }
                </Col>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="12" className="label-left" style={{ textAlign: 'left' }}>
                      <Label htmlFor="code" className="font-weight-bold">Phí xử lý thanh toán:</Label>
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
                        placeholder="VND"
                        disabled={feePaymentType !== 0}
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feePaymentHandleChange}
                        thousandSeparator
                        prefix=""
                        maxLength="10"
                        value={feePaymentType === 0 ? feePayment : ''}
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
                        disabled={feePaymentType !== 1}
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feePaymentHandleChange}
                        value={feePaymentType === 1 ? feePayment : ''}
                        allowNegative={false}
                        maxLength={5}
                      />
                      <div className="input-group-ic">%</div>
                      <span className="form-text text-danger">
                        {checkPercentFeePayment}
                      </span>
                    </Col>
                  </FormGroup>
                  {calculationForm === 'Theo công thức' ? (
                    <FormGroup row>
                      <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                        <Label htmlFor="code" className="font-weight-bold">Xử lý tối đa:</Label>
                      </Col>
                      <Col lg="7">
                        <NumberFormat
                          thousandSeparator
                          prefix=""

                          placeholder="VND"
                          onChange={this.feeMaxHandleChange}
                          label="Fee Code"
                          type="text"
                          className="form-control"
                          name="code"
                          value={feeMaxHandle}
                          allowNegative={false}
                          maxLength="10"
                        />
                      </Col>
                    </FormGroup>
                  ) : (calculationForm === 'Theo bậc thang' && (calculationRules === 'Doanh số' || calculationRules === 'Giá trị giao dịch') ? (
                    <FormGroup row>

                      <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                        <Label htmlFor="code" className="font-weight-bold">Giá trị giao dịch đến :</Label>
                      </Col>
                      <Col lg="7">
                        <NumberFormat
                          thousandSeparator
                          prefix=""
                          addRef={this.addRef}
                          placeholder="VND"
                          ref={(a) => { this.a = a; }}
                          label="Fee Code"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.feeMaxHandleChange}
                          value={feeMaxHandle}
                          allowNegative={false}
                          maxLength="10"
                        />
                      </Col>
                    </FormGroup>
                  ) : (
                    <FormGroup row>
                      <Col lg="5" className="label-left" style={{ textAlign: 'left' }}>
                        <Label htmlFor="code" className="font-weight-bold">Số lượng giao dịch đến :</Label>
                      </Col>
                      <Col lg="7">
                        <NumberFormat
                          thousandSeparator
                          prefix=""
                          addRef={this.addRef}
                          placeholder="VND"
                          ref={(a) => { this.a = a; }}
                          label="Fee Code"
                          type="text"
                          className="form-control"
                          name="code"
                          onChange={this.feeMaxHandleChange}
                          value={feeMaxHandle}
                          allowNegative={false}
                          maxLength="10"
                        />
                      </Col>
                    </FormGroup>
                  ))}
                </Col>
                <span className="form-text text-danger" style={{ width: '100%', textAlign: 'center' }}>{errorFeeHandle}</span>
              </Row>

            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleUpdateAddFee}>Cập nhật</Button>
            <Button color="secondary" onClick={handleSetModal}>Quay lại</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

PopUpFeeFix.propTypes = {
  dataFromTable: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDataFromPopUp: PropTypes.func.isRequired,
  className: PropTypes.string,
  modal: PropTypes.bool.isRequired,
  handleSetModal: PropTypes.func.isRequired,
};

PopUpFeeFix.defaultProps = {
  className: '',
};
export default PopUpFeeFix;
