import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../constants/MerchantCommonConstant';
import { getCacheStatusByType } from '../../apis/fee-manager';
import { getAllBanks } from '../../apis/vmms-fee';

const apiClassSigning = async () => {
  const data = await getCacheStatusByType({ type: 'CLASSIFY_SIGNING' });
  return data;
};

const apiDeniedDesc = async () => {
  const data = await getCacheStatusByType({ type: 'DENIED_DESC' });
  return data;
};

const apiFeeStatus = async () => {
  const data = await getCacheStatusByType({ type: 'FEE_STATUS' });
  return data;
};

const apiPayChannel = async () => {
  const data = await getCacheStatusByType({ type: 'QR_CHANNEL' });
  return data;
};

const apiTypeSource = async () => {
  const data = await getCacheStatusByType({ type: 'TYPE_SOURCE' });
  return data;
};

const apiFolowCal = async () => {
  const data = await getCacheStatusByType({ type: 'FOLOW_CAL' });
  return data;
};

const apiApplyType = async () => {
  const data = await getCacheStatusByType({ type: 'APPLY_TYPE' });
  return data;
};

const apiCalculationRules = async () => {
  const data = await getCacheStatusByType({ type: 'CALCULATION_RULES' });
  return data;
};

const apiCalculationForm = async () => {
  const data = await getCacheStatusByType({ type: 'CALCULATION_FORM' });
  return data;
};

const apiAllBanks = async () => {
  const data = await getAllBanks();
  return data;
};

function* loadApiClassSigning(actions) {
  try {
    const data = yield call(apiClassSigning);
    yield put({
      type: constants.GET_CLASSIFY_SIGNING_SUCCESS,
      classifySigning: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.GET_CLASSIFY_SIGNING_FAILSE,
    });
  }
}

function* loadApideniedDesc(actions) {
  try {
    const data = yield call(apiDeniedDesc);
    yield put({
      type: constants.LOAD_DENIED_DESC_SUCCESS,
      deniedDesc: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_DENIED_DESC_FAILED,
    });
  }
}

function* loadApiFeeStatus(actions) {
  try {
    const data = yield call(apiFeeStatus);
    yield put({
      type: constants.LOAD_FEE_STATUS_SUCCESS,
      feeStatus: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_FEE_STATUS_FAILED,
    });
  }
}

function* loadApiPayChannel(actions) {
  try {
    const data = yield call(apiPayChannel);
    yield put({
      type: constants.LOAD_PAY_CHANNEL_SUCCESS,
      payChannel: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_PAY_CHANNEL_FAILED,
    });
  }
}

function* loadApiTypeSource(actions) {
  try {
    const data = yield call(apiTypeSource);
    yield put({
      type: constants.LOAD_TYPE_SOURCE_SUCCESS,
      typeSource: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_TYPE_SOURCE_FAILED,
    });
  }
}

function* loadFolowCal(actions) {
  try {
    const data = yield call(apiFolowCal);
    yield put({
      type: constants.LOAD_FOLOW_CAL_SUCCESS,
      folowCal: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_FOLOW_CAL_FAILED,
    });
  }
}

function* loadCalculationRules(actions) {
  try {
    const data = yield call(apiCalculationRules);
    yield put({
      type: constants.LOAD_CALCULATION_RULES_SUCCESS,
      calculationRules: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_CALCULATION_RULES_FAILED,
    });
  }
}

function* loadCalculationForm(actions) {
  try {
    const data = yield call(apiCalculationForm);
    yield put({
      type: constants.LOAD_CALCULATION_FORM_SUCCESS,
      calculationForm: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_CALCULATION_FORM_FAILED,
    });
  }
}

function* loadApplyTypeMerchant(actions) {
  try {
    const data = yield call(apiApplyType);
    yield put({
      type: constants.APPLY_TYPE_MERCHANT_SUCCESS,
      listApplyType: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.APPLY_TYPE_MERCHANT_FAILED,
    });
  }
}

function* loadAllBanks(actions) {
  try {
    const data = yield call(apiAllBanks);
    yield put({
      type: constants.LIST_BANKS_SUCCESS,
      listBanks: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.LIST_BANKS_FAILED,
    });
  }
}

export default function* commonSourceSage() {
  yield all([
    takeLatest(constants.DENIED_DESC, loadApideniedDesc),
    takeLatest(constants.CLASSIFY_SIGNING, loadApiClassSigning),
    takeLatest(constants.FEE_STATUS, loadApiFeeStatus),
    takeLatest(constants.PAY_CHANNEL, loadApiPayChannel),
    takeLatest(constants.TYPE_SOURCE, loadApiTypeSource),
    takeLatest(constants.FOLOW_CAL, loadFolowCal),
    takeLatest(constants.CALCULATION_RULES, loadCalculationRules),
    takeLatest(constants.CALCULATION_FORM, loadCalculationForm),
    takeLatest(constants.APPLY_TYPE_MERCHANT, loadApplyTypeMerchant),
    takeLatest(constants.LIST_BANKS, loadAllBanks),
  ]);
}
