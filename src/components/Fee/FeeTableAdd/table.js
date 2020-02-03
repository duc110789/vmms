/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import './table.scss';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Table extends Component {
  render() {
    const {
      tData, handleSetModal, perPage, currentPage, handleSetModalDetail, handleSetModalDelete,
    } = this.props;
    const feeTypeDes = JSON.parse(localStorage.getItem('FEE_TYPE'));
    const classifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
    const getCaculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM'));
    const getStatus = JSON.parse(localStorage.getItem('FEE_STATUS'));
    return (
      <div className="fee-table_table fee-table-add w-100">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>Loại phí</th>
              <th>Phân loại ký kết</th>
              <th>Mã phí</th>
              <th>Tên mức phí</th>
              <th>Thuế GTGT</th>
              <th>Công thức phí</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {
              tData && tData.slice(currentPage * perPage - perPage, perPage * currentPage).map((data, index) => (
                <tr key={data.feeName}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    {
                      data.feeType == 1 ? feeTypeDes[0].description : (data.feeType == 2
                        ? feeTypeDes[1].description : 'Tất cả')
                    }
                  </td>
                  <td>
                    {
                      data.classifySigning == classifySigning[0].code
                        ? classifySigning[0].description
                        : (data.classifySigning == classifySigning[1].code
                          ? classifySigning[1].description : classifySigning[2].description)
                    }
                  </td>
                  <td>{data.feeCode}</td>
                  <td>{data.feeName}</td>
                  <td>{data.vatTax}</td>
                  <td>
                    {
                      data.calculationForm == 1
                        ? getCaculationForm[0].description : getCaculationForm[1].description
                    }
                  </td>
                  <td><span className="badge badge-primary">{getStatus[1].description}</span></td>
                  <td className="icon-fee text-left">
                    {
                      <Button onClick={() => handleSetModalDetail(data, index)}>
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                      <Button onClick={() => handleSetModal(data, index)}>
                        <i className="icon-note" />
                      </Button>
                    }
                    {
                      <Button onClick={() => handleSetModalDelete(index)}>
                        <i className="icon-trash" />
                      </Button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          tData && tData.length === 0 && <div className="empty-row"> Không tìm thấy dữ liệu</div>
        }
      </div>
    );
  }
}

export default Table;

Table.propTypes = {
  tData: PropTypes.array.isRequired,
  handleSetModal: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  handleSetModalDetail: PropTypes.func.isRequired,
  handleSetModalDelete: PropTypes.func.isRequired,
};

Table.defaultProps = {
  perPage: null,
  currentPage: null,
};
