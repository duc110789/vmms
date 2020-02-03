
import * as constants from '../constants/MerchantDetailConstant';

// eslint-disable-next-line import/prefer-default-export
export const loadReasonForRefuseMerchant = (data) => ({
  type: constants.LOAD_REASON_FOR_REFUSE_MERCHANT,
  data,
});
export const loadReasonForRefuseMerchantSuccess = () => ({
  type: constants.LOAD_REASON_FOR_REFUSE_MERCHANT_SUCCESS,
});
export const loadReasonForRefuseMerchantFailed = () => ({
  type: constants.LOAD_REASON_FOR_REFUSE_MERCHANT_FAILED,
});

export const loadListMerchantDetail = (data) => ({
  type: constants.LOAD_LIST_MERCHANT_DETAIL,
  data,
});
export const loadListMerchantDetailSuccess = () => ({
  type: constants.LOAD_LIST_MERCHANT_DETAIL_SUCCESS,
});
export const loadListMerchantDetailFailed = () => ({
  type: constants.LOAD_LIST_MERCHANT_DETAIL_FAILED,
});
