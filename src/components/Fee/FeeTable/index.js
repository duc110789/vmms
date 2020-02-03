/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {
  Row, Col, Label, FormGroup, Button,
} from 'reactstrap';
import './index.scss';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import CONST_VARIABLE from '../../../utils/constants';
import Table from './Table';
import { getFeeTables, getFeeCode } from '../../../apis/fee-manager';
import { callApiCommon } from '../../../apis/commonApi';

class FeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeType: 0,
      tData: [],
      currentPage: 1,
      perPage: CONST_VARIABLE.DEFAULT_PERPAGE,
      totalRow: 0,
      classifySigning: 0,
      feeCode: '',
      status: 0,
      listFeeCodes: [],
      isSearch: false,
      paramsSearch: {},
      errorWhenClickAddButton: '',
    };
    this.getApiFeeTable = this.getApiFeeTable.bind(this);
    this.getFeeCodeBase = this.getFeeCodeBase.bind(this);
    this.addButtonAction = this.addButtonAction.bind(this);
    this.searchFee = this.searchFee.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeFeeCode = this.handleChangeFeeCode.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeFeeType = this.handleChangeFeeType.bind(this);
    this.handleChangeClassifySigning = this.handleChangeClassifySigning.bind(this);
    this.getDataTableNew = this.getDataTableNew.bind(this);
  }

  componentDidMount() {
    this.getApiFeeTable();
    this.getFeeCodeBase();
    callApiCommon();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      perPage, currentPage, feeType, classifySigning, status, feeCode, isSearch,
    } = this.state;
    let params = null;
    if (isSearch) {
      params = {
        toRow: currentPage * perPage,
        fromRow: perPage * currentPage - perPage,
        feeType,
        classifySigning,
        status,
        feeCode,
      };
    } else {
      params = {
        toRow: currentPage * perPage,
        fromRow: perPage * currentPage - perPage,
      };
    }
    if (prevState.perPage !== perPage || prevState.currentPage !== currentPage) {
      this.getApiFeeTable(params);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getDataTableNew(newTableData) {
    this.setState({
      tData: newTableData,
    });
  }

  async getFeeCodeBase(params = {}) {
    const feeCodes = await getFeeCode(params);
    this.setState({
      listFeeCodes: feeCodes.list,
    });
  }

  async getApiFeeTable(params) {
    const { perPage, currentPage } = this.state;
    const allParams = {
      toRow: currentPage * perPage,
      fromRow: perPage * currentPage - perPage,
      ...params,
    };
    const data = await getFeeTables(allParams);
    await this.setState({
      tData: data.list,
      totalRow: data.totalRow,
      paramsSearch: allParams,
    });
  }

  // eslint-disable-next-line react/sort-comp
  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  handleChangeFeeCode = (newValue) => {
    if (newValue !== null && newValue !== 'undefined') {
      this.setState({
        feeCode: newValue.value,
      });
    } else {
      this.setState({
        feeCode: '',
      });
    }
  };

  handleChangeStatus = (newValue) => {
    if (newValue !== null && newValue !== 'undefined') {
      this.setState({
        status: newValue.value,
      });
    } else {
      this.setState({
        status: 0,
      });
    }
  };

  handleChangeFeeType = (newValue) => {
    if (newValue !== null && newValue !== 'undefined') {
      this.setState({
        feeType: newValue.value,
      });
    } else {
      this.setState({
        feeType: 0,
      });
    }
  };

  handleChangeClassifySigning = (newValue) => {
    if (newValue !== null && newValue !== 'undefined') {
      this.setState({
        classifySigning: newValue.value,
      });
    } else {
      this.setState({
        classifySigning: 0,
      });
    }
  };

  async searchFee() {
    const {
      perPage, currentPage, feeType, classifySigning, status, feeCode,
    } = this.state;
    this.setState({
      isSearch: true,
    });
    if (currentPage !== 1) {
      setTimeout(() => {
        this.setState({
          currentPage: 1,
        });
      }, 200);
    }
    const allParamsSearch = {
      toRow: currentPage * perPage,
      fromRow: perPage * currentPage - perPage,
      feeType,
      classifySigning,
      status,
      feeCode,
    };

    const data = await getFeeTables(allParamsSearch);
    await this.setState({
      tData: data.list,
      totalRow: data.totalRow,
      paramsSearch: allParamsSearch,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addButtonAction() {
    const { history } = this.props;
    const { tData } = this.state;
    history.push({
      pathname: '/fee/list/add',
      data: tData,
    });
  }

  render() {
    const {
      tData, perPage, currentPage, listFeeCodes,
      totalRow, paramsSearch, errorWhenClickAddButton,
    } = this.state;
    const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE')) && localStorage.getItem('FEE_TYPE') ? JSON.parse(localStorage.getItem('FEE_TYPE')).map((feeTypeDes, index) => ({ value: parseInt(feeTypeDes.code, 10), label: feeTypeDes.description })) : null;
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')) && JSON.parse(localStorage.getItem('CLASSIFY_SIGNING')).map((classify, index) => ({ value: parseInt(classify.code, 10), label: classify.description }));
    const feeStatus = JSON.parse(localStorage.getItem('FEE_STATUS')) && JSON.parse(localStorage.getItem('FEE_STATUS')).map((Status, index) => ({ value: parseInt(Status.code, 10), label: Status.description }));
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    const arrFeeCode = listFeeCodes && listFeeCodes.map((feeCode, index) => ({ value: parseInt(feeCode.feeCode, 10), label: feeCode.feeName }));
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col md="6">
              <FormGroup row>
                <Col lg="5" className="label-left">
                  <Label htmlFor="code">Loại phí:</Label>
                </Col>
                <Col lg="7">
                  <CreatableSelect
                    isClearable
                    onChange={this.handleChangeFeeType}
                    options={getFeeType}
                    placeholder="Tất cả"
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Col lg="5" className="label-left">
                  <Label htmlFor="code">Phân loại ký kết:</Label>
                </Col>
                <Col lg="7">
                  <CreatableSelect
                    isClearable
                    onChange={this.handleChangeClassifySigning}
                    options={getClassifySigning}
                    placeholder="Tất cả"
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Col lg="5" className="label-left">
                  <Label htmlFor="code">Mức phí:</Label>
                </Col>
                <Col lg="7">
                  <CreatableSelect
                    isClearable
                    onChange={this.handleChangeFeeCode}
                    options={arrFeeCode}
                    placeholder="Tất cả"
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row>
                <Col lg="5" className="label-left">
                  <Label htmlFor="code">Trạng thái:</Label>
                </Col>
                <Col lg="7">
                  <CreatableSelect
                    isClearable
                    onChange={this.handleChangeStatus}
                    options={feeStatus}
                    placeholder="Tất cả"
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6" className="mb-3 mt-3">
              <FormGroup row>
                <Col className="text-right btn-search">
                  <Button
                    className="icon-search btn btn-primary"
                    onClick={this.searchFee}
                  >
                    <i className="icon-magnifier" />
                    {' '}
                      Tìm kiếm
                  </Button>
                </Col>
              </FormGroup>
            </Col>
            <Col md="6" className="mb-3 mt-3">
              <FormGroup row>
                <Col className="text-left btn-search">
                  <Button
                    onClick={this.addButtonAction}
                    className="icon-search btn btn-primary"
                  >
                    <i className="icon-plus" />
                    {' '}
                      Thêm mới
                  </Button>
                </Col>
              </FormGroup>
            </Col>
            <span className=" form-text text-danger " style={{ width: '100%', textAlign: 'center', paddingBottom: '20px' }}>{errorWhenClickAddButton}</span>
          </Row>
          <Table
            tableData={tData}
            paramsSearch={paramsSearch}
            key={1}
            getDataTableNew={this.getDataTableNew}
          />
        </div>
        <div className="fee-table__pagination">
          {
            tData && tData.length !== 0 && (
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
                        options={CONST_VARIABLE.PAGE_OPTION}
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
                  {
                    tData && tData.length > 0
                    && (
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={perPage}
                        totalItemsCount={totalRow}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange}
                      />
                    )
                  }
                </Col>
              </Row>
            )
          }
          {
            tData && tData.length === 0 && <p>Hiển thị 0 - 0 của 0 bản ghi</p>
          }
        </div>
      </div>
    );
  }
}
export default withRouter(FeeTable);


FeeTable.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

FeeTable.defaultProps = {
  history: '/fee/list',
  match: {},
};
