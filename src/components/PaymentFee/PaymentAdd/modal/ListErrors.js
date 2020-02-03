import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import CONST_VARIABLE from '../../../../utils/constants';

const ListErrors = (props) => {
  const [perPage, setPerPage] = useState(CONST_VARIABLE.DEFAULT_PERPAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const {
    toggleErrors,
    isShowModalErrors,
    listItemErrorModal,
  } = props;
  const totalRow = listItemErrorModal ? listItemErrorModal.length : 0;
  const toggle = () => toggleErrors();
  const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
  return (
    <div>
      <Modal isOpen={isShowModalErrors} centered toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Chi tiết lỗi</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <table id="table_list" className="table table-bordered" cellSpacing="0" width="100%">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>MID</th>
                    <th>Tên Merchant</th>
                    <th>Lỗi</th>
                  </tr>
                </thead>
                <tbody>
                  {listItemErrorModal !== null
                    ? (listItemErrorModal
                      && listItemErrorModal
                        .slice(currentPage * perPage - perPage, perPage * currentPage)
                        .map((data, index) => (
                          <tr key={data.merchantCode}>
                            <td>{(index + 1) + (currentPage - 1) * perPage }</td>
                            <td>{data.merchantCode}</td>
                            <td>{data.merchantName}</td>
                            <td>{data.msgError}</td>
                          </tr>
                        ))) : ('') }
                </tbody>
              </table>
              <div className="merchant-table__pagination">
                {
                  listItemErrorModal && listItemErrorModal.length !== 0 && (
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
                          listItemErrorModal && listItemErrorModal.length > 0
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
                  listItemErrorModal
                  && listItemErrorModal.length === 0 && <p>Hiển thị 0 - 0 của 0 bản ghi</p>
                }
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fa fa-arrow-left mr-1" />
            Quay lại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ListErrors;
ListErrors.propTypes = {
  isShowModalErrors: PropTypes.any,
  toggleErrors: PropTypes.any,
  listItemErrorModal: PropTypes.any,
};

ListErrors.defaultProps = {
  isShowModalErrors: null,
  toggleErrors: null,
  listItemErrorModal: null,
};
