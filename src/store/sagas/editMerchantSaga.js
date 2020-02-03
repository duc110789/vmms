import {
  all, put, takeLatest,
} from 'redux-saga/effects';
import * as constants from '../constants/EditMerchantConstant';
import * as listConstant from '../constants/MerchantListConstant';
import * as modalConstant from '../constants/ModalConstant';
import {
  getDetailMerchant, getFeeNameListByClassify, updateMerchant, updateFeeMerchant,
} from '../../apis/fee-manager';


function* loadDetailMerchant(actions) {
  try {
    const data = yield getDetailMerchant({ id: actions.data });
    yield put({
      type: constants.LOAD_INFOR_MERCHANT_BEFORE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_INFOR_MERCHANT_BEFORE_FAILED,
    });
  }
}

function* loadDataFeeCodeByClassify(actions) {
  try {
    const data = yield getFeeNameListByClassify({ type: actions.data });
    yield put({
      type: constants.LOAD_FEE_CODE_BY_CLASSIFY_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_FEE_CODE_BY_CLASSIFY_FAILED,
    });
  }
}

function* callApiLockMerchant(actions) {
  try {
    yield updateMerchant({ id: actions.data.isID, action: 'LOCK', merchantCode: actions.data.merchantCode });
    yield put({
      type: modalConstant.CLICK_TO_LOCK_MERCHANT_IN_EDIT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: modalConstant.CLICK_TO_LOCK_MERCHANT_IN_EDIT_FAILED,
    });
  }
}

function* callApiUnLockMerchant(actions) {
  try {
    yield updateMerchant({ id: actions.data.isID, action: 'UNLOCK', merchantCode: actions.data.merchantCode });
    yield put({
      type: modalConstant.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: modalConstant.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT_FAILED,
    });
  }
}

function* callApiUpdateFeeMerchant(actions) {
  try {
    yield updateFeeMerchant(actions.data);
    yield put({
      type: constants.UPDATE_FEE_MERCHANT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_FEE_MERCHANT_FAILED,
    });
  }
}

export default function* editMerchantSaga() {
  yield all([
    takeLatest(listConstant.CLICK_TO_EDIT_A_MERCHANT, loadDetailMerchant),
    takeLatest(constants.LOAD_FEE_CODE_BY_CLASSIFY, loadDataFeeCodeByClassify),
    takeLatest(modalConstant.CLICK_TO_LOCK_MERCHANT_IN_EDIT, callApiLockMerchant),
    takeLatest(modalConstant.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT, callApiUnLockMerchant),
    takeLatest(constants.UPDATE_FEE_MERCHANT, callApiUpdateFeeMerchant),
  ]);
}
