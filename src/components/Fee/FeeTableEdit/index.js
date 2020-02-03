import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import {
  Row, Col,
} from 'reactstrap';
import { withRouter } from 'react-router';
import Select from 'react-select';
import PropTypes from 'prop-types';
import CONST_VARIABLE from '../../../utils/constants';
import { callApiDetailFee } from '../../../apis/fee-manager';
import ListFee from './ListFee';
import './index.scss';
import FeeTableAdd from '../FeeTableAdd';

class FeeEdit extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      tData: [],
      perPage: CONST_VARIABLE.DEFAULT_PERPAGE,
      currentPage: 1,
      queryObject: match.params,
      totalRow: 0,
      isDisableCheckBox: true,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateListFeeCode = this.updateListFeeCode.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      perPage, currentPage,
    } = this.state;
    let params = null;
    params = {
      toRow: currentPage * perPage,
      fromRow: perPage * currentPage - perPage,
    };

    if (prevState.perPage !== perPage || prevState.currentPage !== currentPage) {
      this.fetchData(params);
    }
  }

  getListFeeCodeNewest = () => {
    this.fetchData();
  }

  updateTableFee = () => {
    this.setState({
      currentPage: 1,
    });
    this.fetchData();
  }

  updateListFeeCode = () => {
    const { currentPage, perPage, totalRow } = this.state;
    if (
      ((currentPage - 1) * perPage) < (totalRow - 1)
      && (totalRow - 1) <= (currentPage * perPage)
    ) {
      this.setState({
        currentPage,
      });
    } else if ((totalRow - 1) <= (currentPage * perPage)) {
      this.setState({
        currentPage: currentPage - 1,
      });
    }
    if (currentPage < 2) {
      this.setState({
        currentPage: 1,
      });
    }

    this.fetchData();
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  async fetchData() {
    const { perPage, currentPage, queryObject } = this.state;
    const params = {
      feeType: queryObject.feeType,
      classifySigning: queryObject.classifySigning,
      status: queryObject.status,
    };
    const allParams = {
      toRow: currentPage * perPage,
      fromRow: perPage * currentPage - perPage,
      ...params,
    };

    const result = await callApiDetailFee(allParams);
    this.setState({
      tData: result.list,
      totalRow: result.totalRow,
    });
  }

  updateListFeeCode() {
    this.setState({
      currentPage: 1,
    });
    this.fetchData();
  }

  render() {
    const {
      tData,
      perPage,
      currentPage,
      totalRow,
      queryObject,
      isDisableCheckBox,
    } = this.state;
    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <div className="animated fadeIn fee-table-edit">
        <FeeTableAdd getListFeeCodeNewest={this.getListFeeCodeNewest} isDisableCheckBox={isDisableCheckBox} queryObject={queryObject} />
        <Col lg={12}>
          <ListFee
            tableData={tData}
            key={tData}
            queryObject={queryObject}
            getListFeeCodeUpdate={this.updateListFeeCode}
            updateTableFee={this.updateTableFee}
          />
        </Col>
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
export default withRouter(FeeEdit);
FeeEdit.propTypes = {
  match: PropTypes.object,
};
FeeEdit.defaultProps = {
  match: {},
};
