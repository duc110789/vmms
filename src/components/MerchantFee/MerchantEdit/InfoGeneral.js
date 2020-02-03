/* eslint-disable */
import React, { Component } from 'react';
import {
  Row, Col, Input as RInput, FormGroup, Label,
} from 'reactstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import MultiSelect from '../../common/MultiSelect';
import {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents,
} from '../../common/CheckboxMultiSelect';
import { convertClassifySigning, getTypeNameFee, convertValueToArray, checkDisableFieldByStatus } from '../../../utils/commonFunction';
import { getClassifySigning } from '../../../store/actions/actionMerchantCommon';
import { loadFeeCodeByClassify } from '../../../store/actions/actionEditMerchant';
import { getInfoGeneralMerchantInEditPage , getAvailableDataMerchant } from '../../../store/actions/actionAddMerchant'
import { clickToEditMerchant } from '../../../store/actions/actionMerchantList';
import {
  withRouter,
} from 'react-router-dom';

class InfoGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
      arrayFeeName: null,
      arrayTypeSource: null,
      arrayPayChannel: null,
      status: null,
      arrayClassifySigning: null,
      data: {
        id: '',
        classifySigning: null,
        contract: '',
        applyDate: new Date(),
        signDate: new Date(),
        expirationDate: new Date(),
        typeSource: [],
        typeChannel: null,
        feeName: '',
        feeCode: '',
        merchantStatus:'',
        additionalSigning: 0,
        status:'',
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
        arrayTypeSource, arrayPayChannel, status, arrayClassifySigning, dataFeeCodeByClassify,
} = props;
    const updateName = [];
    const updateChannel = [];
    const updateMerchantStatus = [];
    const updateSource = [];
    const updateClassifySign = [];
    if (dataFeeCodeByClassify) {
      for (let i = 0; i < dataFeeCodeByClassify.length; i += 1) {
        updateName.push({ value: dataFeeCodeByClassify[i].feeCode, label: `${dataFeeCodeByClassify[i].feeCode} - ${dataFeeCodeByClassify[i].feeName}`, name: dataFeeCodeByClassify[i].feeName });
      }
    }
    if (arrayTypeSource) {
      for (let i = 0; i < arrayTypeSource.length; i += 1) {
        updateSource.push({ value: arrayTypeSource[i].code, label: arrayTypeSource[i].description });
      }
    }
    if (arrayPayChannel) {
      for (let i = 0; i < arrayPayChannel.length; i += 1) {
        updateChannel.push({ value: arrayPayChannel[i].code, label: arrayPayChannel[i].description });
      }
    }
    if (status) {
      for (let i = 0; i < status.length; i += 1) {
        updateMerchantStatus.push({ value: status[i].code, label: status[i].description });
      }
    }
    if (arrayClassifySigning) {
      for (let i = 0; i < arrayClassifySigning.length; i += 1) {
        updateClassifySign.push({ value: arrayClassifySigning[i].code, label: arrayClassifySigning[i].description });
      }
    }
    return {
      arrayFeeName: updateName,
      arrayTypeSource: updateSource,
      arrayPayChannel: updateChannel,
      status: status,
      arrayClassifySigning: updateClassifySign,
    };
  }

  componentDidMount() {
   const { classifySigning, feeCodeByClassify, tdata } = this.props;
   const { arrayTypeSource } = this.state;
    classifySigning();
    if (tdata  && tdata.data) {
      feeCodeByClassify(tdata.data.classifySigning);
      this.setState({
        ...this.state,
        data: {
          id: tdata.data.id,
          classifySigning: tdata.data.classifySigning,
          contract: tdata.data.contract,
          applyDate: moment(tdata.data.applyDate, ['DD/MM/YYYY','MM/DD/YYYY']).format('MM/DD/YYYY'),
           signDate: moment(tdata.data.signDate, ['DD/MM/YYYY','MM/DD/YYYY']).format('MM/DD/YYYY'),
           expirationDate: moment(tdata.data.expirationDate, ['DD/MM/YYYY','MM/DD/YYYY']).format('MM/DD/YYYY'),
          typeSource: convertValueToArray( arrayTypeSource, tdata.data.typeSource),
          typeChannel: tdata.data.payChannel,
          feeName: tdata.data.feeName,
          feeCode: tdata.data.feeCode,
          merchantStatus: tdata.data.status,
          additionalSigning: tdata.data.additionalSigning,
          status: tdata.data.status,
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { classifySigning, contract, applyDate, signDate, expirationDate, feeCode, feeName, typeSource, typeChannel, id, additionalSigning, status} = this.state.data;
    const { inforMerchantInEditPage, tdata, availableDataMerchant, isConfirmLock, clickToEditMerchant, isSuccess} = this.props;
    const dataMerchant = [];
    console.log('tdata', tdata);
    if(tdata && tdata.list && tdata.list.length >0) {
      for(let i = 0; i < tdata.list.length; i +=1) {
        dataMerchant.push({value: tdata.list[i].merchantCode, name: tdata.list[i].merchantCode, status: tdata.list[i].status, id: tdata.list[i].merchantFeeId, isValid: tdata.list[i].isValid})
      }
    }
    availableDataMerchant(dataMerchant);
    const sentData = {
      id,
      optionClassifySigned: classifySigning,
      contractNumber: contract,
      feeCode,
      feeName,
      signingDate: moment(signDate).format('DD/MM/YYYY 00:00:00'),
      feeCodeAndFeeName: { value: feeCode, label: `${feeCode}-${feeName}`},
      applyDate:moment(applyDate).format('DD/MM/YYYY 00:00:00'),
      expirationDate: moment(expirationDate).format('DD/MM/YYYY 23:59:59'),
      typePayment: typeSource,
      payChannelSet: typeChannel,
      additionalSigning,
      status,
    };
    inforMerchantInEditPage(sentData);
    if(prevProps.isConfirmLock !== isConfirmLock) {
      clickToEditMerchant(tdata.data.id)
    }
  }


  handleChange = (selected) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        typeSource: selected,
      }
    });
  };

  handleChangeAddDate = (date) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        applyDate: date,
      },
    });
  };

  onhandleChangeSignDate = (date) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        signDate: date,
      },
    });
  };

  onhandleChangeExpirationDate = (date) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        expirationDate: date,
      },
    });
  };

  onHandleChangeClassifySigning = (event) => {
    const { feeCodeByClassify } = this.props;
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        classifySigning: parseInt(event.value, 10),
      }
    }, () => feeCodeByClassify(this.state.data.classifySigning))
  };
  onChangeContract = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        contract: event.target.value,
      },
    });
  }

  selectFeeCodeOrName = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        feeCode: event.value,
        feeName: event.name,
      },
    });
  };

  selectPayChannel = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        typeChannel: event.value,
      },
    });
  };

  onHandleCheckBox = () => {
    const { data } = this.state;
    data.additionalSigning === 0 ? this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        additionalSigning: 1
      }
    }) : this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        additionalSigning: 0
      }
    })
  };




  render() {
    const {  arrayFeeName, arrayTypeSource, arrayPayChannel, status, data, arrayClassifySigning  } = this.state;
    return (
      <div className="border gp-add-merchant-info">
        <h5 className="mb-3">Thông Tin Chung</h5>
        <Row>
          <Col md="6">
            <FormGroup row>
              <Col lg="4" className="label-left">
                <Label>
                  Phân loại ký kết
                  <span style={{ color: 'red' }}>
                    *
                  </span>
                  :
                </Label>
              </Col>
              <Col lg="8">
                <Select
                  value={{
                    value: data.classifySigning,
                    label: convertClassifySigning(data.classifySigning),
                  }}
                  options={arrayClassifySigning}
                  onChange={this.onHandleChangeClassifySigning}
                  isDisabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                />
                <Label className="permission-title">
                  <RInput
                    type="checkbox"
                    onChange={this.onHandleCheckBox}
                    disabled={data.merchantStatus !== 1}
                  />
                  <div className="mt-2">Bổ sung kí kết</div>
                </Label>
              </Col>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup row>
              <Col md="4">
                Số HD/PL/CV
                <span style={{ color: 'red' }}>
                  *
                </span>
                :
              </Col>
              <Col md="8">
                <RInput
                  label="Fee Code"
                  type="text"
                  className="form-control"
                  value={data.contract}
                  onChange={this.onChangeContract}
                  disabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                  style={ checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning) ? {backgroundColor: '#F0FFFF'} : {backgroundColor: 'white'}}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup row>
              <Col md="4">
                Ngày kí:
                <span style={{ color: 'red' }}>
                  *
                </span>
                :
              </Col>
              <Col md="8">
                <DatePicker
                  selected={new Date(data.signDate)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  onChange={this.onhandleChangeSignDate}
                  disabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="4" className="label-left">
                <Label>
                  Mã phí - Tên mức phí
                  <span style={{ color: 'red' }}>
                    *
                  </span>
                  :
                </Label>
              </Col>
              <Col lg="8">
                <Select
                  value={{
                    value: data.feeCode,
                    label: `${data.feeCode} - ${data.feeName}`,
                  }}
                  options={arrayFeeName}
                  onChange={this.selectFeeCodeOrName}
                  isDisabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup row>
              <Col md="4">
                Ngày áp dụng:
                <span style={{ color: 'red' }}>
                  *
                </span>
                :
              </Col>
              <Col md="8">
                <DatePicker
                  selected={new Date(data.applyDate)}
                  className="form-control"
                  onChange={this.handleChangeAddDate}
                  dateFormat="dd/MM/yyyy"
                  disabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup row>
              <Col md="4">
                Ngày hết hạn:
              </Col>
              <Col md="8">
                <DatePicker
                  selected={new Date(data.expirationDate)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  onChange={this.onhandleChangeExpirationDate}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="4" className="label-left">
                <Label>
                  Hình thức thanh toán:
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
                >
                  <MultiSelect
                    options={arrayTypeSource}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                      MultiValue,
                      ValueContainer,
                      animatedComponents,
                    }}
                    onChange={this.handleChange}
                    allowSelectAll
                    value={data.typeSource}
                    isDisabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                  />
                </div>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup row>
              <Col lg="4" className="label-left">
                <Label>
                  Kênh thanh toán:
                </Label>
              </Col>
              <Col lg="8">
                <Select
                  value={{
                    value: data.typeChannel,
                    label: getTypeNameFee(this.props.arrayPayChannel, data.typeChannel),
                  }}
                  options={arrayPayChannel}
                  onChange={this.selectPayChannel}
                  isDisabled={checkDisableFieldByStatus(data.merchantStatus, data.additionalSigning)}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  arrayFeeName: state.merchantList.feeName,
  arrayTypeSource: state.merchantList.typeSource,
  arrayPayChannel: state.merchantList.payChannel,
  arrayMerchantName: state.merchantList.arrayMerchantName,
  status: state.merchantList.status,
  arrayClassifySigning: state.merchantCommon.classifySigning,
  dataFeeCodeByClassify: state.editMerchant.feeCodeByClassify,
  isConfirmLock: state.controlModal.isConfirmLock,
});

