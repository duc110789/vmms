/* eslint-disable */
import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row, Col, Form, Collapse, Card, CardBody, Button, Input,
  InputGroup,
} from 'reactstrap';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import CONST_VARIABLE from '../../../utils/constants';
import { loadReasonForRefuseMerchant, loadListMerchantDetail, } from '../../../store/actions/actionMerchantDetail';
import { loaddeniedDesc, } from '../../../store/actions/actionMerchantCommon';
import './index.scss';
import {saveApproveListMerchant} from "../../../store/actions/actionApproveMerchant";

class InfoFee extends Component {
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
  }

  static getDerivedStateFromProps(props,state) {

  }

  componentDidMount() {
  }


  render() {
    const { match, history } = this.props;
    const {
    } = this.state;

    // const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <div className="page-content">
        <div className="page-content-area">
          <Form className="form-horizoral">
            <Row>
              <div className="col-md-12">
                <div className="widget-box transparent">
                    <Card>
                      <CardBody>
                        <div className="widget-body">
                          <div className="widget-main">
                            <Row>
                              <Col md={12}>
                                <div className="merchant-table__table mt-3">
                                  <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                      <th width="40">STT</th>
                                      <th>Loại giao dịch</th>
                                      <th>Hình thức thanh toán</th>
                                      <th>Tên mức phí</th>
                                      <th>MCC nội địa</th>
                                      <th>Thao tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                   <tr>
                                     <td>1</td>
                                     <td>Online</td>
                                     <td>Mức 1</td>
                                     <td>1</td>
                                     <td>Thao tác</td>
                                   </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="merchant-table__pagination">
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
                                                activePage={1}
                                                itemsCountPerPage={5}
                                                totalItemsCount={10}
                                                pageRangeDisplayed={3}
                                                onChange={this.handlePageChange}
                                              />
                                        </Col>
                                      </Row>
                                  {/*{*/}
                                  {/*  tDataTable && tDataTable.length === 0 && <p>Hiển thị 0 - 0 của 0 bản ghi</p>*/}
                                  {/*}*/}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                </div>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

InfoFee.propTypes = {
};

InfoFee.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoFee));
