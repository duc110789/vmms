/* eslint-disable */
import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row, Col, Form, Collapse, Card, CardBody, Button, Input,
  InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import XLSX from "xlsx";
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import CONST_VARIABLE from '../../../utils/constants';
import { loadReasonForRefuseMerchant, loadListMerchantDetail, } from '../../../store/actions/actionMerchantDetail';
import { loaddeniedDesc, } from '../../../store/actions/actionMerchantCommon';
import './index.scss';
 // import Refuse from "../MerchantApprove/modal/Refuse";
import {saveApproveListMerchant} from "../../../store/actions/actionApproveMerchant";

class ListMerchantApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: CONST_VARIABLE.DEFAULT_PERPAGE,
      currentPage: 1,
      isOpenInfo: true,
      valueInputSearch: '',
      haveSearch: false,
      isShowModalDenied: false,
    };
    this.handOpenInfo = this.handOpenInfo.bind(this);
  }

  static getDerivedStateFromProps(props,state) {
    const { listMerchantDetail, listMerchantDetailSearch } = props;
    const { haveSearch } = state;
    if(haveSearch) {
      return {
        tDataTable: listMerchantDetailSearch,
        totalRow: listMerchantDetailSearch ? listMerchantDetailSearch.length : 0,
      };
    }else {
      return {
        tDataTable: listMerchantDetail,
        totalRow: listMerchantDetail ? listMerchantDetail.length : 0,
      };
    }
  }

  componentDidMount() {
    const { loaddeniedDesc } = this.props;
    loaddeniedDesc();
  }

  toggleModalDenied = () => {
    const { isShowModalDenied } = this.state;
    this.setState({
      isShowModalDenied: !isShowModalDenied,
    });
  };

  openDeniedMerchant = (dataItem) => {
    this.setState({
      itemDelete: dataItem,
    });
    this.toggleModalDenied();
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleSearch = () => {
    const { loadListMerchantDetail, match } = this.props;
    const { valueInputSearch } = this.state;
    this.setState({
      haveSearch: true,
      currentPage: 1,
    });
    loadListMerchantDetail({
      id: match.params.id,
      merchantCode: valueInputSearch,
    });
  };

  handleChangeSearch = (event) => {
    this.setState({
      valueInputSearch: event.target.value,
    });
  };

  handOpenInfo() {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  approveMerchant = async () => {
    const { match, saveApproveListMerchant, history } = this.props;
    await saveApproveListMerchant({
      id: parseInt(match.params.id, 10),
      approvedUser: 'string',
      deniedDesc: '',
      deniedNote: '',
      action: 'APPROVED',
    });
    history.goBack();
  };

  downloadDataDetail = () => {
    const { listMerchantDetail } = this.props;
    const columnName = ['STT', 'Mã Merchant', 'Tên Merchant'];
    let arrMerchantDownload = listMerchantDetail.map((item, index) => {
      return [
        index,
        item.merchantCode,
        item.merchantName,
      ]
    });
    const totalArrayDetail = [[...columnName] , ...arrMerchantDownload];
    const ws = XLSX.utils.aoa_to_sheet(totalArrayDetail);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'MerchantListDetail.xlsx');
  }

  render() {
    const { match, history, deniedDesc } = this.props;
    const {
      perPage,
      currentPage,
      totalRow,
      tDataTable,
      isOpenInfo,
      isShowModalDenied,
    } = this.state;

    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <div className="page-content">
        <div className="page-content-area">
          <Form className="form-horizoral">
            <Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                  <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
                    <h4 className="widget-title lighter">DANH SÁCH MC ÁP DỤNG</h4>
                    <div className="widget-toolbar">
                      <span data-action="Collapse">
                        {isOpenInfo ? (
                          <i className="ace-icon fa fa-chevron-up" />
                        ) : (
                          <i className="ace-icon fa fa-chevron-down" />
                        )}
                      </span>
                    </div>
                  </div>
                  <Collapse isOpen={isOpenInfo} className="show-information">
                    <Card>
                      <CardBody>
                        <div className="widget-body">
                          <div className="widget-main">
                            <Row>
                              <Col md={12}>
                                <Row>
                                  <div className="col-md-6">
                                    <Button className="download-data" onClick={this.downloadDataDetail}>Download data</Button>
                                  </div>
                                  <div className="col-md-6 text-right">
                                    <InputGroup className="search-right">
                                      <Input
                                        type="text"
                                        name="input1-group1"
                                        placeholder="Tìm kiếm theo MerchantID"
                                        onChange={this.handleChangeSearch}
                                      />
                                      <Button
                                        className="btn-search-table"
                                        onClick={() => this.handleSearch()}
                                      >
                                        Tìm Kiếm
                                      </Button>
                                    </InputGroup>
                                  </div>
                                </Row>
                              </Col>
                              <Col md={12}>
                                <div className="merchant-table__table mt-3">
                                  <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                      <th width="40">STT</th>
                                      <th>MCC MID</th>
                                      <th>Tên Merchant</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tDataTable !== null
                                      ? (tDataTable
                                        && tDataTable.slice(currentPage * perPage - perPage, perPage * currentPage)
                                          .map((data, index) => (
                                            <tr key={data.merchantCode}>
                                              <td>{(index + 1) + (currentPage - 1) * perPage }</td>
                                              <td>{data.merchantCode}</td>
                                              <td>{data.merchantName}</td>
                                            </tr>
                                          ))) : (
                                        <tr className="empty-data"><td className="text-center" colSpan={4}>CONST_VARIABLE.EMPTY_DATA</td></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="merchant-table__pagination">
                                  {
                                    tDataTable && tDataTable.length !== 0 && (
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
                                            tDataTable && tDataTable.length > 0
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
                                    tDataTable && tDataTable.length === 0 && <p>Hiển thị 0 - 0 của 0 bản ghi</p>
                                  }
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </div>
            </Row>
          </Form>
          {/*<Refuse*/}
          {/*  toggleModalDenied={this.toggleModalDenied}*/}
          {/*  isShowModalDenied={isShowModalDenied}*/}
          {/*  itemApprove={match.params.id}*/}
          {/*  arrDeniedDesc={deniedDesc}*/}
          {/*  history={history}*/}
          {/*/>*/}
        </div>
        <Col md={12}>
          <div className="text-center mt-5">
            <Button title="Về danh sách" className="btn bggrey bigger-110" style={{ color: 'white'}} onClick={history.goBack}>
              <i className="fa fa-arrow-left mr-1" style={{ color: 'white'}} aria-hidden="true"/>
              Quay lại
            </Button>
            {
              match.path === '/merchant/approve/:id' ?
                (
                  <>
                    <Button className="btn btn-middle btn-danger" onClick={() => this.openDeniedMerchant()}>
                      Từ chối
                    </Button>
                    <Button className="btn bggreen bigger-110" style={{ color: 'white'}} onClick={() => this.approveMerchant()}>
                      Duyệt
                      <i className="fa fa-arrow-right bigger-110 ml-1" style={{ color: 'white'}}/>
                    </Button>
                  </>
                ) : ''
            }
          </div>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listMerchantDetail: state.merchantDetail.listMerchantDetail,
  listMerchantDetailSearch: state.merchantDetail.listMerchantDetailSearch,
  deniedDesc: state.merchantCommon.deniedDesc,
});

const mapDispatchToProps = (dispatch) => ({
  loadReasonForRefuseMerchant: (data) => dispatch(loadReasonForRefuseMerchant(data)),
  loadListMerchantDetail: (data) => dispatch(loadListMerchantDetail(data)),
  loaddeniedDesc: () => dispatch(loaddeniedDesc()),
  saveApproveListMerchant: (data) => dispatch(saveApproveListMerchant(data)),
});

ListMerchantApply.propTypes = {
  listMerchantDetail: PropTypes.array,
  loadListMerchantDetail: PropTypes.func,
  match: PropTypes.object,
  listMerchantDetailSearch: PropTypes.array,
  saveApproveListMerchant: PropTypes.func,
};

ListMerchantApply.defaultProps = {
  listMerchantDetail: [],
  loadListMerchantDetail: () => {},
  match: {},
  listMerchantDetailSearch: [],
  saveApproveListMerchant: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListMerchantApply));
