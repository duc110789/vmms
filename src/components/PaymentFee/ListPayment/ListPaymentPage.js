/* eslint-disable react/destructuring-assignment,max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardHeader, CardBody, Row, Col,
} from 'reactstrap';
import './index.scss';
import Pagination from 'react-js-pagination';

import Select from 'react-select';
import TablePayment from './TablePayment';
import FillMerchant from './FillPayment';
import { loadTable, clickChangeRowPage } from '../../../store/actions/actionMerchantList';
import CONST_VARIABLE from '../../../utils/constants';
import { resetIsSuccessInEditMerchantReducer } from '../../../store/actions/actionEditMerchant';

// eslint-disable-next-line react/prefer-stateless-function
class ListPaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 5,
      feeCode: '',
      payChannel: '',
      typeSource: '',
      status: 0,
      merchantCode: '',
      fromRow: 0,
      toRow: 5,
      applyDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      expirationDate: new Date(),
      contract: '',
    };
  }


  componentDidMount() {
    const {
      feeCode, payChannel, typeSource, status, merchantCode,
      fromRow, toRow, applyDate, expirationDate, contract,
    } = this.state;
    const { loadTableDefault, isSuccessInEditMerchantReducer } = this.props;
    const convertApplyDate = `${applyDate.getUTCDate()}/${applyDate.getUTCMonth() + 1}/${applyDate.getUTCFullYear()}`;
    const convertExpiDate = `${expirationDate.getUTCDate()}/${expirationDate.getUTCMonth() + 1}/${expirationDate.getUTCFullYear()}`;
    const defaultTable = {
      feeCode,
      payChannel,
      typeSource,
      status,
      merchantCode,
      fromRow,
      toRow,
      contract,
      applyDate: convertApplyDate,
      expirationDate: convertExpiDate,
    };
    isSuccessInEditMerchantReducer();
    loadTableDefault(defaultTable);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { id } = this.props;
    if (id !== nextProps.id) {
      return true;
    }
    return true;
  }

  handlePageChange = (pageNumber) => {
    const { dataSearch, changeRowPage } = this.props;
    const { perPage } = this.state;
    this.setState({ currentPage: pageNumber }, () => changeRowPage(dataSearch, perPage * this.state.currentPage - perPage, perPage * this.state.currentPage));
  }

  handleRowPageChange = (e) => {
    const { dataSearch, changeRowPage } = this.props;
    this.setState({ perPage: e.value, currentPage: 1 }, () => changeRowPage(dataSearch, this.state.perPage * this.state.currentPage - this.state.perPage, this.state.perPage * this.state.currentPage));
  }

  render() {
    const { currentPage, perPage } = this.state;
    const { tdata } = this.props;
    const totalRow = tdata && tdata.totalRow;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <div className="animated fadeIn fee-table" style={{ background: 'white' }}>
          <Card>
            <CardHeader>
              <span className="text-bold">Quản lý module phí thu Merchant</span>
            </CardHeader>
            <CardBody>
              <FillMerchant currentPage={currentPage} perPage={perPage} />
              <TablePayment tdata={tdata} />
              <div className="fee-table__pagination">
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
                          onChange={this.handleRowPageChange}
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
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={perPage}
                      totalItemsCount={tdata && tdata.totalRow ? tdata.totalRow : 0}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tdata: state.merchantList.arrayTableData,
  dataSearch: state.merchantList.dataSearch,
  id: state.controlModal.id,
});

const mapDispatchToProps = (dispatch) => ({
  loadTableDefault: (data) => dispatch(loadTable(data)),
  changeRowPage: (data, fromRow, toRow) => dispatch(clickChangeRowPage(data, fromRow, toRow)),
  isSuccessInEditMerchantReducer: () => dispatch(resetIsSuccessInEditMerchantReducer()),
});


ListPaymentPage.propTypes = {
  loadTableDefault: PropTypes.func.isRequired,
  tdata: PropTypes.object,
  dataSearch: PropTypes.object,
  changeRowPage: PropTypes.func,
  id: PropTypes.number,
  isSuccessInEditMerchantReducer: PropTypes.func,
};

ListPaymentPage.defaultProps = {
  tdata: null,
  dataSearch: null,
  changeRowPage: () => {},
  id: null,
  isSuccessInEditMerchantReducer: () => {},

};

export default connect(mapStateToProps, mapDispatchToProps)(ListPaymentPage);
