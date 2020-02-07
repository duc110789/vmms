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
  getMasterMerchant, getFeeCode, getStatus, getMCC
} from '../../../store/actions/actionVmmsListPage';
import { convertDateTimeFormat, convertValueToString, convertArrayValueToString } from '../../../utils/commonFunction';


class FillMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMasterMerchant: '',
      arrayFeeCode: '',
      arrayStatus:'',
      arrayMCC: '',
      data: {
        applyDate: '',
        expirationDate: '',
      }
    };
  }

  componentDidMount() {
    const {
      getMasterMerchant, getFeeCode,getStatus, getMCC
    } = this.props;
    getMasterMerchant();
    getFeeCode();
    getStatus();
    getMCC();
  }

  static getDerivedStateFromProps(props, state) {
    const {
      feeName, arrayFeeCode,arrayMasterMerchant,arrayStatus,arrayPropsMCC
    } = props;
    const arrayListMasterMerchant = [{value: '0', label: 'Tất cả'}];
    const arrayListFeeCode = [{value: '0', label: 'Tất cả'}];
    const arrayListStatus = [{value: '0', label: 'Tất cả'}];
    const ArrayListMCC = [{value: '0', label: 'Tất cả'}];
    const updateMerchantStatus = [{value: '00', label: 'Tất cả'}];
    if (arrayMasterMerchant) {
      for (let i = 0; i < arrayMasterMerchant.length; i += 1) {
        arrayListMasterMerchant.push({ value: arrayMasterMerchant[i].masterMerchantCode, label: `${arrayMasterMerchant[i].masterMerchantName}` });
      }
    }
    if (arrayFeeCode) {
      for (let i = 0; i < arrayFeeCode.length; i += 1) {
        arrayListFeeCode.push({ value: arrayFeeCode[i].feeCode, label: `${arrayFeeCode[i].feeName}` });
      }
    }
    if (arrayStatus) {
      for (let i = 0; i < arrayStatus.length; i += 1) {
        arrayListStatus.push({ value: arrayStatus[i].code, label: `${arrayStatus[i].description}` });
      }
    }
    if (arrayPropsMCC) {
      for (let i = 0; i < arrayPropsMCC.length; i += 1) {
        ArrayListMCC.push({ value: arrayPropsMCC[i].mccCode, label: `${arrayPropsMCC[i].mccName}` });
      }
    }

    return {
      arrayMasterMerchant: arrayListMasterMerchant,
      arrayFeeCode: arrayListFeeCode,
      arrayStatus: arrayListStatus,
      arrayMCC: ArrayListMCC,
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
      XLSX.writeFile(wb, 'MerchantList.xlsx');
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
      pathname: '/merchant/add-fee-merchant',
    });
  };

  exportFile = async () => {
    const { clickToDownloadExcelFile, dataSearch } = this.props;
    await clickToDownloadExcelFile(dataSearch);
  };

  render() {
    const {
      isClearable,
      feeName, payChannel, arrayMerchantStatus, errorTime, arrayMasterMerchant, arrayFeeCode, arrayStatus, arrayMCC
    } = this.state;

    const { applyDate, expirationDate } = this.state.data;
    return (
      <Row>
        <Col md="6">
          <FormGroup row>
            <Col lg="5" className="label-left">
              <Label htmlFor="code">MasterMerchant:</Label>
            </Col>
            <Col lg="7">
              <Select
                onChange={this.selectFeeCodeOrName}
                options={arrayMasterMerchant}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="5" className="label-left">
              <Label htmlFor="code">Mức Phí:</Label>
            </Col>
            <Col lg="7">
              <Select
                onChange={this.selectFeeCodeOrName}
                options={arrayFeeCode}
                isClearable={isClearable}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="5" className="label-left">
              <Label htmlFor="code">Số HD/PL/CV:</Label>
            </Col>
            <Col lg="7">
              <Input onChange={this.onChangeContract} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="5" className="label-left">
              <Label htmlFor="code">MCC nội địa</Label>
            </Col>
            <Col lg="7">
              <Select
                onChange={this.selectPayChannel}
                options={arrayMCC}
                placeholder="Tất cả"
              />
            </Col>
          </FormGroup>
        </Col>

        <Col md="6">
          <FormGroup row>
            <Col lg="5" className="label-left">
              <Label htmlFor="code">Ngày áp dụng:</Label>
            </Col>
            <Col lg="7">
              <DatePicker
                selected={applyDate}
                onChange={this.handleChangeAddDate}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col lg="5" className="label-left">
              <Label htmlFor="code">Ngày hết hạn:</Label>
            </Col>
            <Col lg="7">
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
            <Col lg="5" className="label-left">
              <Label htmlFor="code">Trạng thái:</Label>
            </Col>
            <Col lg="7">
              <Select
                onChange={this.selectStatus}
                options={arrayStatus}
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
  arrayMasterMerchant: state.vmmsPageList.arrayMasterMerchant,
  arrayFeeCode: state.vmmsPageList.arrayFeeCode,
  arrayStatus: state.vmmsPageList.arrayStatus,
  arrayPropsMCC: state.vmmsPageList.arrayMCC,
});

const mapDispatchToProps = (dispatch) => ({
  getMasterMerchant:() => dispatch(getMasterMerchant()),
  getFeeCode: () => dispatch(getFeeCode()),
  getStatus: () => dispatch(getStatus()),
  getMCC: () => dispatch(getMCC()),
});


FillMerchant.propTypes = {
  getMasterMerchant: PropTypes.func.isRequired,
  arrayMasterMerchant: PropTypes.object,
  getFeeCode: PropTypes.func.isRequired,
  arrayFeeCode: PropTypes.object,
  getStatus: PropTypes.func.isRequired,
  getMCC: PropTypes.func.isRequired,
  arrayPropsMCC: PropTypes.object,
};

FillMerchant.defaultProps = {
  arrayMasterMerchant: '',
  arrayFeeCode: '',
  arrayPropsMCC:'',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FillMerchant));
