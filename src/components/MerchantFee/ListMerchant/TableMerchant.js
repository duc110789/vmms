/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {
  withRouter,
} from 'react-router-dom';
import { convertClassifySigning, getTypeNameFee, getStatusUI } from '../../../utils/commonFunction';
import ModalCommon from '../Modal/ModalCommon';
import {
  openModal, closeModal, clickToLockInMoDal, clickToUnlockInModal, openModalUnLock,
} from '../../../store/actions/actionControlModal';
import { searchByButton, clickToEditMerchant } from '../../../store/actions/actionMerchantList';
// eslint-disable-next-line react/prefer-stateless-function
class Table extends Component {
  componentDidUpdate(prevProps) {
    const {
      numberLockorUnlock, dataSearch, toRow, fromRow,
      resetTable, dataEditMerchant, history, confirm,
    } = this.props;
    if (prevProps.numberLockorUnlock !== numberLockorUnlock) {
      const data = { ...dataSearch, fromRow, toRow };
      resetTable(data);
    }
    if (dataEditMerchant) {
      if (prevProps.dataEditMerchant === null) {
        history.push('/merchant/edit-merchant');
      } else if (prevProps.dataEditMerchant
        && (prevProps.dataEditMerchant.data.feeCode !== dataEditMerchant.data.feeCode)) {
        history.push('/merchant/edit-merchant');
      } else if (prevProps.dataEditMerchant
        && (prevProps.dataEditMerchant.data.feeCode === dataEditMerchant.data.feeCode)
        && (prevProps.confirm !== confirm)) {
        history.push('/merchant/edit-merchant');
      }
    }
  }

  handleEditMerchant = async (data) => {
    const { onCLickEditMerchant } = this.props;
    await onCLickEditMerchant(data);
  };


  render() {
    const {
      tdata, payChannel, status, onCLickToOpenModal, isOpen,
      onClickToCloseModal, dataModal, LockInMoDal, onClickModalUnLock,
      isOpenUnlock, unLockInModal, history,
    } = this.props;

    const notifyModal = {
      title: 'Bảng Khóa Merchant',
      content: 'Bạn có chắc chắn muốn khóa bảng phí này?',
      button: 'Khóa bảng phí',
    };

    const notifyUnLockModal = {
      title: 'Bảng mở khóa Merchant ',
      content: 'Bạn có chắc chắn muốn mở khóa bảng phí này?',
      button: 'Mở khóa bảng phí',
    };

    return (
      <div className="fee-table_table w-100">
        <table className="fee-table__table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>Mã Phí</th>
              <th>Tên mức phí</th>
              <th>Phân loại ký kết</th>
              <th>Số HĐ/PL/CV</th>
              <th>Ngày ký</th>
              <th>Ngày áp dụng</th>
              <th>Ngày hết hạn</th>
              <th className="text-center">Kênh thanh toán</th>
              <th>Hình thức thanh toán</th>
              <th>Merchant áp dụng</th>
              <th>Người tạo</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {(tdata !== null && tdata.list
              && Array.isArray(tdata.list))
              ? (tdata.list.length !== 0 ? tdata.list.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.feeCode}</td>
                  <td>{data.feeName}</td>
                  <td>{convertClassifySigning(data.classifySigning)}</td>
                  <td>{data.contract}</td>
                  <td>{data.signDate}</td>
                  <td>{data.applyDate}</td>
                  <td>{data.expirationDate}</td>
                  <td>{getTypeNameFee(payChannel, data.payChannel)}</td>
                  <td>{data.typeSource}</td>
                  <td>{data.countMerchant}</td>
                  <td>{data.createUser}</td>
                  <td>
                    {(getStatusUI(status, data.status))}
                    {' '}
                  </td>
                  <td className="icon-fee text-left">
                    {
                      <Button onClick={() => history.push({
                        pathname: `/merchant/detail/${data.id}`,
                      })}
                      >
                        <i className="icon-info" />
                      </Button>
                    }
                    {
                   data.status === -1 ? null : (data.status === 3 ? (
                     <Button onClick={() => history.push({
                       pathname: `/merchant/approve/${data.id}`,
                     })}
                     >
                       <i className="icon-blue fa fa-check-circle" />
                     </Button>
                   ) : (
                     data.status === 5 ? null : (
                       <Button onClick={() => this.handleEditMerchant(data.id)}>
                         <i className="icon-note" />
                       </Button>
                     )
                   ))
                }
                    {
                    (data.status === 1 || data.status === 5 ? (
                      <Button onClick={() => onCLickToOpenModal(data.id)}>
                        <i className="icon-lock" />
                      </Button>
                    ) : (
                      data.status === -1 ? (
                        <Button onClick={() => onClickModalUnLock(data.id)}>
                          <i className="icon-lock-open" />
                        </Button>
                      ) : null
                    ))
                  }
                  </td>
                </tr>
              )) : null) : null}
          </tbody>
        </table>
        {tdata && tdata.list && tdata.list.length === 0 ? <div className="empty-row">Không có giá trị hợp lệ</div> : null}
        <ModalCommon
          isOpen={isOpen}
          onClickToCloseModal={onClickToCloseModal}
          notifyModal={notifyModal}
          data={dataModal}
          clickToButtonInMoDal={LockInMoDal}
        />
        <ModalCommon
          isOpen={isOpenUnlock}
          onClickToCloseModal={onClickToCloseModal}
          notifyModal={notifyUnLockModal}
          data={dataModal}
          clickToButtonInMoDal={unLockInModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  typeSource: state.merchantList.typeSource,
  payChannel: state.merchantList.payChannel,
  status: state.merchantList.status,
  isOpen: state.controlModal.isOpen,
  dataModal: state.controlModal.id,
  dataSearch: state.merchantList.dataSearch,
  isOpenUnlock: state.controlModal.isOpenUnlock,
  fromRow: state.merchantList.fromRow,
  toRow: state.merchantList.toRow,
  numberLockorUnlock: state.controlModal.numberLockorUnlock,
  dataEditMerchant: state.editMerchant.dataMerchant,
  confirm: state.editMerchant.isConfirm,
});

