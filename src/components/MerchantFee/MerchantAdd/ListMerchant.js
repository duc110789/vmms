/* eslint-disable */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import {
  Col,
  Row,
  Label,
  Button,
} from 'reactstrap';
import Select from 'react-select';
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CONST_VARIABLE from '../../../utils/constants';
import ModalDeleteFee from './modal/Delete';
import { storeListMerchantLocal, addFeeMerchant } from '../../../store/actions/actionAddMerchant';
import './css/index.scss';
import ModalCommon from "../Modal/ModalCommon";
import {
  openModal, closeModal, clickToLockInMoDal, clickToUnlockInModal, openModalUnLock, onClickToLockMerchantInEditPage, onClickToUnLockMerchantInEditPage
} from '../../../store/actions/actionControlModal';

import { validateTime, convertArrayToString, convertPropertyInArray } from '../../../utils/commonFunction';
import {updateFeeMerchant , backToListMerchantPage} from '../../../store/actions/actionEditMerchant';

class ListMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: CONST_VARIABLE.DEFAULT_PERPAGE,
      currentPage: 1,
      isShowModalDelete: false,
      itemDelete: '',
      idMerchant: null,
      merchantCode: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      listMerchantLocal,
      dataInfoGeneral,
      dataInfoMerchantApply,
      availableData,
      history,
    } = props;
    if(history.location.pathname === '/merchant/add-fee-merchant'){
      return {
        tDataTable: listMerchantLocal.length > 0 ? listMerchantLocal : [],
        totalRow:  listMerchantLocal.length > 0 ? listMerchantLocal.length : 0,
        dataInfoGeneral,
        dataInfoMerchantApply,
        availableData,
      };
    } else {
      return {
        tDataTable: [ ...availableData, ...listMerchantLocal],
        totalRow:  [ ...availableData, ...listMerchantLocal] ?  [ ...availableData, ...listMerchantLocal].length : 0,
        dataInfoGeneral,
        dataInfoMerchantApply,
        availableData,
      };
    }
  }

  componentDidUpdate(prevProps) {
    const { dataResponseSaveOrPending, history } = this.props;
    if (dataResponseSaveOrPending !== prevProps.dataResponseSaveOrPending) {
      if (dataResponseSaveOrPending.code !== '00') {
        toastr.error(`${dataResponseSaveOrPending.message}`, 'Lỗi', { timeOut: 2500 });
      } else {
        toastr.success(`${CONST_VARIABLE.ADD_FEE_MERCHANT_SUCCESS}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 1000 });
        history.push({
          pathname: '/merchant/sent-merchant-list',
        });
      }
    }
  }

  openDeleteMerchant = (dataItem) => {
    this.setState({
      itemDelete: dataItem,
    });
    this.toggleDeleteFee();
  };

  toggleDeleteFee = () => {
    const { isShowModalDelete } = this.state;
    this.setState({
      isShowModalDelete: !isShowModalDelete,
    });
  };

  goBack = () => {
    const { history, storeListMerchantLocal, backToListMerchantPage } = this.props;
    backToListMerchantPage();
    storeListMerchantLocal([]);
    history.goBack();
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  saveMerchant = (actionMC) => {
    const { storeListMerchantLocal } = this.props;
    const {
      dataInfoGeneral,
      tDataTable,
      dataInfoMerchantApply,
    } = this.state;
    const convertSigningDate = moment(dataInfoGeneral.signingDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const convertApplyDate = moment(dataInfoGeneral.applyDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const convertExpirationDate = moment(dataInfoGeneral.expirationDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');

    const { addFeeMerchant } = this.props;
    try {
      if (
        !dataInfoGeneral.optionClassifySigned
        || !dataInfoGeneral.contractNumber
        || !dataInfoGeneral.feeCodeAndFeeName
        || !dataInfoGeneral.payChannelSet
        || !dataInfoGeneral.typePayment) {
        toastr.warning(`${CONST_VARIABLE.APPY_FEE_MERCHANT_WARNING}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      } else if (moment(new Date(convertSigningDate)).isSameOrAfter(new Date(convertApplyDate))) {
        toastr.warning(`${CONST_VARIABLE.DATE_SIGNING_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      } else if (moment(new Date(convertApplyDate)).isSameOrAfter(new Date(convertExpirationDate))) {
        toastr.warning(`${CONST_VARIABLE.DATE_EXPRICE_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
      } else if (tDataTable.length > 0) {
        const listMerchant = tDataTable.map((item) => ({
          merchantCode: item.value,
          merchantName: item.name,
        }));

        const listTypeSource = dataInfoGeneral && dataInfoGeneral.typePayment && dataInfoGeneral.typePayment.map((item) => item.value);
        const paramsAddMc = {
          createUser: 'string',
          classifySigning: dataInfoGeneral.optionClassifySigned ? dataInfoGeneral.optionClassifySigned.value : '',
          contract: dataInfoGeneral.contractNumber || '',
          signDate: dataInfoGeneral.signingDate || '',
          applyDate: dataInfoGeneral.applyDate || '',
          expirationDate: dataInfoGeneral.expirationDate || '',
          feeCode: dataInfoGeneral.feeCodeAndFeeName ? dataInfoGeneral.feeCodeAndFeeName.value : '',
          payChannel: dataInfoGeneral.payChannelSet ? dataInfoGeneral.payChannelSet.value : '',
          typeSource: listTypeSource.toString() || '',
          applyType: dataInfoMerchantApply.applyStyle || '',
          merchantType: dataInfoMerchantApply.optionNameMerchantMcc ? dataInfoMerchantApply.optionNameMerchantMcc.value : '',
          merchants: listMerchant || [],
          fileName: dataInfoMerchantApply.fileNameUpload || '',
          action: actionMC,
        };
        addFeeMerchant(paramsAddMc);
        storeListMerchantLocal([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  onClickHandleUpdateMerchant = () => {
    const { dataInfoGeneral, listMerchantLocal, merchantType, fileExcelName, applyType, updateFeeMerchant, storeListMerchantLocal } = this.props;
    const formatSigningDate = moment(dataInfoGeneral.signingDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const formatApplyDate = moment(dataInfoGeneral.applyDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const formatExpirationDate = moment(dataInfoGeneral.expirationDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');

   if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 2) {
    toastr.warning(`${CONST_VARIABLE.DATE_SIGNING_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
  }
  else if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 3) {
    toastr.warning(`${CONST_VARIABLE.DATE_EXPRICE_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
  }
   else if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 4) {
     toastr.warning(`${CONST_VARIABLE.DATE_EXPIRATION_MUST_LARGER_CURRENT_DATE}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
   }
  else if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 0) {
    const sentData = {
      id: dataInfoGeneral.id,
      feeCode: dataInfoGeneral.feeCode,
      classifySigning: dataInfoGeneral.optionClassifySigned ,
      additionalSigning: dataInfoGeneral.additionalSigning ,
      contract: dataInfoGeneral.contractNumber ,
      signDate:dataInfoGeneral.signingDate ,
      applyDate: dataInfoGeneral.applyDate,
      expirationDate: dataInfoGeneral.expirationDate,
      payChannel: dataInfoGeneral.payChannelSet,
      typeSource: convertArrayToString(dataInfoGeneral.typePayment),
      applyType: applyType,
      merchantType: merchantType,
      fileName: fileExcelName,
      action: 'UPDATE',
      modifyUser: 'hainn',
      merchants: convertPropertyInArray(listMerchantLocal),
    };
    updateFeeMerchant(sentData);
    storeListMerchantLocal([]);
  }
  };


  onClickHandlePendingMerchant = () => {
    const { dataInfoGeneral, listMerchantLocal, merchantType, fileExcelName, applyType, updateFeeMerchant, storeListMerchantLocal } = this.props;
    const formatSigningDate = moment(dataInfoGeneral.signingDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const formatApplyDate = moment(dataInfoGeneral.applyDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');
    const formatExpirationDate = moment(dataInfoGeneral.expirationDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY');

     if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 2) {
      toastr.warning(`${CONST_VARIABLE.DATE_SIGNING_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
    }
    else if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 3) {
      toastr.warning(`${CONST_VARIABLE.DATE_EXPRICE_AFTER_DATE_APPLY}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
    }
    else if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 4) {
      toastr.warning(`${CONST_VARIABLE.DATE_EXPIRATION_MUST_LARGER_CURRENT_DATE}`, `${CONST_VARIABLE.TITLE_NOTIFICATION}`, { timeOut: 2500 });
    }
    else if (validateTime(formatSigningDate, formatApplyDate, formatExpirationDate, dataInfoGeneral.status) === 0) {
      const sentData = {
        id: dataInfoGeneral.id,
        feeCode: dataInfoGeneral.feeCode,
        classifySigning: dataInfoGeneral.optionClassifySigned ,
        additionalSigning: dataInfoGeneral.additionalSigning ,
        contract: dataInfoGeneral.contractNumber ,
        signDate:dataInfoGeneral.signingDate ,
        applyDate: dataInfoGeneral.applyDate,
        expirationDate: dataInfoGeneral.expirationDate,
        payChannel: dataInfoGeneral.payChannelSet,
        typeSource: convertArrayToString(dataInfoGeneral.typePayment),
        applyType: applyType,
        merchantType: merchantType,
        fileName: fileExcelName,
        action: 'PENDING',
        modifyUser: 'hainn',
        merchants: convertPropertyInArray(listMerchantLocal),
      };
      updateFeeMerchant(sentData);
      storeListMerchantLocal([]);
    }
  };

  render() {
    const { history, onCLickToOpenModal, isOpen, onClickToCloseModal , onClickModalUnLock, isOpenUnlock, onClickLockMerchant, onClickToUnLockMerchantInEditPage, isID, merchantCode, dataInfoGeneral } = this.props;
    const {
      perPage,
      currentPage,
      totalRow,
      tDataTable,
      isShowModalDelete,
      itemDelete,
    } = this.state;
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

    const showingOption = `Hiển thị ${currentPage * perPage - perPage + 1} - ${(currentPage * perPage) > totalRow ? totalRow : (currentPage * perPage)} của ${totalRow} bản ghi`;
    return (
      <>
        <Col md={12}>
          <Label>
            Tổng số merchant áp dụng:
            <strong className="text-danger pl-1">{totalRow}</strong>
          </Label>
          <div className="merchant-table__table mt-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="40">STT</th>
                  <th>MID</th>
                  <th>Tên Merchant</th>
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
                        <tr className="empty-data"><td className="text-center" colSpan={4}>{CONST_VARIABLE.EMPTY_DATA}</td></tr>
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
          <div>
            <ModalDeleteFee
              toggleDeleteFee={this.toggleDeleteFee}
              isShowModalDelete={isShowModalDelete}
              itemDelete={itemDelete}
            />
            <ModalCommon isOpen={isOpen} onClickToCloseModal={onClickToCloseModal} notifyModal={notifyModal} clickToButtonInMoDal={onClickLockMerchant} data={{isID, merchantCode}} />
            <ModalCommon isOpen={isOpenUnlock} onClickToCloseModal={onClickToCloseModal} notifyModal={notifyUnLockModal} data={{isID, merchantCode}} clickToButtonInMoDal={onClickToUnLockMerchantInEditPage}/>
          </div>
        </Col>
        {this.props.location.pathname === '/merchant/edit-merchant' ?  <Col md={12}>
          <div className="text-center mt-5">
            <Button title="Về danh sách" className="btn bggrey bigger-150" onClick={() => this.goBack()} onKeyPress={() => this.goBack()}>
              <i className="fa fa-arrow-left mr-1" aria-hidden="true" />
              Quay lại
            </Button>
            { dataInfoGeneral && (dataInfoGeneral.status === 4 || dataInfoGeneral.status === 2 || dataInfoGeneral.status === 6) ?  <Button title="Về danh sách" className="btn-info " style={{marginLeft: '30px', fontSize:'120%', padding: '6px 18px', color:'white'}} onClick={this.onClickHandlePendingMerchant}>
              Chờ phê duyệt
            </Button> : null}
            <Button className="btn bggreen bigger-150" style={{marginLeft: '40px'}} onClick={this.onClickHandleUpdateMerchant}>
              Cập nhật
              <i className="fa fa-arrow-right bigger-110 ml-1" />
            </Button>
          </div>
        </Col> :  <Col md={12}>
          <div className="text-center mt-5">
            <Button title="Về danh sách" className="btn bggrey bigger-150" onClick={() => this.goBack()} onKeyPress={() => this.goBack()}>
              <i className="fa fa-arrow-left mr-1" aria-hidden="true" />
              Quay lại
            </Button>
            <Button className="btn btn-middle bigger-150 btn-primary" onClick={() => this.saveMerchant('ADD')}>Lưu </Button>
            <Button className="btn bggreen bigger-150" onClick={() => this.saveMerchant('PENDING')}>
              Chờ duyệt
              <i className="fa fa-arrow-right bigger-110 ml-1" />
            </Button>
          </div>
        </Col>}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  listMerchantNameAndTypeCode: state.addMerchant.listMerchantNameAndTypeCode,
  dataResponseUploadFile: state.addMerchant.dataResponseUploadFile,
  listMerchantLocal: state.addMerchant.listMerchantLocal,
  dataInfoGeneral: state.addMerchant.dataInfoGeneral,
  dataInfoMerchantApply: state.addMerchant.dataInfoMerchantApply,
  dataResponseSaveOrPending: state.addMerchant.dataResponseSaveOrPending,
  isOpen: state.controlModal.isOpen,
  isOpenUnlock: state.controlModal.isOpenUnlock,
  numberLockorUnlock: state.controlModal.numberLockorUnlock,
  isID: state.controlModal.id,
  availableData: state.addMerchant.availableData,
  merchantCode: state.controlModal.merchantCode,
  merchantType: state.addMerchant.merchantType,
  fileExcelName: state.addMerchant.fileExcelName,
  applyType: state.addMerchant.applyType,

});

const mapDispatchToProps = (dispatch) => ({
  storeListMerchantLocal: (data) => dispatch(storeListMerchantLocal(data)),
  addFeeMerchant: (data) => dispatch(addFeeMerchant(data)),
  onCLickToOpenModal: (data, code) => dispatch(openModal(data, code)),
  onClickToCloseModal: (data) => dispatch(closeModal(data)),
  LockInMoDal: (data) => dispatch(clickToLockInMoDal(data)),
  onClickModalUnLock: (data, code) => dispatch(openModalUnLock(data, code)),
  unLockInModal: (data) => dispatch(clickToUnlockInModal(data)),
  onClickLockMerchant: (data) => dispatch(onClickToLockMerchantInEditPage(data)),
  onClickToUnLockMerchantInEditPage: (data) => dispatch(onClickToUnLockMerchantInEditPage(data)),
  updateFeeMerchant: (data) => dispatch(updateFeeMerchant(data)),
  backToListMerchantPage: () => dispatch(backToListMerchantPage())
});

ListMerchant.propTypes = {
  listMerchantLocal: PropTypes.array,
  dataInfoGeneral: PropTypes.object,
  dataInfoMerchantApply: PropTypes.object,
  addFeeMerchant: PropTypes.func,
  dataResponseSaveOrPending: PropTypes.object,
  history: PropTypes.object,
  isOpen: PropTypes.bool,
  isOpenUnlock: PropTypes.bool,
  onClickLockMerchant: PropTypes.func,
  isID: PropTypes.number,
  merchantCode: PropTypes.string,
  onClickToUnLockMerchantInEditPage: PropTypes.func,
  merchantType: PropTypes.string,
  fileExcelName: PropTypes.string,
  applyType: PropTypes.string,
  updateFeeMerchant: PropTypes.func,
  backToListMerchantPage: PropTypes.func,
};
ListMerchant.defaultProps = {
  listMerchantLocal: [],
  dataInfoGeneral: {},
  dataInfoMerchantApply: {},
  addFeeMerchant: () => {},
  dataResponseSaveOrPending: {},
  history: {},
  onCLickToOpenModal: () => {},
  onClickToCloseModal: () => {},
  LockInMoDal: () => {},
  onClickModalUnLock: () => {},
  unLockInModal: () => {},
  onClickLockMerchant: () => {},
  isID: null,
  merchantCode: '',
  onClickToUnLockMerchantInEditPage: () => {},
  merchantType: '',
  fileExcelName: '',
  applyType: '1',
  updateFeeMerchant: () => {},
  backToListMerchantPage: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListMerchant));
