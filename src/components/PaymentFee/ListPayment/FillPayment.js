/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import Select from 'react-select';
import {
  Row, Col, Input,
  FormGroup, Label, Button,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import {
  loadFeeNameMerchant, loadTypeSource, loadTypeChannel, textMerchantName, loadMerchantStatus, searchByButton, clickToDownloadExcelFile,
} from '../../../store/actions/actionMerchantList';
import { getListBank } from '../../../store/actions/actionMerchantCommon';
import { convertDateTimeFormat, convertValueToString, convertArrayValueToString } from '../../../utils/commonFunction';


class FillPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeName: null,
      typeSource: null,
      payChannel: null,
      arrayMerchant: null,
      arrayMerchantStatus: null,
      merchantCode: '',
      data: {
        feeCode: '',
        typeSourceApi: '',
        payChannelApi: '',
        status: 0,
        applyDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        expirationDate: new Date(),
        contract: '',
      },
      errorTime: '',
    };
  }

  componentDidMount() {
    const {
      loadFeeNameMerchant, loadTypeSource, loadTypeChannel, loadMerchantStatus, getListBank,
    } = this.props;
    loadFeeNameMerchant();
    loadTypeSource();
    loadTypeChannel();
    loadMerchantStatus();
    getListBank();
  }

  static getDerivedStateFromProps(props) {
    const {
      feeName, typeSource, payChannel, arrayMerchantName, status, listBanks,
    } = props;
    const updateName = [{value: '00', label: 'Tất cả'}];
    const updateListBanks = [{value: '00', label: 'Tất cả'}];
    const updateSource = [{value: '00', label: 'Tất cả'}];
    const updateChannel = [{value: '00', label: 'Tất cả'}];
    const updateMerchant = [{value: '00', label: 'Tất cả'}];
    const updateMerchantStatus = [{value: '00', label: 'Tất cả'}];
    if (feeName) {
      for (let i = 0; i < feeName.length; i += 1) {
        updateName.push({ value: feeName[i].feeCode, label: `${feeName[i].feeCode} - ${feeName[i].feeName}` });
      }
    }
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
    if (arrayMerchantName) {
      for (let i = 0; i < arrayMerchantName.length; i += 1) {
        updateMerchant.push({ value: arrayMerchantName[i].merchantCode, label: `${arrayMerchantName[i].merchantCode}- ${arrayMerchantName[i].merchantName}` });
      }
    }
    if (status) {
      for (let i = 0; i < status.length; i += 1) {
        updateMerchantStatus.push({ value: status[i].code, label: status[i].description });
      }
    }

    if (listBanks) {
      for (let i = 0; i < listBanks.length; i += 1) {
        updateListBanks.push({ value: listBanks[i].bankCode, label: listBanks[i].bankName });
      }
    }
    return {
      feeName: updateName,
      typeSource: updateSource,
      payChannel: updateChannel,
      arrayMerchant: updateMerchant,
      arrayMerchantStatus: updateMerchantStatus,
      listBanks: updateListBanks,
    };
  }

  componentDidUpdate(prevProps) {
    const { dataExcelFile } = this.props;
    const { typeSource, arrayMerchantStatus, payChannel } = this.state;
    if (prevProps.dataExcelFile !== dataExcelFile) {
      const arrayData = this.convertDataToArray(dataExcelFile.list, payChannel, typeSource, arrayMerchantStatus);
      const columName = ['STT', 'Tên Merchant', 'Kênh thanh toán', 'Hình thức thanh toán', 'Số HD/PL/CV', 'Ngày kí', 'Ngày áp dụng', 'Ngày hết hạn', 'Mức phí', 'Người Tạo', 'Trạng thái'];
      const totalArray = [[...columName], ...arrayData];
      const ws = XLSX.utils.aoa_to_sheet(totalArray);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'PaymentList.xlsx');
    }
  }

  convertDataToArray = (data, arrayConvertChannel, arrayConvertTypeSource, arrayConvertTypeStatus) => {
    const finalArray = data.map((item, index) => {
      const convertPayChannel = convertValueToString(arrayConvertChannel, item.payChannel);
      const convertTypeSource = convertArrayValueToString(arrayConvertTypeSource, item.typeSource);
      const convertStatus = convertValueToString(arrayConvertTypeStatus, item.status);
      return [index + 1, item.merchantName, convertPayChannel, convertTypeSource, item.contract, item.signDate, item.applyDate, item.expirationDate, item.feeName, item.createUser, convertStatus];
    });
    return finalArray;
  };

  selectFeeCodeOrName = (event) => {
    if(event.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          feeCode: '',
        },
      });
    }
    else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          feeCode: event.value,
        },
      });
    }
  };

  selectPayChannel = (event) => {
    if( event.value === '00') {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          payChannelApi: '',
        },
      });
    }
    else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          payChannelApi: event.value,
        },
      });
    }
  };

  selectTypeSource = (event) => {
  if(event.value === '00') {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        typeSourceApi: '',
      },
    });
  }
  else {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        typeSourceApi: event.value,
      },
    });
  }
  };

  selectStatus = (event) => {
   if(event.value === '00') {
     this.setState({
       ...this.state,
       data: {
         ...this.state.data,
         status: '',
       },
     });
   } else {
     this.setState({
       ...this.state,
       data: {
         ...this.state.data,
         status: event.value,
       },
     });
   }
  };

  onChangeContract = (event) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        contract: event.target.value,
      },
    });
  };

  selectMerchantName = (event) => {
    const { textMerchantName } = this.props;
   if(event.value === '00') {
     this.setState({
       merchantCode: '',
       merchantCodeLabel: event.label,
     }, () => textMerchantName(this.state.merchantCode));
   }
   else {
     this.setState({
       merchantCode: event.value,
       merchantCodeLabel: event.label,
     }, () => textMerchantName(this.state.merchantCode));
   }
  };

  inputMerchantName = (event) => {
    const { textMerchantName } = this.props;
    if (event !== '') {
      this.setState({
        merchantCode: event,
      }, () => textMerchantName(this.state.merchantCode));
    }
  };

  handleChangeExpirationDate = (date) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        expirationDate: date,
      },
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

  onHandleSearch = () => {
    const { merchantCode } = this.state;
    const { searchByButton, currentPage, perPage } = this.props;
    const {
      feeCode, typeSourceApi, payChannelApi, status, applyDate, expirationDate, contract,
    } = this.state.data;

    if (applyDate.getTime() > expirationDate.getTime()) {
      this.setState({
        errorTime: 'Khoảng thời gian tìm kiếm không hợp lệ',
      });
    } else {
      const data = {
        merchantCode,
        feeCode,
        typeSource: typeSourceApi,
        payChannel: payChannelApi,
        status,
        applyDate: convertDateTimeFormat(applyDate),
        expirationDate: convertDateTimeFormat(expirationDate),
        contract,
        fromRow: 1 * perPage - perPage,
        toRow: 1 * perPage,

      };
      this.setState({
        errorTime: '',
      });
      searchByButton(data);
    }
  };

  addButtonAction = () => {
    const { history } = this.props;
    history.push({
      pathname: '/payment/add-payment-merchant',
    });
  };

  exportFile = async () => {
    const { clickToDownloadExcelFile, dataSearch } = this.props;
    await clickToDownloadExcelFile(dataSearch);
  };

  render() {
    const {
      isClearable,
      feeName, typeSource, payChannel, arrayMerchant, merchantCode, arrayMerchantStatus, errorTime, merchantCodeLabel, listBanks,
    } = this.state;

    const { applyDate, expirationDate } = this.state.data;
    return (
      <Row>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Đơn vị TT</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectFeeCodeOrName}
                options={ listBanks}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Mức phí</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectTypeSource}
                options={typeSource}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Kênh thanh toán</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectPayChannel}
                options={payChannel}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Số HD/PL/CV</Label>
            </Col>
            <Col lg="6">
              <Input onChange={this.onChangeContract} />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">MCC nội địa</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectMerchantName}
                options={arrayMerchant}
                onInputChange={this.inputMerchantName}
                placeholder="Tất cả"
                value={{
                  value: merchantCode,
                  label: merchantCodeLabel,
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Ngày áp dụng</Label>
            </Col>
            <Col lg="6">
              <DatePicker
                selected={applyDate}
                onChange={this.handleChangeAddDate}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Ngày hết hạn</Label>
            </Col>
            <Col lg="6">
              <DatePicker
                selected={expirationDate}
                onChange={this.handleChangeExpirationDate}
                onSelect={this.handleSelect}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </FormGroup>
          <span className="text-danger">{errorTime}</span>
          <FormGroup row>
            <Col lg="6" className="label-left">
              <Label htmlFor="code">Trạng thái</Label>
            </Col>
            <Col lg="6">
              <Select
                onChange={this.selectStatus}
                options={arrayMerchantStatus}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>
        <div className="wrap-button btn-search" style={{ width: '100%' }}>
          <div>
            <Button className="icon-search btn btn-primary" onClick={this.onHandleSearch}>
              <i className="fa fa-search mr-1" />
                    Tìm kiếm
            </Button>
          </div>
          <div>
            <Button className="icon-search btn btn-primary" onClick={this.addButtonAction}>
              <i className="fa fa-plus mr-1" />
                    Thêm mới
            </Button>
          </div>
          <div>
            <Button className="button-excel" onClick={this.exportFile}>
              <i className="fa fa-file-excel-o mr-1" />
                    Xuất excel
            </Button>
          </div>
        </div>
      </Row>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  listBanks: state.merchantCommon.listBanks,
  feeName: state.merchantList.feeName,
  typeSource: state.merchantList.typeSource,
  payChannel: state.merchantList.payChannel,
  arrayMerchantName: state.merchantList.arrayMerchantName,
  status: state.merchantList.status,
  dataSearch: state.merchantList.dataSearch,
  dataExcelFile: state.merchantList.dataExcelFile,
});