const mapDispatchToProps = (dispatch) => ({
  classifySigning: () => dispatch(getClassifySigning()),
  feeCodeByClassify: (data) => dispatch(loadFeeCodeByClassify(data)),
  inforMerchantInEditPage: (data) => dispatch(getInfoGeneralMerchantInEditPage(data)),
  availableDataMerchant: (data) => dispatch(getAvailableDataMerchant(data)),
  clickToEditMerchant: (data) => dispatch(clickToEditMerchant(data))
});

InfoGeneral.propTypes = {
  tdata: PropTypes.object,
  arrayFeeName: PropTypes.array,
  arrayTypeSource: PropTypes.array,
  arrayPayChannel: PropTypes.array,
  arrayMerchantName: PropTypes.array,
  status: PropTypes.array,
  arrayClassifySigning: PropTypes.array,
  classifySigning: PropTypes.func,
  feeCodeByClassify: PropTypes.func,
  dataFeeCodeByClassify: PropTypes.array,
  inforMerchantInEditPage: PropTypes.func,
  availableDataMerchant: PropTypes.func,
  isConfirmLock: PropTypes.bool,
  clickToEditMerchant: PropTypes.func,
};

InfoGeneral.defaultProps = {
  arrayFeeName: null,
  arrayTypeSource: null,
  arrayPayChannel: null,
  status: null,
  arrayMerchantName: [],
  arrayClassifySigning: [],
  convertClassifySigning: () =>{},
  tdata: null,
  feeCodeByClassify: () =>{},
  dataFeeCodeByClassify: null,
  inforMerchantInEditPage: () => {},
  availableDataMerchant: () => {},
  isConfirmLock: null,
  clickToEditMerchant: () => {},
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoGeneral));
