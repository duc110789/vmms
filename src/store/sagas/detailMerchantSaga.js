import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../constants/MerchantDetailConstant';
import { getFeeMerchantDetail, getFeeMerchantDetailBySearch } from '../../apis/fee-manager';

const apiDetailMerchant = async (idMc) => {
  const params = {
    id: idMc.data,
    fromRow: 0,
    toRow: 0,
  };
  const data = await getFeeMerchantDetail(params);
  return data;
};

function* loadApiDetailMerchant(actions) {
  try {
    const data = yield call(apiDetailMerchant, actions);
    yield put({
      type: constants.LOAD_REASON_FOR_REFUSE_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_REASON_FOR_REFUSE_MERCHANT_FAILED,
    });
  }
}

const apiDetailMerchantSearch = async (params) => {
  const data = await getFeeMerchantDetailBySearch(params.data);
  return data;
};

function* loadApiDetailMerchantSearch(actions) {
  try {
    const data = yield call(apiDetailMerchantSearch, actions);
    yield put({
      type: constants.LOAD_LIST_MERCHANT_DETAIL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_LIST_MERCHANT_DETAIL_FAILED,
    });
  }
}

export default function* commonSourceSage() {
  yield all([
    takeLatest(constants.LOAD_REASON_FOR_REFUSE_MERCHANT, loadApiDetailMerchant),
    takeLatest(constants.LOAD_LIST_MERCHANT_DETAIL, loadApiDetailMerchantSearch),
  ]);
}
