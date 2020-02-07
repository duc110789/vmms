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
  loadTypeChannel,
  loadTypeSource,
} from '../../../store/actions/actionMerchantList';
import {
  getAllMccVmms,
  getFeeCodeFeeNameVmms,
  addMccNational,
  applyListMcc,
} from '../../../store/actions/actionMerchantCommon';

class InfoFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payChannel: null,
      payChannelSet: null,
      typePayment: null,
      feeCodeAndFeeName: null,
      mccNational: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      payChannel,
      typeSource,
      listMcc,
      listFeeCodeFeeNameVmms,
    } = props;

    const updateChannel = [];
    const updateSource = [];
    const updateListMccVmms = [];
    const updateListFeeCodeFeeName = [];


    if (payChannel) {
      for (let i = 0; i < payChannel.length; i += 1) {
        updateChannel.push({ value: payChannel[i].code, label: payChannel[i].description });
      }
    }

    if (typeSource) {
      for (let i = 0; i < typeSource.length; i += 1) {
        updateSource.push({ value: typeSource[i].code, label: typeSource[i].description });
      }
    }

    if (listMcc) {
      for (let i = 0; i < listMcc.length; i += 1) {
        updateListMccVmms.push({ value: listMcc[i].mccCode, label: listMcc[i].mccCode + '-' + listMcc[i].mccName, key: i });
      }
    }

    if (listFeeCodeFeeNameVmms) {
      for (let i = 0; i < listFeeCodeFeeNameVmms.length; i += 1) {
        updateListFeeCodeFeeName.push(
          { value: listFeeCodeFeeNameVmms[i].feeCode, label: listFeeCodeFeeNameVmms[i].feeCode + '-' + listFeeCodeFeeNameVmms[i].feeName, feeName: listFeeCodeFeeNameVmms[i].feeName, key: i }
        );
      }
    }

    return {
      payChannel: updateChannel,
      typeSource: updateSource,
      listMcc: updateListMccVmms,
      listFeeCodeFeeNameVmms: updateListFeeCodeFeeName,
    };
  }

  componentDidMount() {
    const {
      loadTypeChannel,
      loadTypeSource,
    } = this.props;

    loadTypeChannel();
    loadTypeSource();
  }

  componentDidUpdate(prevProps) {
    const { dataInfoGeneral, getAllMccVmms, getFeeCodeFeeNameVmms, } = this.props;

    if(prevProps.dataInfoGeneral !== dataInfoGeneral ) {
      if(dataInfoGeneral.unitPayment !== '') {
        getAllMccVmms(dataInfoGeneral.unitPayment.value);
      }
      if(dataInfoGeneral.optionClassifySigned !== null) {
        getFeeCodeFeeNameVmms(dataInfoGeneral.optionClassifySigned.value);
      }
    }
  }

  handleChangePayChannel = (payChannelSelected) => {
    this.setState({
      payChannelSet: payChannelSelected,
    });
  }

  handleChangeTypePayment = (typePaymentSelected) => {
    this.setState({
      typePayment: typePaymentSelected,
    });
  };

  handleChangeMccNational = (mmcNationalSelected) => {
    this.setState({
      mccNational: mmcNationalSelected,
    });
  };

  handleChangeFeeCodeAndFeeName = (feeCodeAndFeeNameSelected) => {
    this.setState({
      feeCodeAndFeeName: feeCodeAndFeeNameSelected,
    });
  };

  applyListMerchant = () => {
    const { dataInfoGeneral, addMccNational, applyListMcc } = this.props;
    const { payChannelSet, typePayment, mccNational, feeCodeAndFeeName, listMcc } = this.state;
    if(payChannelSet !== null && typePayment !== null && mccNational.length > 0 && feeCodeAndFeeName !== null) {
      const infoFee = [{
        payChannelSet,
        typePayment,
        mccNational,
        feeCodeAndFeeName
      }];

      applyListMcc({mccNational, feeCodeAndFeeName});
      this.setState({
        mccNational: [],
        feeCodeAndFeeName: null,
      });
      addMccNational(infoFee);
    }
  };

  render() {
    const {
      payChannel,
      typeSource,
      typePayment,
      listMcc,
      listFeeCodeFeeNameVmms,
      feeCodeAndFeeName,
      mccNational,
    } = this.state;

    return (
      <>
        <Col md={{ size: 6 }}>
          <FormGroup row>
            <Col lg="4" className="label-left">
              <Label>
                Kênh thanh toán
              </Label>
            </Col>
            <Col lg="8">
              <CreatableSelect
                options={payChannel}
                isClearable
                onChange={this.handleChangePayChannel}
                // isDisabled={!!activeFieldInfoGeneral}
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
                  // isDisabled={!!activeFieldInfoGeneral}
                />
              </div>
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
                options={listFeeCodeFeeNameVmms}
                isValidNewOption={() => false}
                isClearable
                onChange={this.handleChangeFeeCodeAndFeeName}
                value={feeCodeAndFeeName}
                // isDisabled={!!activeFieldInfoGeneral}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md={{ size: 6 }}>
          <FormGroup row>
            <Col lg="4" className="label-left">
              <Label>
                MCC nội địa
              </Label>
            </Col>
            <Col lg="8">
              <MultiSelect
                options={listMcc}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                  MultiValue,
                  ValueContainer,
                  animatedComponents,
                }}
                onChange={this.handleChangeMccNational}
                allowSelectAll
                value={mccNational}
                // isDisabled={!!activeFieldInfoGeneral}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md={12} className="text-center mt-3">
          <Button className="btn-primary" onClick={this.applyListMerchant}>Áp dụng</Button>
        </Col>
    </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  payChannel: state.merchantList.payChannel,
  typeSource: state.merchantList.typeSource,
  listMcc: state.merchantCommon.listMcc,
  listFeeCodeFeeNameVmms: state.merchantCommon.listFeeCodeFeeNameVmms,
  dataInfoGeneral: state.addMerchant.dataInfoGeneral,
});

const mapDispatchToProps = (dispatch) => ({
  loadTypeChannel: () => dispatch(loadTypeChannel()),
  loadTypeSource: () => dispatch(loadTypeSource()),
  getAllMccVmms: (data) => dispatch(getAllMccVmms(data)),
  getFeeCodeFeeNameVmms: (data) => dispatch(getFeeCodeFeeNameVmms(data)),
  addMccNational: (data) => dispatch(addMccNational(data)),
  applyListMcc: (data) => dispatch(applyListMcc(data)),
});


InfoFee.propTypes = {
  payChannel: PropTypes.any,
  loadTypeChannel: PropTypes.func.isRequired,
  loadTypeSource: PropTypes.func.isRequired,
  getAllMccVmms: PropTypes.func,
  getFeeCodeFeeNameVmms: PropTypes.func,
  addMccNational: PropTypes.func,
  applyListMcc: PropTypes.func,
};
InfoFee.defaultProps = {
  payChannel: null,
  listMerchantMcc: null,
  typeSource: null,
  getAllMccVmms: () => {},
  getFeeCodeFeeNameVmms: () => {},
  addMccNational: () => {},
  applyListMcc: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoFee));
