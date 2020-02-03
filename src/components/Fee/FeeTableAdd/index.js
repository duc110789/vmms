/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import {
  Row, Col, Input as RInput, Button, FormGroup, Label, Input,
} from 'reactstrap';
import Form from 'react-validation/build/form';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import NumberFormat from 'react-number-format';
import 'react-datepicker/dist/react-datepicker.css';
import toastr from 'toastr';
import {
  pageOption, DEFAULT_PERPAGE, categoryTime,
} from './config';
import Table from './table';
import PopUpFeeFix from '../../PopUpFeeFix/PopUpFeeFix';
import PopUpDetail from '../../PopUpDetail/PopUpDetail';
import './index.scss';
import 'toastr/build/toastr.min.css';
import { callApiAddOrUpdateFee } from '../../../apis/fee-manager';
import { notifyToast } from '../../../utils/constants';
import NotifyPopUp from '../../PopUpDetail/NotifyPopUp';
import {
  checkFeeType,
  checkClassifySigning,
  checkFeeName,
  validateFeeHandle,
  checkFeeNameExist,
  checkFeeTax,
  convertClassifyByNumber,
  checkValidateOrderClassify
} from './validation';

let dataTable = [];
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeType: 1,
      tData: [],
      perPage: DEFAULT_PERPAGE,
      currentPage: 1,
      folowCal: 3,
      calculationForm: 1,
      vatTax: '',
      feeName: '',
      feeCode: '',
      classifySigning: 0,
      calculationRules: 3,
      additionalSigning: 0,
      modal: false,
      feeFlatType: 0,
      feePaymentType: 0,
      feeFlat: '',
      feePayment: '',
      feeMinHandle: '',
      feeMaxHandle: '',
      countFeeCode: 0,
      rowNum: 0,
      index: 0,
      modalDetail: false,
      dataDetailFromTable: {},
      indexDetail: 0,
      modalDelete: false,
      dataFromTable: '',
      errorCheckFee: null,
      errorCheckClassifySigning: null,
      errorCheckFeeName: null,
      errorFeeHandle: null,
      errorFeeName: null,
      errorCheckFeeTax: null,
      duplicateFeeName: false,
      checkPercentFeeFlat: null,
      checkPercentFeePayment: null,
    };
  }

  componentDidMount() {
    dataTable = [];
  }

  handleSetModalDelete = (number) => {
    this.setState((prevState) => ({
      modalDelete: !prevState.modalDelete,
      indexDetail: number,
    }));
  }

  handleDeleteFromTable = () => {
    const { tData, indexDetail } = this.state;
    tData.splice(indexDetail, 1);
    this.setState({
      modalDelete: false,
    });
  }

  handleSetModal = (data, number) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      dataFromTable: data,
      index: number,
    }));
  }

  handleSetModalDetail = (data, number) => {
    this.setState((prevState) => ({
      modalDetail: !prevState.modalDetail,
      dataDetailFromTable: data,
      indexDetail: number,
    }));
  }

  handleDataFromPopUp = (data) => {
    const { tData } = this.state;
    for (let i = 0; i < tData.length; i += 1) {
      if (i === data.index) {
        tData[i] = data;
        delete tData[i].index;
      }
    }
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
    } else if (controlName === 'feeName') {
      const re = /^[a-zA-Z0-9 ]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
        this.setState({ [controlName]: event.target.value });
      }
    } else if (controlName === 'feeFlat') {
      this.setState({
        [controlName]: event.target.value,
      });
    } else if (controlName === 'feeMinHandle') {
      this.setState({
        [controlName]: parseFloat(event.target.value.replace(/,/g, '')),
      });
    } else if (controlName === 'feeMaxHandle') {
      this.setState({
        [controlName]: parseFloat(event.target.value.replace(/,/g, '')),
      });
    }
    else if (controlName === 'classifySigning') {
      this.setState({
        [controlName]: parseInt(event.target.value, 10),
      });
    } else {
      this.setState({
        [controlName]: event.target.value,
      });
    }
  }

  handleChangeAdditionalSigning = () => {
    this.setState({
      additionalSigning: 1,
    });
  }

  feeTypeHandleChange = (event) => {
    this.inputHandleChange(event, 'feeType');
  }

  feeCodeHandleChange = (event) => {
    this.inputHandleChange(event, 'feeCode');
  }

  vatTaxHandleChange = (event) => {
    this.inputHandleChange(event, 'vatTax');
  }

  feeNameHandleChange = (event) => {
    this.inputHandleChange(event, 'feeName');
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

  handleSaveDataOnLocalStorage = async () => {
    this.setState({
      errorCheckFee: null,
      errorCheckClassifySigning: null,
      errorCheckFeeName: null,
      errorFeeHandle: null,
      errorFeeName: null,
      errorCheckFeeTax: null,
    });

    const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE'));
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM'));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES'));
    const {
      feeType, classifySigning, feeCode, feeName, vatTax, calculationForm,
      calculationRules, folowCal, feeFlat, feeFlatType, feePayment, feeMinHandle,
      feeMaxHandle, feePaymentType, additionalSigning, countFeeCode, rowNum,
    } = this.state;
    const sentData = {
      feeId: dataTable.length,
      feeType: parseInt(feeType, 10),
      classifySigning,
      feeCode,
      feeName,
      vatTax: vatTax ? parseFloat(vatTax.replace(/,/g, '.')) : '',
      calculationForm,
      calculationRules,
      folowCal,
      feeFlat: typeof feeFlat === 'string' && feeFlat.includes(',') ? parseFloat(feeFlat.replace(/,/g, '')) : ((typeof feeFlat === 'string' && feeFlat.includes('.')) || (typeof feeFlat === 'string' && feeFlat.length >0) ? parseFloat(feeFlat) : feeFlat),
      feeFlatType: parseInt(feeFlatType, 10),
      feePayment: typeof feePayment === 'string' && feePayment.includes(',') ? parseFloat(feePayment.replace(/,/g, '')) : ((typeof feePayment === 'string' && feePayment.includes('.')) || (typeof feePayment === 'string' && feePayment.length >0) ? parseFloat(feePayment) : feePayment),
      feePaymentType: parseInt(feePaymentType, 10),
      feeMinHandle,
      feeMaxHandle,
      additionalSigning,
      status: 2,
      rowNum,
      countFeeCode,
    };
    const isExist = await checkFeeNameExist(feeName);
    if (checkFeeType(feeType)) {
      this.setState({
        errorCheckFee: 'Xin vui lòng chọn loại phí',
      });
    } else if (checkClassifySigning(classifySigning)) {
      this.setState({
        errorCheckClassifySigning: 'Vui lòng chọn phân loại kí kết',
      });
    } else if (checkFeeName(feeName)) {
      this.setState({
        errorCheckFeeName: 'Vui lòng nhập tên mức phí',
      });
    } else if (validateFeeHandle(feeMinHandle, feeMaxHandle)) {
      this.setState({
        errorFeeHandle: 'Giá trị giới hạn không hợp lệ.',
      });
    } else if (isExist.feeNameExist === true) {
      this.setState({
        errorFeeName: 'Tên mức phí bị trùng',
      });
    } else if (!checkFeeTax(vatTax)) {
      this.setState({
        errorCheckFeeTax: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
      });
    } else if (!checkFeeTax(feeFlat) && feeFlatType === 1) {
      this.setState({
        checkPercentFeeFlat: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
      });
    } else if (feeFlat === '' ) {
      console.log('check fee Flat', feeFlat);
      this.setState({
        checkPercentFeeFlat: 'Phí cố định hoặc Phí xử lý thanh toán chưa có dữ liệu',
      });
    }  else if (!checkFeeTax(feePayment) && feePaymentType === 1) {
      this.setState({
        checkPercentFeePayment: 'Giá trị phải là số thập phân và nhỏ hơn 100!!!',
      });
    } else if (feePayment === '' ) {
      this.setState({
        checkPercentFeePayment: 'Phí cố định hoặc Phí xử lý thanh toán chưa có dữ liệu',
      });
    }
    else if (feeType === 0 || classifySigning === 0 || feeName === '') {
      toastr.warning(`${notifyToast.APPY_FEE_WARNING}`, `${notifyToast.NOTIFY_WARNING}`, { timeOut: 3000 });
    } else {
      for (let i = 0; i < dataTable.length; i += 1) {
        if (dataTable[i].feeName === feeName) {
          this.setState({
            duplicateFeeName: true,
          });
        }
      }
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.duplicateFeeName) {
        this.setState({
          errorFeeName: 'Tên mức phí bị trùng',
          duplicateFeeName: false,
        });
      } else {
        dataTable.push(sentData);
        console.log('check send data', sentData);
        this.setState({
          tData: dataTable,
          feeName: '',
          vatTax: '',
          calculationForm: 3,
          calculationRules: 3,
          folowCal: 0,
          feeFlat: '',
          feeFlatType: 0,
          feeMinHandle: '',
          feeMaxHandle: '',
          feePayment: '',
          feePaymentType: 0,
          errorCheckFee: null,
          errorCheckClassifySigning: null,
          errorCheckFeeName: null,
          errorFeeHandle: null,
          errorFeeName: null,
          errorCheckFeeTax: null,
          feeType: 1,
          checkPercentFeePayment:'',
        });
        toastr.success(`${notifyToast.APPLY_FEE_SUCCESS}`, `${notifyToast.NOTIFY_SUCCESS}`, { timeOut: 3000 });
      }
    }
  }

  // eslint-disable-next-line consistent-return
  getApiFeeTable = async () => {
    try {
      const { tData } = this.state;
      const data = await callApiAddOrUpdateFee({
        action: 'ADD',
        listFee: tData,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  handleSaveFeeEdit = async () => {
    try {
      const { tData } = this.state;
      const { getListFeeCodeNewest } = this.props;
      await callApiAddOrUpdateFee({
        action: 'UPDATE',
        listFee: tData,
      });
      this.setState({ tData: [] });
      getListFeeCodeNewest();
      dataTable = [];
    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit = async () => {
    try {
      const { tData } = this.state;
      const { history } = this.props;
      const data = await this.getApiFeeTable();
      if (data.code === '00' && tData.length > 0) {
        toastr.success(`${notifyToast.SUBMIT_FEE_SUCCESS}`, `${notifyToast.NOTIFY_SUCCESS}`, { timeOut: 3000 });
        history.push('/fee/list');
      } else if (tData.length === 0) {
        toastr.warning(`${notifyToast.SUBMIT_FEE_WARNING}`, `${notifyToast.NOTIFY_WARNING}`, { timeOut: 3000 });
      } else {
        toastr.warning(`${data.message}`, `${notifyToast.NOTIFY_WARNING}`, { timeOut: 3000 });
      }
      this.setState({
        tData: [],
      });
      dataTable = [];
    } catch (err) {
      console.log(err);
    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  }


  clsAlphaNoOnly = (e) => {
    const regex = new RegExp('^[a-zA-Z0-9 ]+$');
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  render() {
    const {
      feeType, tData, perPage, currentPage, folowCal, modalDetail,
      calculationForm, classifySigning, calculationRules, modal, feeFlatType,
      // eslint-disable-next-line no-shadow
      feePaymentType, index, vatTax, feeFlat, feePayment, feeMinHandle, feeMaxHandle, feeName,
      dataDetailFromTable, indexDetail, modalDelete, dataFromTable,
      errorCheckFee, errorCheckClassifySigning, errorCheckFeeName,
      errorFeeHandle, errorFeeName, errorCheckFeeTax,
      checkPercentFeeFlat, checkPercentFeePayment,
    } = this.state;
    const { match, history, isDisableCheckBox, queryObject } = this.props;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage > tData.length ? tData.length : (currentPage * perPage)} của ${tData.length} bản ghi`;
    const getFeeType = localStorage.getItem('FEE_TYPE') ? JSON.parse(localStorage.getItem('FEE_TYPE')).map((feeTypeDes) => ({ value: feeTypeDes.code, label: feeTypeDes.description })) : null;
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')).map((classify) => ({ value: parseInt(classify.code, 10), label: classify.description }));
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM')).map((caculation) => ({ value: caculation.code, label: caculation.description }));
    const getCaculationRules = JSON.parse(localStorage.getItem('CALCULATION_RULES')).map((ruleCacu) => ({ value: ruleCacu.code, label: ruleCacu.description }));
    const isAvailableClassifySigning = this.props.location.data ? this.props.location.data.map((classify) => ({value: classify.classifySigning})) : null;
    const finalClassifySigning = [ ...getClassifySigning];

    if(isAvailableClassifySigning && isAvailableClassifySigning.length === 3) {
        getClassifySigning.splice(0,2);
    }
    else if( isAvailableClassifySigning && isAvailableClassifySigning.length === 2) {
      getClassifySigning.splice(0,1);
    }
    else if( isAvailableClassifySigning && isAvailableClassifySigning.length === 1) {
      getClassifySigning.splice(2,1);
    }
    else if( isAvailableClassifySigning && isAvailableClassifySigning.length === 0) {
      getClassifySigning.splice(1,2);
    }
    // console.log(checkValidateOrderClassify(getClassifySigning, isAvailableClassifySigning))


    return (
      <div className="animated fadeIn">
        <Row>
          <Form className="form-submit">
            <div className="border gp-add-fee">
              <h5 className="mb-3 text-left">Thông tin chung</h5>
              <Row>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">
                        Loại phí
                        {' '}
                        <span style={{ color: 'red' }}>*</span>
                        :
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Creatable
                        options={getFeeType}
                        isMulti={false}
                        placeholder="Phí thu merchant"
                        onChange={(selectedOption) => this.setState({
                          feeType: parseInt(selectedOption.value, 10),
                          labelFeeType: selectedOption.label,
                        })}
                        value={{
                          value: feeType,
                          label: (this.state.labelFeeType || getFeeType[0].label),
                        }}
                        isDisabled={dataTable.length > 0 ? true : false}
                      />
                      <span className="form-text text-danger">{errorCheckFee}</span>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Mã phí:</Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        onChange={this.feeCodeHandleChange}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Thuế GTGT(%):</Label>
                    </Col>
                    <Col lg="7">
                      <NumberFormat
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        onChange={this.vatTaxHandleChange}
                        value={vatTax}
                        maxLength="5"
                        allowNegative={false}
                      />
                      <div className="input-group-ic">%</div>
                      <span className="form-text text-danger">
                        {errorCheckFeeTax}
                      </span>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md="6">
                  {match.path === '/fee/list/add' ? <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">
                        Phân loại kí kết
                        <span style={{ color: 'red' }}>*</span>
                        :
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Creatable
                        options={getClassifySigning}
                        onChange={(selectedOption) => this.setState({
                          classifySigning: parseInt(selectedOption.value, 10),
                          labelClassifySigning: selectedOption.label,
                        })}
                        value={{
                          value: classifySigning,
                          label: (this.state.labelClassifySigning || 'Chọn'),
                        }}
                        isDisabled={dataTable.length > 0 ? true : false}
                      />
                      <span className="form-text text-danger">
                        {errorCheckClassifySigning}
                      </span>
                    </Col>
                  </FormGroup> : <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">
                        Phân loại kí kết
                        <span style={{ color: 'red' }}>*</span>
                        :
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Creatable
                        options={finalClassifySigning}
                        onChange={(selectedOption) => this.setState({
                          classifySigning: parseInt(selectedOption.value, 10),
                          labelClassifySigning: selectedOption.label,
                        })}
                        value={{
                          value: classifySigning,
                          label: (this.state.labelClassifySigning || convertClassifyByNumber(finalClassifySigning, parseInt(queryObject.classifySigning, 10 ))),
                        }}
                        isDisabled={dataTable.length > 0 ? true : false}
                      />
                      <span className="form-text text-danger">
                        {errorCheckClassifySigning}
                      </span>
                    </Col>
                  </FormGroup>}
                  <FormGroup className="account-settings-pointer" row>
                    <Col lg="12">
                      <Label className="permission-title">
                        <RInput
                          type="checkbox"
                          value="1"
                          disabled={queryObject && queryObject.status === 1 ? false : true}
                          onClick={this.handleChangeAdditionalSigning}
                        />
                        Bổ sung kí kết
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">
                        Tên mức phí
                        <span style={{ color: 'red' }}>*</span>
                        :
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        label="Fee Code"
                        type="text"
                        className="form-control placehoder-right"
                        onChange={this.feeNameHandleChange}
                        maxLength="100"
                        value={feeName}
                      />
                      <span className="form-text text-danger">
                        {errorCheckFeeName}
                        {errorFeeName}
                      </span>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className="border gp-add-fee">
              <h5 className="mb-3 text-left">Công thức phí</h5>
              <Row>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="5" className="label-left">
                      <Label htmlFor="code">Hình thức phí:</Label>
                    </Col>
                    <Col lg="7">
                      <Creatable
                        options={getCaculationForm}
                        isMulti={false}
                        onChange={(selectedOption) => this.setState({
                          calculationForm: parseInt(selectedOption.value, 10),
                          labelCalculationForm: selectedOption.label,
                        })}
                        value={{
                          value: calculationForm,
                          label: (this.state.labelCalculationForm || getCaculationForm[0].label),
                        }}
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              {
                calculationForm === 2 ? (
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
                              calculationRules: parseInt(selectedOption.value, 10),
                              labelCalculationRules: selectedOption.label,
                            })}
                            value={{
                              value: calculationRules,
                              label: (this.state.labelCalculationRules || getCaculationRules[2].label),
                            }}
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
                              folowCal: parseInt(selectedOption.value, 10),
                              labelFollowCal: selectedOption.value,
                            })}
                            value={{
                              value: folowCal,
                              label: (this.state.labelFollowCal ||  categoryTime[2].label),
                            }}
                            isDisabled={calculationRules === 3}
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
                    <Col lg="12" className="label-left">
                      <Label htmlFor="code" className="font-weight-bold">Phí cố định:</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup className="account-settings-pointer" row>
                    <Col lg="5">
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
                        maxLength="12"
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feeFlatHandleChange}
                        thousandSeparator
                        disabled={feeFlatType !== 0}
                        value={feeFlatType === 0 ? feeFlat : ''}
                        allowNegative={false}
                      />
                      <div className="input-group-ic">VND</div>
                    </Col>
                  </FormGroup>
                  <FormGroup className="account-settings-pointer" row>
                    <Col lg="5">
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
                        placeholder=""
                        label="Fee Code"
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.feeFlatHandleChange}
                        disabled={feeFlatType !== 1}
                        value={feeFlatType === 1 ? feeFlat : ''}
                        maxLength="5"
                        allowNegative={false}
                      />
                      <div className="input-group-ic">%</div>
                      <div className="form-text text-danger" style = {{position: 'absolute', zIndex: '100', top: '20px'}}>{checkPercentFeeFlat}</div>
                    </Col>
                  </FormGroup>
                  {
                    calculationForm === 1 ? (
                      <FormGroup row>
                        <Col lg="5" className="label-left">
                          <Label htmlFor="code" className="font-weight-bold">Phí xử lý tối thiếu:</Label>
                        </Col>
                        <Col lg="7">
                          <NumberFormat
                            label="Fee Code"
                            type="text"
                            className="form-control placehoder-right"
                            onChange={this.feeMinHandleChange}
                            thousandSeparator
                            prefix=""
                            value={feeMinHandle}
                            maxLength="12"
                            allowNegative={false}
                          />
                          <div className="input-group-ic">VND</div>
                        </Col>
                      </FormGroup>
                    ) : (calculationForm === 2 && (calculationRules === 3 || calculationRules === 1) ? (
                      <FormGroup row>
                        <Col lg="5" className="label-left">
                          <Label htmlFor="code" className="font-weight-bold">Giá trị giao dịch từ:</Label>
                        </Col>
                        <Col lg="7">
                          <NumberFormat
                            label="Fee Code"
                            type="text"
                            className="form-control placehoder-right"
                            onChange={this.feeMinHandleChange}
                            thousandSeparator
                            prefix=""
                            value={feeMinHandle}
                            maxLength="12"
                            allowNegative={false}
                          />
                          <div className="input-group-ic">VND</div>
                        </Col>
                      </FormGroup>
                    ) : (
                      <FormGroup row>
                        <Col lg="5" className="label-left">
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
                            value={feeMinHandle}
                            maxLength="12"
                            allowNegative={false}
                          />
                          <div className="input-group-ic">VND</div>
                        </Col>
                      </FormGroup>
                    ))
                  }
                </Col>
                <Col md="6">
                  <FormGroup row>
                    <Col lg="12" className="label-left">
                      <Label htmlFor="code1" className="font-weight-bold">Phí xử lý thanh toán:</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup className="account-settings-pointer" row>
                    <Col lg="5">
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
                        className="form-control placehoder-right"
                        onChange={this.feePaymentHandleChange}
                        prefix=""
                        thousandSeparator
                        maxLength="12"
                        disabled={feePaymentType !== 0}
                        value={feePaymentType === 0 ? feePayment : ''}
                        allowNegative={false}
                      />
                      <div className="input-group-ic">VND</div>
                    </Col>
                  </FormGroup>
                  <FormGroup className="account-settings-pointer" row>
                    <Col lg="5">
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
                        placeholder=""
                        label="Fee Code"
                        type="text"
                        className="form-control placehoder-right"
                        onChange={this.feePaymentHandleChange}
                        disabled={feePaymentType !== 1}
                        value={feePaymentType === 1 ? feePayment : ''}
                        maxLength="5"
                      />
                      <span className="form-text text-danger" style={{ position: 'absolute', zIndex: '100', top: '20px' }}>{checkPercentFeePayment}</span>
                      <div className="input-group-ic">%</div>
                    </Col>
                  </FormGroup>
                  {calculationForm === 1 ? (
                    <FormGroup row>
                      <Col lg="5" className="label-left">
                        <Label htmlFor="code" className="font-weight-bold">Phí xử lý tối đa:</Label>
                      </Col>
                      <Col lg="7">
                        <NumberFormat
                          thousandSeparator
                          prefix=""
                          label="Fee Code"
                          type="text"
                          className="form-control placehoder-right"
                          onChange={this.feeMaxHandleChange}
                          value={feeMaxHandle}
                          maxLength="12"
                          allowNegative={false}
                        />
                        <div className="input-group-ic">VND</div>
                      </Col>
                    </FormGroup>
                  ) : (calculationForm === 2 && (calculationRules === 1 || calculationRules === 3) ? (
                    <FormGroup row>
                      <Col lg="5" className="label-left">
                        <Label htmlFor="code1" className="font-weight-bold">Giá trị giao dịch đến :</Label>
                      </Col>
                      <Col lg="7">
                        <NumberFormat
                          thousandSeparator
                          prefix=""
                          label="Fee Code"
                          type="text"
                          className="form-control placehoder-right"
                          onChange={this.feeMaxHandleChange}
                          value={feeMaxHandle}
                          maxLength="12"
                          allowNegative={false}
                        />
                        <div className="input-group-ic">VND</div>
                      </Col>
                    </FormGroup>
                  ) : (
                    <FormGroup row>
                      <Col lg="5" className="label-left">
                        <Label htmlFor="code1" className="font-weight-bold">Số lượng giao dịch đến :</Label>
                      </Col>
                      <Col lg="7">
                        <NumberFormat
                          thousandSeparator
                          prefix=""
                          label="Fee Code"
                          type="text"
                          className="form-control placehoder-right"
                          onChange={this.feeMaxHandleChange}
                          value={feeMaxHandle}
                          maxLength="12"
                          allowNegative={false}
                        />
                        <div className="input-group-ic">VND</div>
                      </Col>
                    </FormGroup>
                  ))}
                </Col>
                <span className="form-text text-danger" style={{ width: '100%', textAlign: 'center' }}>{errorFeeHandle}</span>
              </Row>
            </div>
            <Col md="12">
              <FormGroup row>
                <Col className="text-center btn-search">
                  {
                    match.path === '/fee/list/add'
                  }
                  <Button
                    onClick={this.handleSaveDataOnLocalStorage}
                    className="icon-search btn btn-primary mt-3"
                  >
                    {' '}
                    Áp dụng
                  </Button>
                </Col>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup row>
                <Table
                  tData={tData}
                  handleSetModal={this.handleSetModal}
                  handleSetModalDetail={this.handleSetModalDetail}
                  onChange={this.handleChangePage}
                  perPage={perPage}
                  currentPage={currentPage}
                  handleSetModalDelete={this.handleSetModalDelete}
                  key={tData.length}
                />
              </FormGroup>
            </Col>
            <div className="fee-table__pagination table-pagination-padding">
              <Row>
                <Col
                  xl={{
                    size: 6,
                  }}
                  lg={{
                    size: 6,
                  }}
                  md={{
                    size: 6,
                  }}
                  sm={{
                    size: 12,
                  }}
                  xs={{
                    size: 12,
                  }}
                >
                  <div className="select-perpage">
                    <div className="select-perpage__info">
                      <Select
                        id="LIMIT_DROPDOWN"
                        value={{
                          value: perPage,
                          label: perPage,
                        }}
                        onChange={(e) => {
                          this.setState({
                            perPage: e.value,
                            currentPage: 1,
                          });
                        }}
                        options={pageOption}
                        placeholder="5"
                        className="select-pagination"
                        menuPlacement="top"
                      />
                      <p>
                        {showingOption}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col
                  xl={{
                    size: 6,
                  }}
                  lg={{
                    size: 6,
                  }}
                  md={{
                    size: 6,
                  }}
                  sm={{
                    size: 12,
                  }}
                  xs={{
                    size: 12,
                  }}
                >
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={perPage}
                    totalItemsCount={tData.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </Col>
              </Row>
            </div>
          </Form>
        </Row>
        <Col md="12">
          <FormGroup row>
            <Col className="text-center btn-search">
              {
                match.path === '/fee/list/add'
                  ? (
                 <div className='mb-3'>
                   <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                     <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                     Quay lại
                   </Button>
                   <Button
                     className="icon-search btn btn-primary"
                     onClick={this.handleSubmit}
                   >
                     {' '}
                     Lưu thông tin
                   </Button>
                 </div>
                  ) : (
                    <div className="mb-3">
                      <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                        <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                        Quay lại
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary" onClick={this.handleSaveFeeEdit}>
                        Cập nhật
                      </Button>
                    </div>
                  )
              }
            </Col>
          </FormGroup>
        </Col>
        {modal
        && (
          <PopUpFeeFix
            modal={modal}
            handleSetModal={this.handleSetModal}
            tData={tData}
            dataFromTable={dataFromTable}
            index={index}
            handleDataFromPopUp={this.handleDataFromPopUp}
          />
        )}

        {modalDetail
        && (
          <PopUpDetail
            modalDetail={modalDetail}
            handleSetModalDetail={this.handleSetModalDetail}
            dataDetailFromTable={dataDetailFromTable}
            indexDetail={indexDetail}
          />
        )}

        {modalDelete && (
          <NotifyPopUp
            modalDelete={modalDelete}
            handleSetModalDelete={this.handleSetModalDelete}
            handleDeleteFromTable={this.handleDeleteFromTable}
          />
        )}
      </div>
    );
  }
}

export default withRouter(index);
index.propTypes = {
  history: PropTypes.object,
  getListFeeCodeNewest: PropTypes.func,
  match: PropTypes.object,
  isDisableCheckBox: PropTypes.bool,
};

index.defaultProps = {
  history: '/fee/list',
  match: {},
  isDisableCheckBox: true,
  getListFeeCodeNewest: function name(params) {
    return params;
  },
};
