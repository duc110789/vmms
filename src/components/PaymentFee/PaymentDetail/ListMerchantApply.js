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
import Refuse from "../PaymentApprove/modal/Refuse";
import {saveApproveListMerchant} from "../../../store/actions/actionApproveMerchant";
import {openModalUnLock} from "../../../store/actions/actionControlModal";
import ModalDeleteFee from "../PaymentAdd/modal/Delete";
import ModalCommon from "../Modal/ModalCommon";

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
      <>
        <Col md={12}>
          <div className="merchant-table__table mt-3">
            <table className="table table-bordered">
              <thead>
              <tr>
                <th width="40">STT</th>
                <th>Kênh thanh toán</th>
                <th>Hình thức thanh toán	</th>
                <th>Tên mức phí	</th>
                <th>MCC nội địa	</th>
                <th width="120">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {totalRow !== 0
                ? (tDataTable
                  && tDataTable.slice(currentPage * perPage - perPage, perPage * currentPage)
                    .map((data, index) => (
                      <tr key={data.value}>
                        <td>{(index + 1) + (currentPage - 1) * perPage }</td>
                        <td>{data.value}</td>
                        <td>{data.name}</td>
                        <td className="icon-fee-merchant">
                          {data.status === 1 ? <Button onClick={() => onCLickToOpenModal(data.id, data.value)}>
                            <i className="icon-lock" />
                          </Button> : (data.status === -1 ? <Button onClick={() => onClickModalUnLock(data.id, data.value)}> <i className="green fa fa-unlock-alt bigger-130" /></Button> : (!data.status ? <Button onClick={() => this.openDeleteMerchant(data.value)}>
                            <i className="icon-trash" />
                          </Button> : null))}
                        </td>
                      </tr>
                    ))) : (
                  <>
                    <tr>
                      <td>1</td>
                      <td>Online</td>
                      <td>2</td>
                      <td>Mức 1</td>
                      <td>1</td>
                      <td className="icon-fee text-left">
                        <div>
                          <Button
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Chi tiết"
                          >
                            <i className="icon-info" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="empty-data"><td className="text-center" colSpan={6}>{CONST_VARIABLE.EMPTY_DATA}</td></tr>
                  </>
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
      </>
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
