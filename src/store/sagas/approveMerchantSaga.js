import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../constants/MerchantApproveConst';
import { processApproveFeeMerchant } from '../../apis/fee-manager';

const apiApproveListMerchant = async (params) => {
  const data = await processApproveFeeMerchant(params.data);
  return data;
};

function* loadApproveListMerchant(actions) {
  try {
    const data = yield call(apiApproveListMerchant, actions);
    yield put({
      type: constants.APPROVE_LIST_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.APPROVE_LIST_MERCHANT_FAILED,
    });
  }
}

export default function* commonSourceSage() {
  yield all([
    takeLatest(constants.APPROVE_LIST_MERCHANT, loadApproveListMerchant),
  ]);
}
