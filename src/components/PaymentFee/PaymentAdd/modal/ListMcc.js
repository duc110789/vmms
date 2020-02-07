import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import CONST_VARIABLE from '../../../../utils/constants';

const ListMcc = (props) => {
  const [perPage, setPerPage] = useState(CONST_VARIABLE.DEFAULT_PERPAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const {
    toggleListMcc,
    isShowModalListMcc,
    listMccDetail,
  } = props;

  let typePayment = '';

  if (listMccDetail.typePayment !== undefined) {
    if (listMccDetail.typePayment.length > 0) {
      for (let i = 0; i < listMccDetail.typePayment.length; i += 1) {
        if (i !== listMccDetail.typePayment.length - 1) {
          typePayment += `${listMccDetail.typePayment[i].label}/`;
        } else {
          typePayment += `${listMccDetail.typePayment[i].label}`;
        }
      }
    }
  }

  const totalRow = listMccDetail && listMccDetail.mccNational ? listMccDetail && listMccDetail.mccNational.length : 0;
  const toggle = () => toggleListMcc();
  const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
  return (
    <div>
      <Modal isOpen={isShowModalListMcc} centered toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Chi tiết</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <table id="table_list" className="table table-bordered" cellSpacing="0" width="100%">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Hình thức thanh toán</th>
                    <th>MCC nội địa</th>
                  </tr>
                </thead>
                <tbody>
                  {listMccDetail.mccNational !== undefined
                    ? (listMccDetail.mccNational
                      && listMccDetail.mccNational
                        .slice(currentPage * perPage - perPage, perPage * currentPage)
                        .map((data, index) => (
                          <tr key={data.key}>
                            <td>{(index + 1) + (currentPage - 1) * perPage }</td>
                            <td>{typePayment}</td>
                            <td>{data.label}</td>
                          </tr>
                        ))) : ('') }
                </tbody>
              </table>
              <div className="merchant-table__pagination">
                {
                  listMccDetail && listMccDetail.length !== 0 && (
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
                                setPerPage(e.value);
                                setCurrentPage(1);
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
                          listMccDetail && listMccDetail.length > 0
                          && (
                            <Pagination
                              activePage={currentPage}
                              itemsCountPerPage={perPage}
                              totalItemsCount={totalRow}
                              pageRangeDisplayed={3}
                              onChange={handlePageChange}
                            />
                          )
                        }
                      </Col>
                    </Row>
                  )
                }
                {
                  listMccDetail
                  && listMccDetail.length === 0 && <p>Hiển thị 0 - 0 của 0 bản ghi</p>
                }
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn-middle bigger-150 btn-primary" onClick={toggle}>
            <i className="fa fa-arrow-left mr-1" />
            Quay lại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ListMcc;
ListMcc.propTypes = {
  isShowModalListMcc: PropTypes.any,
  toggleListMcc: PropTypes.any,
  listMccDetail: PropTypes.any,
};

ListMcc.defaultProps = {
  isShowModalListMcc: null,
  toggleListMcc: null,
  listMccDetail: null,
};