const mapDispatchToProps = (dispatch) => ({
  getListBank: () => dispatch(getListBank()),
  loadFeeNameMerchant: () => dispatch(loadFeeNameMerchant()),
  loadTypeSource: () => dispatch(loadTypeSource()),
  loadTypeChannel: () => dispatch(loadTypeChannel()),
  textMerchantName: (data) => dispatch(textMerchantName(data)),
  loadMerchantStatus: () => dispatch(loadMerchantStatus()),
  searchByButton: (data) => dispatch(searchByButton(data)),
  clickToDownloadExcelFile: (data) => dispatch(clickToDownloadExcelFile(data)),
});


FillPayment.propTypes = {
  loadFeeNameMerchant: PropTypes.func.isRequired,
  feeName: PropTypes.array,
  loadTypeSource: PropTypes.func.isRequired,
  typeSource: PropTypes.array,
  loadTypeChannel: PropTypes.func.isRequired,
  payChannel: PropTypes.array,
  textMerchantName: PropTypes.func.isRequired,
  arrayMerchantName: PropTypes.array,
  loadMerchantStatus: PropTypes.func.isRequired,
  status: PropTypes.array,
  searchByButton: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  clickToDownloadExcelFile: PropTypes.func,
  dataSearch: PropTypes.object,
  dataExcelFile: PropTypes.object,
  history: PropTypes.object,
  getListBank: PropTypes.func,
};

FillPayment.defaultProps = {
  feeName: null,
  typeSource: null,
  payChannel: null,
  arrayMerchantName: [],
  status: null,
  clickToDownloadExcelFile: () => {},
  dataSearch: null,
  dataExcelFile: null,
  history: '/merchant/sent-merchant-list',
  getListBank: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillPayment));
