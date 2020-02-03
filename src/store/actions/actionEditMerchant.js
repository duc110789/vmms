/* eslint-disable import/prefer-default-export */
import * as constants from '../constants/EditMerchantConstant';

export const loadInforMerchant = (data) => ({
  type: constants.LOAD_INFOR_MERCHANT_BEFORE_EDIT,
  data,
});

export const loadFeeCodeByClassify = (data) => ({
  type: constants.LOAD_FEE_CODE_BY_CLASSIFY,
  data,
});

export const updateFeeMerchant = (data) => ({
  type: constants.UPDATE_FEE_MERCHANT,
  data,
});

export const backToListMerchantPage = () => ({
  type: constants.COME_BACK_LIST_MERCHANT_PAGE,
});

export const resetIsSuccessInEditMerchantReducer = () => ({
  type: constants.RESET_IS_SUCCESS_VALUE_IN_EDIT_MERCHANT_REDUCER,
});
