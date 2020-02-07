import * as constants from '../constants/VmmsListPageConstant';

// eslint-disable-next-line import/prefer-default-export
export const getMasterMerchant = () => ({
  type: constants.GET_MASTER_MERCHANT,
});


export const getFeeCode = () => ({
  type: constants.GET_FEE_CODE,
});

export const getStatus = () => ({
  type: constants.GET_STATUS,
});

export const getMCC = () => ({
  type: constants.GET_ALL_MCC,
});

