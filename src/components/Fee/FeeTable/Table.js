import React, { useState } from 'react';
import './table.scss';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ModalLockFee from './ModalLockFee';
import { getFeeTables } from '../../../apis/fee-manager';
import { getTypeNameFee } from '../../../utils/commonFunction';
import CONST_VARIABLE from '../../../utils/constants';

function Table(props) {
  const {
    tableData,
    history,
    paramsSearch,
    getDataTableNew,
  } = props;

  const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE'));
  const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
  const feeStatus = JSON.parse(localStorage.getItem('FEE_STATUS'));
  const [activeModal, setActiveModal] = useState(false);
  const [dataItem, setdataItem] = useState({});
  const [activeModalUnLock, setActiveModalUnLock] = useState(false);

  const openModalLock = (data) => {
    setdataItem(data);
    setActiveModal(!activeModal);
  };
  const openModalUnLock = (data) => {
    setdataItem(data);
    setActiveModalUnLock(!activeModalUnLock);
  };
  const getDataNew = async () => {
    const data = await getFeeTables(paramsSearch);
    const newTableData = data.list;
    getDataTableNew(newTableData);
  };

  const checkColorStatus = (status) => {
    if (status) {
      switch (status) {
        case 1:
          return 'badge badge-success';
        case 2:
          return 'badge badge-info text-white';
        case 3:
          return 'badge badge-warning';
        default:
          return 'badge badge-danger';
      }
    }
    return '';
  };

  return (
    <div className="fee-table_table">
      <table className="fee-table__table">
        <thead key="thead">
          <tr>
            <th>STT</th>
            <th>Loại phí</th>
            <th>Phân loại ký kết</th>
            <th>Số lượng mức phí</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody key="tbody">
          {
            tableData && tableData.map((data, index) => (
              data.status !== 3 && (
                <tr key={data.rowNum}>
                  <td className="text-center">{data.rowNum}</td>
                  <td>
                    {getTypeNameFee(getFeeType, data.feeType)}
                  </td>
                  <td>
                    {getTypeNameFee(getClassifySigning, data.classifySigning)}
                  </td>
                  <td>{data.countFeeCode}</td>
                  <td>
                    <span className={checkColorStatus(data.status)}>
                      {getTypeNameFee(feeStatus, data.status)}
                    </span>
                  </td>
                  <td className="icon-fee text-left">
                    <div>
                      <Button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Chi tiết"
                        onClick={() => history.push({
                          pathname: `/fee/detail/${data.feeType}/${data.classifySigning}/${data.status}`,
                        })}
                      >
                        <i className="icon-info" />
                      </Button>
                      {' '}
                      {((data && data.status !== -1) && (
                      <Button
                        title="Cập nhật"
                        onClick={() => history.push({
                          pathname: `/fee/edit/${data.feeType}/${data.classifySigning}/${data.status}`,
                        })}
                      >
                        <i className="icon-note" />
                      </Button>
                      ))}
                      {' '}
                      {
                        ((data && data.status === 1) && (
                          <Button className="close-lock" title="Khóa/Mở Khóa" onClick={() => openModalLock(data)}>
                            <i className="icon-lock" />
                          </Button>
                        )) || ((data && data.status === -1) && (
                          <Button className="open-lock" title="Khóa/Mở Khóa" onClick={() => openModalUnLock(data)}>
                            <i className="icon-lock-open" />
                          </Button>
                        ))
                      }
                    </div>
                  </td>
                </tr>
              )
            ))
          }
        </tbody>
      </table>
      { dataItem !== null
      && (
      <div>
        <ModalLockFee
          setActiveModal={setActiveModal}
          activeModal={activeModal}
          itemModal={dataItem}
          contentNotice={CONST_VARIABLE.LOCK_FEE_LIST}
          isLock="1"
          onGetDataNew={getDataNew}
        />
        <ModalLockFee
          setActiveModal={setActiveModalUnLock}
          activeModal={activeModalUnLock}
          itemModal={dataItem}
          contentNotice={CONST_VARIABLE.UNLOCK_FEE_LIST}
          isLock="2"
          onGetDataNew={getDataNew}
        />
      </div>
      )}

      {
        tableData && tableData.length === 0 && <div className="empty-row">{CONST_VARIABLE.EMPTY_DATA}</div>
      }
    </div>
  );
}

export default withRouter(Table);
Table.propTypes = {
  history: PropTypes.object,
  tableData: PropTypes.array.isRequired,
  paramsSearch: PropTypes.object,
  getDataTableNew: PropTypes.func,
};

Table.defaultProps = {
  history: null,
  paramsSearch: {},
  getDataTableNew: function name(params) {
    return params;
  },
};
