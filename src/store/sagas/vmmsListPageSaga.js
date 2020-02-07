import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../constants/VmmsListPageConstant';
import { callApiMasterMerchant, getFeeCode, getCacheStatusByType, callApiAllMCC } from '../../apis/fee-manager';

const apiMerchantStatus = async () => {
  const data = await getCacheStatusByType({ type: 'FEE_BANK_STATUS' });
  return data;
};

function* loadApiMasterMerchant(actions) {
  try {
    const data = yield call(callApiMasterMerchant);
    yield put({
      type: constants.GET_MASTER_MERCHANT_SUCCESS,
      data: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MASTER_MERCHANT_FAILED,
    });
  }
}

function* loadApiLoadAllFeeCode(actions) {
  try {
    const data = yield call(getFeeCode);
    yield put({
      type: constants.GET_FEE_CODE_SUCCESS,
      data: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.GET_FEE_CODE_FAILED,
    });
  }
}

function* loadApiStatusMasterMerchant(actions) {
  try {
    const data = yield call(callApiAllMCC);
    console.log(data)
    yield put({
      type: constants.GET_ALL_MCC_SUCCESS,
      data: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_MCC_FAILED,
    });
  }
}

export default function* vmmsListPageSaga() {
  yield all([
    takeLatest(constants.GET_MASTER_MERCHANT, loadApiMasterMerchant),
    takeLatest(constants.GET_FEE_CODE, loadApiLoadAllFeeCode),
    takeLatest(constants.GET_STATUS, loadApiStatusMasterMerchant),
    takeLatest(constants.GET_ALL_MCC, loadApiStatusMasterMerchant),
  ]);
}
