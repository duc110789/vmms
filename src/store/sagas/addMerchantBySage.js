import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../constants/AddMerchantConstant';
import {
  getFeeNameListByClassify,
  getAllMcc,
  getAllMerchantByTypeCode,
  postValidationMcBatch,
  addFeeMerchant,
  validateFeeMerchant,
} from '../../apis/fee-manager';

const apiGetMerchantByClassify = async (params) => {
  const idClassify = { type: params };
  const data = await getFeeNameListByClassify(idClassify);
  return data;
};

const apiGetAllMerchantByTypeCode = async (params) => {
  const typeCode = { typeCode: params };
  const data = await getAllMerchantByTypeCode(typeCode);
  return data;
};

const apiGetAllMcc = async () => {
  const data = await getAllMcc();
  return data;
};

const apiAddFeeMerchant = async (params) => {
  const data = await addFeeMerchant(params.data);
  return data;
};

const apiSetFileUpload = async (params) => {
  const data = await postValidationMcBatch(params);
  return data;
};

const apiValidateAddFeeMc = async (params) => {
  const arrMerchantValid = {
    merchantValid: params,
  };
  const data = await validateFeeMerchant(arrMerchantValid);
  return data;
};

function* loadApiGetAllMcc(actions) {
  try {
    const data = yield call(apiGetAllMcc, actions.data);
    yield put({
      type: constants.GET_LIST_FEE_MERCHANT_MCC_SUCCESS,
      listMerchantMcc: data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_FEE_MERCHANT_MCC_FAILSE,
    });
  }
}

function* loadApiGetAllMerchantByTypeCode(actions) {
  try {
    const data = yield call(apiGetAllMerchantByTypeCode, actions.data);
    yield put({
      type: constants.GET_LIST_FEE_MERCHANT_BY_TYPE_CODE_SUCCESS,
      listMerchantName: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_FEE_MERCHANT_BY_TYPE_CODE_FAILSE,
    });
  }
}

function* loadApiGetMerchantByClassify(actions) {
  try {
    const data = yield call(apiGetMerchantByClassify, actions.data);
    yield put({
      type: constants.GET_LIST_MERCHANT_BY_CLASSIFY_SUCCESS,
      listMerchantByClassify: data.list,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_MERCHANT_BY_CLASSIFY_FAILSE,
    });
  }
}

function* loadSetFileUpload(actions) {
  try {
    const data = yield call(apiSetFileUpload, actions.data);
    yield put({
      type: constants.UPLOAD_MC_BY_FILE_EXCELL_SUCCESS,
      dataResponseUploadFile: data,
    });
  } catch (error) {
    yield put({
      type: constants.UPLOAD_MC_BY_FILE_EXCELL_FAILSE,
    });
  }
}

function* loadAddFeeMerchant(actions) {
  try {
    const data = yield call(apiAddFeeMerchant, actions);
    yield put({
      type: constants.ADD_FEE_MERCHANT_SUCCESS,
      dataResponseSaveOrPending: data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_FEE_MERCHANT_FAILSE,
    });
  }
}

function* validateAddFeeMerchant(actions) {
  try {
    const data = yield call(apiValidateAddFeeMc, actions.data);
    yield put({
      type: constants.VALIDATE_ADD_FEE_MERCHANT_SUCCESS,
      responValidateFeeMerchant: data,
    });
  } catch (error) {
    yield put({
      type: constants.VALIDATE_ADD_FEE_MERCHANT_FAILSE,
    });
  }
}

export default function* getMerchantByClassify() {
  yield all([
    takeLatest(constants.LIST_MERCHANT_BY_CLASSIFY, loadApiGetMerchantByClassify),
    takeLatest(constants.LIST_FEE_MERCHANT_MCC, loadApiGetAllMcc),
    takeLatest(constants.LIST_FEE_MERCHANT_BY_TYPE_CODE, loadApiGetAllMerchantByTypeCode),
    takeLatest(constants.UPLOAD_MC_BY_FILE_EXCELL, loadSetFileUpload),
    takeLatest(constants.ADD_FEE_MERCHANT, loadAddFeeMerchant),
    takeLatest(constants.VALIDATE_ADD_FEE_MERCHANT, validateAddFeeMerchant),
  ]);
}
