import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  FormGroup, Button,
} from 'reactstrap';
import { getTypeNameFee } from '../../../utils/commonFunction';
import ModalDetail from './modal/Detail';
import ModalUpdate from './modal/UpDate';
import ModalDeleteFee from './modal/Delete';
import ModalLockFee from './modal/ModalLockFee';
import CONST_VARIABLE from '../../../utils/constants';

class ListFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalDetail: false,
      isShowModalDelete: false,
      isShowModalUpdate: false,
      tdata: null,
      feeCode: '',
      activeModal: false,
      activeModalUnLock: false,
    };
  }

  // eslint-disable-next-line react/sort-comp
  openDetailFee = (childData) => {
    this.toggleDetailFee();
    this.setState({
      tdata: childData,
    });
  }

  toggleDetailFee = () => {
    const { isShowModalDetail } = this.state;
    this.setState({
      isShowModalDetail: !isShowModalDetail,
    });
  }

  openUpdateFee = (childData) => {
    this.toggleUpdateFee();
    this.setState({
      tdata: childData,
    });
  }

  toggleUpdateFee = () => {
    const { isShowModalUpdate } = this.state;
    this.setState({
      isShowModalUpdate: !isShowModalUpdate,
    });
  }

  openDeleteFee = (feeCode) => {
    this.toggleDeleteFee(feeCode);
  }

  openModalLock = (feeCode) => {
    this.setActiveModal(feeCode);
  }

  setActiveModal = (feeCode) => {
    const { activeModal } = this.state;
    this.setState({
      activeModal: !activeModal,
      feeCode,
    });
  }

  openModalUnLock = (feeCode) => {
    this.setActiveModalUnLock(feeCode);
  }

  setActiveModalUnLock = (feeCode) => {
    const { activeModalUnLock } = this.state;
    this.setState({
      activeModalUnLock: !activeModalUnLock,
      feeCode,
    });
  }

  toggleDeleteFee = (feeCode) => {
    const { isShowModalDelete } = this.state;
    this.setState({
      isShowModalDelete: !isShowModalDelete,
      feeCode,
    });
  }

  deleteByFeeCode = () => {
    const { getListFeeCodeUpdate } = this.props;
    getListFeeCodeUpdate();
  }

  getFeeCode = () => {
    const { getListFeeCodeUpdate } = this.props;
    getListFeeCodeUpdate();
  }

  updateTableByEdit = () => {
    const { updateTableFee } = this.props;
    updateTableFee();
  }

  render() {
    const {
      tdata,
      isShowModalUpdate,
      isShowModalDetail,
      isShowModalDelete,
      feeCode,
      activeModal,
      activeModalUnLock,
    } = this.state;
    const { tableData } = this.props;
    const getFeeType = JSON.parse(localStorage.getItem('FEE_TYPE'));
    const getClassifySigning = JSON.parse(localStorage.getItem('CLASSIFY_SIGNING'));
    const feeStatus = JSON.parse(localStorage.getItem('FEE_STATUS'));
    const listCalculationForm = JSON.parse(localStorage.getItem('CALCULATION_FORM'));
    const i = 0;

    const checkColorStatus = (status) => {
      switch (status) {
        case 1:
          return 'text-white badge badge-success';
        case 2:
          return 'text-white badge badge-info';
        case 3:
          return 'text-white badge badge-warning';
        default:
          return 'text-white badge badge-danger';
      }
    };

    return (
      <div className="list-fee-edit">
        <FormGroup row>
          <table className="table table-bordered" cellSpacing={0} width="100%">
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
                tableData && tableData.map((data, index) => (
                  // eslint-disable-next-line no-plusplus
                  <tr key={data.feeId}>
                    <td className="text-center">{data.rowNum}</td>
                    <td>
                      {getTypeNameFee(getFeeType, data.feeType)}
                    </td>
                    <td>
                      {getTypeNameFee(getClassifySigning, data.classifySigning)}
                    </td>
                    <td>{data.feeCode}</td>
                    <td>{data.feeName}</td>
                    <td>{data.vatTax}</td>
                    <td>{getTypeNameFee(listCalculationForm, data.calculationForm)}</td>
                    <td>
                      <span className={checkColorStatus(data.status)}>
                        {getTypeNameFee(feeStatus, data.status)}
                      </span>
                    </td>
                    <td className="icon-fee text-left">
                      <Button onClick={() => this.openDetailFee(data)}>
                        <i className="icon-info" />
                      </Button>
                      <Button onClick={() => this.openUpdateFee(data)}>
                        <i className="icon-note" />
                      </Button>
                      {
                        ((data && data.status === 1) && (
                          <Button className="close-lock" onClick={() => this.openModalLock(data.feeCode)}>
                            <i className="icon-lock" />
                          </Button>
                        )) || ((data && data.status === -1) && (
                          <Button className="open-lock" onClick={() => this.openModalUnLock(data.feeCode)}>
                            <i className="icon-lock-open" />
                          </Button>
                        ))
                      }
                      {
                        ((data && data.status === 2) && (
                        <Button onClick={() => this.openDeleteFee(data.feeCode)}>
                          <i className="icon-trash" />
                        </Button>
                        ))
                      }
                    </td>
                  </tr>
                ))
                }
            </tbody>
          </table>
        </FormGroup>
        {
          tableData && tableData.length === 0 && <div className="empty-row">{CONST_VARIABLE.EMPTY_DATA}</div>
        }

        {isShowModalDetail === true ? (
          <ModalDetail
            toggleDetailFee={this.toggleDetailFee}
            isShowModalDetail={isShowModalDetail}
            tdata={tdata}
          />
        ) : null}
        {isShowModalUpdate === true ? (
          <ModalUpdate
            toggleUpdateFee={this.toggleUpdateFee}
            isShowModalUpdate={isShowModalUpdate}
            tdata={tdata}
            updateTableByEdit={this.updateTableByEdit}
          />
        ) : null}
        {isShowModalDelete === true ? (
          <ModalDeleteFee
            toggleDeleteFee={this.toggleDeleteFee}
            isShowModalDelete={isShowModalDelete}
            feeCode={feeCode}
            onDeleteFee={this.deleteByFeeCode}
          />
        ) : null}


        { feeCode !== null
          && (
          <div>
            <ModalLockFee
              setActiveModal={this.setActiveModal}
              activeModal={activeModal}
              feeCode={feeCode}
              contentNotice={CONST_VARIABLE.LOCK_FEE_LIST}
              isLock="1"
              onGetFeeCode={this.getFeeCode}
            />
            <ModalLockFee
              setActiveModal={this.setActiveModalUnLock}
              activeModal={activeModalUnLock}
              feeCode={feeCode}
              contentNotice={CONST_VARIABLE.UNLOCK_FEE_LIST}
              isLock="2"
              onGetFeeCode={this.getFeeCode}
            />
          </div>
          )}
      </div>
    );
  }
}
export default withRouter(ListFee);
ListFee.propTypes = {
  tableData: PropTypes.array.isRequired,
  getListFeeCodeUpdate: PropTypes.func,
  updateTableFee: PropTypes.func,
};
ListFee.defaultProps = {
  getListFeeCodeUpdate: function name(params) {
    return params;
  },
  updateTableFee: function name(params) {
    return params;
  },
};
