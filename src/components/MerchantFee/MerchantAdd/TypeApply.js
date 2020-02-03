/* eslint-disable */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Col, Input as RInput, FormGroup, Label, Button,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import MultiSelect from '../../common/MultiSelect';
import {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents,
} from '../../common/CheckboxMultiSelect';
import {
  getListMerchantMcc,
  getListMerchantNameByTypeCode,
  saveListFeeMerchantName,
  getFileUploadMerchant,
  storeListMerchantLocal,
  getInfoApplyMerchant,
  validateAddFeeMerchant,
  onCLickchangeValueApplyType,
} from '../../../store/actions/actionAddMerchant';
import { getApplyTypeMerchant } from '../../../store/actions/actionMerchantCommon'

import CONST_VARIABLE from '../../../utils/constants';
import ListErrors from './modal/ListErrors';
import moment from "moment";

class TypeApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelectedMccName: [],
      isShowModalErrors: false,
      arrMerchantMcc: [],
      fileReader: new FileReader(),
      dataFileExcell: null,
      fileNameUpload: null,
      listItemErrorModal: null,
      validMerchant: 0,
      inValidMerchant: 0,
      applyStyle: '2',
      showButtonUploadFile: false,
    };
    this.toggleErrors = this.toggleErrors.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      listMerchantMcc,
      listMerchantName,
    } = props;
    const tempArrMerchantMcc = [{ value: '*', label: 'Tất cả' }];
    const tempArrMerchantName = [];
    if (listMerchantMcc !== null) {
      const convertArrMerchantMcc = Object.values(listMerchantMcc);
      for (let i = 0; i < convertArrMerchantMcc.length; i += 1) {
        tempArrMerchantMcc.push(
          { value: convertArrMerchantMcc[i].typeCode, label: convertArrMerchantMcc[i].fullName },
        );
      }
    }
    if (listMerchantName) {
      for (let i = 0; i < listMerchantName.length; i += 1) {
        tempArrMerchantName.push(
          {
            value: listMerchantName[i].merchantCode,
            label: (`${listMerchantName[i].merchantCode}-${listMerchantName[i].merchantName}`),
            name: (`${listMerchantName[i].merchantName}`),
          },
        );
      }
    }
    return {
      arrMerchantMcc: tempArrMerchantMcc,
      arrMerchantName: tempArrMerchantName,
    };
  }

  componentDidMount() {
    const {
      getListMerchantMcc,
      getApplyTypeMerchant,
    } = this.props;
    getListMerchantMcc();
    getApplyTypeMerchant();
  }

  componentDidUpdate(prevProps) {
    const { dataResponseUploadFile, storeListMerchantLocal, responValidateFeeMerchant } = this.props;
    // Check validate Mc click button Áp dụng
    if (responValidateFeeMerchant !== prevProps.responValidateFeeMerchant) {
      this.setState({
        validMerchant: responValidateFeeMerchant.totalMerchantValid,
        inValidMerchant: responValidateFeeMerchant.totalMerchantInValid,
        listItemErrorModal: responValidateFeeMerchant.merchantInvalid,
      });

      if (responValidateFeeMerchant.totalMerchantInValid === 0) {
        this.applyListMerchantValidation();
      } else {
        alert('Có lỗi khi apply, xem chi tiết lỗi!');
      }
    }

    // Check validate Mc click button Upload
    if (prevProps.dataResponseUploadFile !== dataResponseUploadFile) {
      this.setState({
        validMerchant: dataResponseUploadFile.totalMerchantValid,
        inValidMerchant: dataResponseUploadFile.totalMerchantInValid,
        listItemErrorModal: dataResponseUploadFile.merchantInvalid,
      });
      if (dataResponseUploadFile !== null) {
        if (dataResponseUploadFile.code === '00') {
          if (dataResponseUploadFile.totalMerchantInValid > 0) {
            alert('Có lỗi khi upload, xem chi tiết lỗi!');
          } else if (dataResponseUploadFile.totalMerchantValid > 0) {
            this.setState({
              showButtonUploadFile: false,
            });
            const arrMerchantAfterUploadOrApply = dataResponseUploadFile.merchantValid.map((item) => ({
              value: item.merchantCode,
              name: item.merchantName,
            }));
            storeListMerchantLocal(arrMerchantAfterUploadOrApply);
          }
        } else {
          alert(dataResponseUploadFile.message);
          storeListMerchantLocal([]);
        }
      } else {
        alert('Có lỗi trong quá trình upload!');
        storeListMerchantLocal([]);
      }
    }
  }

  handleChangeMccName = (mccNameselected) => {
    this.setState({
      optionSelectedMccName: mccNameselected,
    });
  };

  handleChangeMerchantMcc = (nameMerchantMccSelected) => {
    const { getListMerchantNameByTypeCode } = this.props;
    if (nameMerchantMccSelected) {
      this.setState({
        optionNameMerchantMcc: nameMerchantMccSelected,
        optionSelectedMccName: [],
      }, () => getListMerchantNameByTypeCode(nameMerchantMccSelected.value));
    }
  };

  downLoadFileDemo = () => {
    window.open(CONST_VARIABLE.URL_DOWLOAD_FILE_DEMO, 'blank');
  };

  handleChangeApplyStyle = (arrMerchantSelected) => {
    const { onCLickchangeValueApplyType } = this.props;
    if (arrMerchantSelected) {
      this.setState({
        applyStyle: arrMerchantSelected.value,
        optionSelectedMccName: [],
      }, () => onCLickchangeValueApplyType(this.state.applyStyle));
    }
  };

  handleFileReader = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);
    this.setState({
      dataFileExcell: Array.from(arrDataByte),
    });
  };

  onChangeFileExcell = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (file.size > CONST_VARIABLE.MAX_FILE_SIZE_UPLOAD) {
      alert('Kích thước file phải nhỏ hơn 5M!');
      e.target.value = '';
      return;
    }

    this.setState({
      fileNameUpload: file.name,
    });
    fileReader.onloadend = this.handleFileReader;
    fileReader.readAsArrayBuffer(file);
  };

  uploadFileExcell = () => {
    const {
      dataInfoGeneral,
      getFileUploadMerchant,
      storeListMerchantLocal,
      getInfoApplyMerchant,
    } = this.props;
    const { dataFileExcell, fileNameUpload, applyStyle } = this.state;

    if (!this.validateInfoGeneral(dataInfoGeneral)) {
      return;
    }

    if (!fileNameUpload) {
      toastr.warning(`${CONST_VARIABLE.CHOOSE_FILE_EXCELL}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      return;
    }

    try {
      if (dataFileExcell && fileNameUpload) {
        const paramsApi = {
          fileName: fileNameUpload,
          dataByte: dataFileExcell,
          classifySigning: dataInfoGeneral.optionClassifySigned
            ? dataInfoGeneral.optionClassifySigned.value : 1,
        };

        getFileUploadMerchant(paramsApi);
        getInfoApplyMerchant({
          applyStyle,
          fileNameUpload,
        });
      } else {
        storeListMerchantLocal([]);
        getInfoApplyMerchant({});
      }
    } catch (e) {
      console.log(e);
      alert('Có lỗi trong quá trình Upload!')
    }
  };

  applyListMerchantValidation = () => {
    const {
      saveListFeeMerchantName,
      storeListMerchantLocal,
      getInfoApplyMerchant,
    } = this.props;
    const {
      optionSelectedMccName,
      applyStyle,
      optionNameMerchantMcc,
    } = this.state;

    if (optionSelectedMccName) {
      if (optionSelectedMccName.length > 1) {
        if (optionSelectedMccName[0].value === '*') {
          saveListFeeMerchantName(optionSelectedMccName.shift());
        } else {
          saveListFeeMerchantName(optionSelectedMccName);
        }
        storeListMerchantLocal(optionSelectedMccName);
      } else if (optionSelectedMccName.length === 1) {
        if (optionSelectedMccName[0].value !== '*') {
          saveListFeeMerchantName(optionSelectedMccName);
          storeListMerchantLocal(optionSelectedMccName);
        }
      }
      getInfoApplyMerchant({
        applyStyle,
        optionNameMerchantMcc,
        fileNameUpload: '',
      });
    } else {
      storeListMerchantLocal([]);
      getInfoApplyMerchant({});
    }
  };

  applyListMerchant = () => {
    const { validateAddFeeMerchant, dataInfoGeneral } = this.props;
    const {
      optionSelectedMccName,
      optionNameMerchantMcc,
    } = this.state;

    if (!this.validateInfoGeneral(dataInfoGeneral)) {
      return;
    }

    if (optionNameMerchantMcc === undefined) {
      toastr.warning(`${CONST_VARIABLE.TYPE_MERCHANT}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      return;
    }

    if (optionSelectedMccName.length === 0 || (optionSelectedMccName.length === 1 && optionSelectedMccName[0].value === '*')) {
      toastr.warning(`${CONST_VARIABLE.MERCHANT_ID_MC_NAME}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      return;
    }

    try {
      if (optionSelectedMccName.length > 0) {
        if (optionSelectedMccName[0].value === '*') {
          const arrOptionSelectedMccName = optionSelectedMccName.slice(1);
          const tempOptionSelectedMccName = arrOptionSelectedMccName.map((item) => ({
            merchantCode: item.value,
            merchantName: item.label,
          }));
          validateAddFeeMerchant(tempOptionSelectedMccName);
        } else {
          const arrOptionSelectedMccName = optionSelectedMccName.map((item) => ({
            merchantCode: item.value,
            merchantName: item.label,
          }));
          validateAddFeeMerchant(arrOptionSelectedMccName);
        }
      }
    } catch (e) {
      console.log(e);
      alert('Có lỗi trong quá trình lưu dữ liệu!')
    }
  };

  validateInfoGeneral(dataInfoGeneral) {
    const convertSigningDate = moment(dataInfoGeneral.signingDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const convertApplyDate = moment(dataInfoGeneral.applyDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const convertExpirationDate = moment(dataInfoGeneral.expirationDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');

    if (
      !dataInfoGeneral.optionClassifySigned
      || !dataInfoGeneral.contractNumber
      || !dataInfoGeneral.feeCodeAndFeeName
      || !dataInfoGeneral.payChannelSet
      || !dataInfoGeneral.typePayment) {
      toastr.warning(`${CONST_VARIABLE.APPY_FEE_MERCHANT_WARNING}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      return false;
    } else if (moment(new Date(convertSigningDate)).isSameOrAfter(new Date(convertApplyDate))) {
      toastr.warning(`${CONST_VARIABLE.DATE_SIGNING_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      return false;
    } else if (moment(new Date(convertApplyDate)).isSameOrAfter(new Date(convertExpirationDate))) {
      toastr.warning(`${CONST_VARIABLE.DATE_EXPRICE_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      return false;
    } else {
      return true;
    }
  }

  openToggleErrors() {
    this.toggleErrors();
  }

  toggleErrors() {
    const { isShowModalErrors } = this.state;
    this.setState({
      isShowModalErrors: !isShowModalErrors,
    });
  }

  render() {
    const {
      optionSelectedMccName,
      applyStyle,
      isShowModalErrors,
      arrMerchantMcc,
      arrMerchantName,
      validMerchant,
      inValidMerchant,
      listItemErrorModal,
      showButtonUploadFile,
    } = this.state;
    const { dataMerchant, listApplyType, } = this.props;
    const arrApplyType = listApplyType && listApplyType.map((item) => {
      return {
        value: item.code,
        label: item.description,
      }
    });
    return (
      <>
        <Col md={{ size: 6 }}>
          <FormGroup row>
            <Col lg="4" className="label-left">
              <Label>
                Hình thức áp dụng:
              </Label>
            </Col>
            <Col lg="8">
              <CreatableSelect
                options={arrApplyType}
                defaultValue={{ value: '1', label: 'Theo danh sách có sẵn' }}
                onChange={this.handleChangeApplyStyle}
                isDisabled={!!(dataMerchant && dataMerchant.data && dataMerchant.data.status === 4 && this.props.location.pathname === '/merchant/edit-merchant')}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md={6} />
        <Col md={6}>
          <FormGroup row>
            <Col lg="4" className="label-left">
              <Label>
                Loại hình doanh nghiệp (Theo MCC):
              </Label>
            </Col>
            <Col lg="8">
              {applyStyle === '2' ? (
                <CreatableSelect
                  options={arrMerchantMcc}
                  isValidNewOption={() => false}
                  onChange={this.handleChangeMerchantMcc}
                  defaultValue={{ value: '*', label: 'Tất cả' }}
                  isDisabled={!!(dataMerchant && dataMerchant.data && dataMerchant.data.status === 4 && this.props.location.pathname === '/merchant/edit-merchant')}
                />
              ) : (
                <div className="upload-mc">
                  <RInput
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => this.onChangeFileExcell(e)}
                  />
                  <span>
                    <Button className="btn btn-primary" disabled={showButtonUploadFile} onClick={() => this.uploadFileExcell()}>
                      Upload
                    </Button>
                  </span>
                  <Label className="mt-4">
                    Tải file danh sách mẫu tại đây:
                    <Button className="decoration-text ml-1 text-primary bg-white" onClick={() => this.downLoadFileDemo()}>
                      MID_ddMMyyyy.xlsx
                    </Button>
                  </Label>
                  <div>
                    <Label>
                      Số lượng MC không hợp lệ:
                      <b className="pl-1">{inValidMerchant}</b>
                    </Label>
                  </div>
                  <Label>
                    Số lượng MC hợp lệ:
                    <b className="pl-1">{validMerchant}</b>
                  </Label>
                  {inValidMerchant > 0 ? (
                    <FormGroup>
                      <Button className="decoration-text text-primary bg-white" onClick={() => this.openToggleErrors()}>
                        Chi tiết lỗi
                      </Button>
                    </FormGroup>
                  ) : ('')}
                </div>
              )}
            </Col>
          </FormGroup>
        </Col>
        <Col md={6} />
        {applyStyle === '2' ? (
          <>
            <Col md={6}>
              <FormGroup row>
                <Col lg="4" className="label-left">
                  <Label>
                    Merchant ID - Tên Merchant
                    <span style={{ color: 'red' }}>
                      *
                    </span>
                    :
                  </Label>
                </Col>
                <Col lg="8">
                  <div
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please selecet account(s)"
                    className="mb-3"
                  >
                    <MultiSelect
                      options={arrMerchantName}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option,
                        MultiValue,
                        ValueContainer,
                        animatedComponents,
                      }}
                      onChange={this.handleChangeMccName}
                      allowSelectAll
                      value={optionSelectedMccName}
                      isDisabled={!!(dataMerchant && dataMerchant.data && dataMerchant.data.status === 4 && this.props.location.pathname === '/merchant/edit-merchant')}
                    />
                  </div>
                  <div>
                    <Label>
                      Số lượng MC không hợp lệ:
                      <b className="pl-1">{inValidMerchant}</b>
                    </Label>
                  </div>
                  <Label>
                    Số lượng MC hợp lệ:
                    <b className="pl-1">{validMerchant}</b>
                  </Label>
                  {inValidMerchant > 0 ? (
                    <FormGroup>
                      <Button className="decoration-text text-primary bg-white" onClick={() => this.openToggleErrors()}>
                        Chi tiết lỗi
                      </Button>
                    </FormGroup>
                  ) : ('')}
                </Col>
              </FormGroup>
            </Col>
            <Col md={6} />
            <Col md={6} className="text-right">
              <Button className="btn-primary" onClick={this.applyListMerchant}>Áp dụng</Button>
            </Col>
          </>
        ) : ('')}
        { (listItemErrorModal && listItemErrorModal.length > 0) ? (
          <ListErrors
            toggleErrors={this.toggleErrors}
            isShowModalErrors={isShowModalErrors}
            listItemErrorModal={listItemErrorModal}
          />
        )
          : ('')}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  listApplyType: state.merchantCommon.listApplyType,
  listMerchantMcc: state.addMerchant.listMerchantMcc,
  listMerchantName: state.addMerchant.listMerchantName,
  dataInfoGeneral: state.addMerchant.dataInfoGeneral,
  dataResponseUploadFile: state.addMerchant.dataResponseUploadFile,
  responValidateFeeMerchant: state.addMerchant.responValidateFeeMerchant,
  dataMerchant: state.editMerchant.dataMerchant,
});

const mapDispatchToProps = (dispatch) => ({
  getListMerchantMcc: () => dispatch(getListMerchantMcc()),
  getApplyTypeMerchant: () => dispatch(getApplyTypeMerchant()),
  getListMerchantNameByTypeCode: (data) => dispatch(getListMerchantNameByTypeCode(data)),
  saveListFeeMerchantName: (data) => dispatch(saveListFeeMerchantName(data)),
  getFileUploadMerchant: (data) => dispatch(getFileUploadMerchant(data)),
  storeListMerchantLocal: (data) => dispatch(storeListMerchantLocal(data)),
  getInfoApplyMerchant: (data) => dispatch(getInfoApplyMerchant(data)),
  validateAddFeeMerchant: (data) => dispatch(validateAddFeeMerchant(data)),
  onCLickchangeValueApplyType: (data) => dispatch(onCLickchangeValueApplyType(data))
});


TypeApply.propTypes = {
  getListMerchantMcc: PropTypes.func,
  listMerchantMcc: PropTypes.any,
  getListMerchantNameByTypeCode: PropTypes.any,
  listMerchantName: PropTypes.any,
  saveListFeeMerchantName: PropTypes.any,
  dataInfoGeneral: PropTypes.any,
  getFileUploadMerchant: PropTypes.any,
  dataResponseUploadFile: PropTypes.any,
  storeListMerchantLocal: PropTypes.func,
  getInfoApplyMerchant: PropTypes.func,
  validateAddFeeMerchant: PropTypes.func,
  responValidateFeeMerchant: PropTypes.object,
  onCLickchangeValueApplyType: PropTypes.func,
  dataMerchant: PropTypes.object,
  getApplyTypeMerchant: PropTypes.func,
  listApplyType: PropTypes.array,
};
TypeApply.defaultProps = {
  listMerchantMcc: null,
  getListMerchantNameByTypeCode: null,
  listMerchantName: null,
  saveListFeeMerchantName: null,
  dataInfoGeneral: null,
  getFileUploadMerchant: null,
  dataResponseUploadFile: null,
  responValidateFeeMerchant: {},
  listApplyType: [],
  getListMerchantMcc: () => {},
  storeListMerchantLocal: () => {},
  getInfoApplyMerchant: () => {},
  validateAddFeeMerchant: () => {},
  onCLickchangeValueApplyType: () => {},
  dataMerchant: null,
  getApplyTypeMerchant: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TypeApply));
