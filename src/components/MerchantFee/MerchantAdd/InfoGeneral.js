/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row, Col, Input as RInput, FormGroup, Label,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import MultiSelect from '../../common/MultiSelect';
import {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents,
} from '../../common/CheckboxMultiSelect';
import { getClassifySigning } from '../../../store/actions/actionMerchantCommon';
import { getListMerchantByClassify, getInfoGeneralMerchant } from '../../../store/actions/actionAddMerchant';
import {
  loadTypeChannel,
  loadTypeSource,
} from '../../../store/actions/actionMerchantList';

class InfoGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionClassifySigned: null,
      classifySigning: [],
      signingDate: new Date(),
      applyDate: new Date(),
      expirationDate: new Date(),
      payChannel: null,
      typeSource: null,
      arrListClassify: [],
      contractNumber: '',
      feeCodeAndFeeName: '',
      payChannelSet: null,
      typePayment: null,
      activeFieldInfoGeneral: false,
    };
  }

  componentDidMount() {
    const {
      getClassifySigning,
      loadTypeChannel,
      loadTypeSource,
    } = this.props;
    getClassifySigning();
    loadTypeChannel();
    loadTypeSource();
  }


  static getDerivedStateFromProps(props, state) {
    const {
      classifySigning,
      payChannel,
      typeSource,
      listMerchantByClassify,
    } = props;

    const updateChannel = [];
    const updateSource = [];
    const tempArrListClassify = [];

    if (typeSource) {
      for (let i = 0; i < typeSource.length; i += 1) {
        updateSource.push({ value: typeSource[i].code, label: typeSource[i].description });
      }
    }

    if (payChannel) {
      for (let i = 0; i < payChannel.length; i += 1) {
        updateChannel.push({ value: payChannel[i].code, label: payChannel[i].description });
      }
    }

    if (listMerchantByClassify) {
      for (let i = 0; i < listMerchantByClassify.length; i += 1) {
        tempArrListClassify.push(
          {
            value: listMerchantByClassify[i].feeCode,
            label: (`${listMerchantByClassify[i].feeCode}-${listMerchantByClassify[i].feeName}`),
          },
        );
      }
    }
    return {
      classifySigning,
      payChannel: updateChannel,
      typeSource: updateSource,
      arrListClassify: tempArrListClassify,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      optionClassifySigned,
      contractNumber,
      signingDate,
      feeCodeAndFeeName,
      applyDate,
      expirationDate,
      typePayment,
      payChannelSet,
    } = this.state;
    const { getInfoGeneralMerchant, listMerchantLocal } = this.props;
    const infoGeneral = {
      optionClassifySigned,
      contractNumber,
      signingDate: moment(signingDate).format('DD/MM/YYYY 00:00:00'),
      feeCodeAndFeeName,
      applyDate: moment(applyDate).format('DD/MM/YYYY 00:00:00'),
      expirationDate: moment(expirationDate).format('DD/MM/YYYY 23:59:59'),
      typePayment,
      payChannelSet,
    };

    if (prevProps.listMerchantLocal !== listMerchantLocal) {
      if (listMerchantLocal.length > 0) {
        this.setState({
          activeFieldInfoGeneral: true,
        });
      } else {
        this.setState({
          activeFieldInfoGeneral: false,
        });
      }
    }
    getInfoGeneralMerchant(infoGeneral);
  }

  handleChangeClassifySigned = (classifySignedSelected) => {
    const { getListMerchantByClassify } = this.props;
    if (classifySignedSelected) {
      this.setState({
        optionClassifySigned: classifySignedSelected,
      }, () => getListMerchantByClassify(classifySignedSelected.value));
    }
  };

  handleChangeContractNumber = (event) => {
    this.setState({
      contractNumber: event.target.value,
    });
  };

  handleChangeSigningDate = (signingDateSelected) => {
    const { applyDate, expirationDate } = this.state;
    this.setState({
      signingDate: signingDateSelected,
    });
    if (moment(signingDateSelected).isAfter(applyDate)) {
      this.setState({
        applyDate: signingDateSelected,
      });
    }
    if (moment(signingDateSelected).isAfter(expirationDate)) {
      this.setState({
        expirationDate: signingDateSelected,
      });
    }
  };

  handleChangeApplyDate = (applyDateSelected) => {
    const { signingDate, expirationDate } = this.state;
    this.setState({
      applyDate: applyDateSelected,
    });
    if (moment(signingDate).isAfter(applyDateSelected)) {
      this.setState({
        applyDate: signingDate,
      });
    }
    if (moment(applyDateSelected).isAfter(expirationDate)) {
      this.setState({
        expirationDate: applyDateSelected,
      });
    }
  };

  handleChangeFeeCodeAndFeeName = (feeCodeAndFeeNameSelected) => {
    this.setState({
      feeCodeAndFeeName: feeCodeAndFeeNameSelected,
    });
  };

  handleChangePayChannel = (payChannelSelected) => {
    this.setState({
      payChannelSet: payChannelSelected,
    });
  }

  handleChangeExpirationDate = (expirationDateSelected) => {
    this.setState({
      expirationDate: expirationDateSelected,
    });
  };

  handleChangeTypePayment = (typePaymentSelected) => {
    this.setState({
      typePayment: typePaymentSelected,
    });
  };

  render() {
    const {
      typePayment,
      classifySigning,
      signingDate,
      applyDate,
      expirationDate,
      payChannel,
      typeSource,
      arrListClassify,
      activeFieldInfoGeneral,
    } = this.state;
    let optionsClassifySign = null;
    optionsClassifySign = classifySigning && classifySigning.map(
      (classify, index) => (
        {
          value: parseInt(classify.code, 10),
          label: classify.description,
        }
      ),
    );
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
                <CreatableSelect
                  options={optionsClassifySign}
                  onChange={this.handleChangeClassifySigned}
                  // isClearable
                  isDisabled={!!activeFieldInfoGeneral}
                />
                <Label className="permission-title">
                  <RInput
                    type="checkbox"
                    disabled
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
                  type="text"
                  className="form-control"
                  maxLength={20}
                  onChange={this.handleChangeContractNumber}
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
              </Col>
              <Col md="8">
                <DatePicker
                  selected={signingDate}
                  onChange={this.handleChangeSigningDate}
                  className="form-control"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  disabled={!!activeFieldInfoGeneral}
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
                </Label>
              </Col>
              <Col lg="8">
                <CreatableSelect
                  options={arrListClassify}
                  isValidNewOption={() => false}
                  isClearable
                  onChange={this.handleChangeFeeCodeAndFeeName}
                  isDisabled={!!activeFieldInfoGeneral}
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
              </Col>
              <Col md="8">
                <DatePicker
                  selected={applyDate}
                  onChange={this.handleChangeApplyDate}
                  className="form-control"
                  minDate={signingDate}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  disabled={!!activeFieldInfoGeneral}
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
                  selected={expirationDate}
                  onChange={this.handleChangeExpirationDate}
                  className="form-control"
                  minDate={applyDate}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  disabled={!!activeFieldInfoGeneral}
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
                </Label>
              </Col>
              <Col lg="8">
                <div
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                >
                  <MultiSelect
                    options={typeSource}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                      MultiValue,
                      ValueContainer,
                      animatedComponents,
                    }}
                    onChange={this.handleChangeTypePayment}
                    allowSelectAll
                    value={typePayment}
                    isDisabled={!!activeFieldInfoGeneral}
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
                  <span style={{ color: 'red' }}>
                    *
                  </span>
                </Label>
              </Col>
              <Col lg="8">
                <CreatableSelect
                  options={payChannel}
                  isClearable
                  onChange={this.handleChangePayChannel}
                  isDisabled={!!activeFieldInfoGeneral}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  classifySigning: state.merchantCommon.classifySigning,
  payChannel: state.merchantList.payChannel,
  typeSource: state.merchantList.typeSource,
  listMerchantByClassify: state.addMerchant.listMerchantByClassify,
  listMerchantLocal: state.addMerchant.listMerchantLocal,
});

const mapDispatchToProps = (dispatch) => ({
  getClassifySigning: () => dispatch(getClassifySigning()),
  loadTypeChannel: () => dispatch(loadTypeChannel()),
  loadTypeSource: () => dispatch(loadTypeSource()),
  getListMerchantByClassify: (data) => dispatch(getListMerchantByClassify(data)),
  getInfoGeneralMerchant: (data) => dispatch(getInfoGeneralMerchant(data)),
});

InfoGeneral.propTypes = {
  getClassifySigning: PropTypes.func.isRequired,
  loadTypeChannel: PropTypes.func.isRequired,
  loadTypeSource: PropTypes.func.isRequired,
  classifySigning: PropTypes.any,
  payChannel: PropTypes.any,
  typeSource: PropTypes.any,
  getListMerchantByClassify: PropTypes.any,
  listMerchantByClassify: PropTypes.any,
  getInfoGeneralMerchant: PropTypes.any,
  listMerchantLocal: PropTypes.array,
};
InfoGeneral.defaultProps = {
  classifySigning: null,
  payChannel: null,
  typeSource: null,
  getListMerchantByClassify: null,
  listMerchantByClassify: null,
  getInfoGeneralMerchant: null,
  listMerchantLocal: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoGeneral));