const mapDispatchToProps = (dispatch) => ({
  onCLickToOpenModal: (data) => dispatch(openModal(data)),
  onClickToCloseModal: (data) => dispatch(closeModal(data)),
  LockInMoDal: (data) => dispatch(clickToLockInMoDal(data)),
  resetTable: (data) => dispatch(searchByButton(data)),
  onClickModalUnLock: (data) => dispatch(openModalUnLock(data)),
  unLockInModal: (data) => dispatch(clickToUnlockInModal(data)),
  onCLickEditMerchant: (data) => dispatch(clickToEditMerchant(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table));

Table.propTypes = {
  tdata: PropTypes.object,
  payChannel: PropTypes.array,
  status: PropTypes.array,
  onCLickToOpenModal: PropTypes.func,
  isOpen: PropTypes.bool,
  onClickToCloseModal: PropTypes.func,
  dataModal: PropTypes.number,
  LockInMoDal: PropTypes.func,
  resetTable: PropTypes.func,
  dataSearch: PropTypes.object,
  onClickModalUnLock: PropTypes.func,
  isOpenUnlock: PropTypes.bool,
  unLockInModal: PropTypes.func,
  toRow: PropTypes.number,
  fromRow: PropTypes.number,
  numberLockorUnlock: PropTypes.number,
  onCLickEditMerchant: PropTypes.func,
  history: PropTypes.object,
  dataEditMerchant: PropTypes.object,
  confirm: PropTypes.number,

};

Table.defaultProps = {
  tdata: null,
  payChannel: null,
  status: null,
  onCLickToOpenModal: () => {},
  isOpen: false,
  onClickToCloseModal: () => {},
  dataModal: null,
  LockInMoDal: () => {},
  resetTable: () => {},
  dataSearch: null,
  onClickModalUnLock: () => {},
  isOpenUnlock: false,
  unLockInModal: () => {},
  fromRow: 0,
  toRow: 5,
  numberLockorUnlock: null,
  onCLickEditMerchant: () => {},
  history: 'edit-merchant',
  dataEditMerchant: null,
  confirm: null,

};
