import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../constants/MerchantListConstant';
import * as modalConstants from '../constants/ModalConstant';
import {
  getFeeCode, getCacheStatusByType, getListMerchant, getFeeMerchantList,
  getExcelFileMerchantList, lockFeeMerchant,
} from '../../apis/fee-manager';

const apiTypeSource = async () => {
  const data = await getCacheStatusByType({ type: 'TYPE_SOURCE' });
  return data;
};

const apiTypeChannel = async () => {
  const data = await getCacheStatusByType({ type: 'QR_CHANNEL' });
  return data;
};

const apiMerchantStatus = async () => {
  const data = await getCacheStatusByType({ type: 'FEEMERCHANT_STATUS' });
  return data;
};

const apiFeeMerchantList = async (data) => {
  const dataApi = await getFeeMerchantList(data);
  return dataApi;
};

const apiFeeMerchantListExportExcel = async (data) => {
  const dataApi = await getExcelFileMerchantList(data);
  return dataApi;
};

const textNameMerchantApi = async (params) => {
  const transferData = {
    term: params, merchantCode: 'string', page: '1', status: 'ALL', pageSize: '20',
  };
  if (transferData.term !== '') {
    const data = await getListMerchant(
      transferData,
    );
    return data;
  }
  return null;
};

const apiLockMerchantFee = async (id) => {
  const data = await lockFeeMerchant({ id, action: 'LOCK', lockUser: 'hainn' });
  return data;
};

function* loadApiFeeCode(actions) {
  try {
    const data = yield call(getFeeCode);
    yield put({
      type: constants.LOAD_FEE_NAME_MERCHANT_SUCCESS,
      feeNameMerchant: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_FEE_NAME_MERCHANT_FAILED,
    });
  }
}

function* loadApiTypeSource() {
  try {
    const dataSource = yield call(apiTypeSource);
    yield put({
      type: constants.LOAD_TYPE_SOURCE_SUCCESS,
      data: dataSource.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_TYPE_SOURCE_FAILED,
    });
  }
}

function* loadApiTypeChannel() {
  try {
    const dataSource = yield call(apiTypeChannel);
    yield put({
      type: constants.LOAD_TYPE_CHANNEL_SUCCESS,
      data: dataSource.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_TYPE_CHANNEL_FAILED,
    });
  }
}

function* loadApiArrayNameMerchant(actions) {
  try {
    const data = yield call(textNameMerchantApi, actions.data);
    yield put({
      type: constants.TEXT_MERCHANT_NAME_SUCCESS,
      data: data.merchantListCache,
    });
  } catch (error) {
    yield put({
      type: constants.TEXT_MERCHANT_NAME_FAILED,
    });
  }
}

function* loadApiMerchantStatus() {
  try {
    const data = yield call(apiMerchantStatus);
    yield put({
      type: constants.LOAD_FEE_MERCHANT_STATUS_SUCCESS,
      data: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_FEE_MERCHANT_STATUS_FAILED,
    });
  }
}

function* loadTable(actions) {
  try {
    const data = yield call(apiFeeMerchantList, actions.data);
    yield put({
      type: constants.LOAD_TABLE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_TABLE_FAILED,
    });
  }
}

function* loadSearchTable(actions) {
  try {
    const data = yield call(apiFeeMerchantList, actions.data);
    yield put({
      type: constants.SEARCH_FEE_MERCHANT_BUTTON_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.SEARCH_FEE_MERCHANT_BUTTON_FAILED,
    });
  }
}

function* loadChangeRowTable(actions) {
  try {
    const sendData = { ...actions.data, fromRow: actions.fromRow, toRow: actions.toRow };
    const data = yield call(apiFeeMerchantList, sendData);
    yield put({
      type: constants.CLICK_CHANGE_ROW_PAGE_SUCCESS,
      data,
      fromRow: actions.fromRow,
      toRow: actions.toRow,
    });
  } catch (error) {
    yield put({
      type: constants.CLICK_CHANGE_ROW_PAGE_FAILED,
    });
  }
}

function* loadDataExportExcelMerchantList(actions) {
  try {
    const sendData = {
      feeCode: actions.data.feeCode,
      payChannel: actions.data.payChannel,
      typeSource: actions.data.typeSource,
      status: actions.data.status,
      merchantCode: actions.data.merchantCode,
      applyDate: actions.data.applyDate,
      expirationDate: actions.data.expirationDate,
      contract: actions.data.contract,
    };
    const data = yield call(apiFeeMerchantListExportExcel, sendData);
    yield put({
      type: constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE_FAILED,
    });
  }
}

function* loadApiLockInModal(actions) {
  try {
    yield call(apiLockMerchantFee, actions.data);
    yield put({
      type: modalConstants.CLICK_TO_LOCK_IN_MODAL_SUCCESS,
      number: Math.floor(Math.random() * 100),
    });
  } catch (error) {
    yield put({
      type: modalConstants.CLICK_TO_LOCK_IN_MODAL_FAILED,
    });
  }
}

function* loadApiUnlockInModal(actions) {
  try {
    yield lockFeeMerchant({
      id: actions.data,
      action: 'UNLOCK',
      lockUser: 'hainn',
    });
    yield put({
      type: modalConstants.CLICK_TO_UNLOCK_MODAL_SUCCESS,
      number: Math.floor(Math.random() * 100),
    });
  } catch (error) {
    yield put({
      type: modalConstants.CLICK_TO_LOCK_IN_MODAL_FAILED,
    });
  }
}


export default function* merchantListSaga() {
  yield all([
    takeLatest(constants.LOAD_FEE_NAME_MERCHANT, loadApiFeeCode),
    takeLatest(constants.LOAD_TYPE_SOURCE, loadApiTypeSource),
    takeLatest(constants.LOAD_TYPE_CHANNEL, loadApiTypeChannel),
    takeLatest(constants.TEXT_MERCHANT_NAME, loadApiArrayNameMerchant),
    takeLatest(constants.LOAD_FEE_MERCHANT_STATUS, loadApiMerchantStatus),
    takeLatest(constants.LOAD_TABLE, loadTable),
    takeLatest(constants.SEARCH_FEE_MERCHANT_BUTTON, loadSearchTable),
    takeLatest(constants.CLICK_CHANGE_ROW_PAGE, loadChangeRowTable),
    takeLatest(constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE, loadDataExportExcelMerchantList),
    takeLatest(modalConstants.CLICK_TO_LOCK_IN_MODAL, loadApiLockInModal),
    takeLatest(modalConstants.CLICK_TO_UNLOCK_MODAL, loadApiUnlockInModal),
  ]);
}
