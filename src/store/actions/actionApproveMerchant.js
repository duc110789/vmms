import * as constants from '../constants/MerchantApproveConst';

// eslint-disable-next-line import/prefer-default-export
export const saveApproveListMerchant = (data) => ({
  type: constants.APPROVE_LIST_MERCHANT,
  data,
});
