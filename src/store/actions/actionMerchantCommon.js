import * as constants from '../constants/MerchantCommonConstant';

// eslint-disable-next-line import/prefer-default-export
export const getClassifySigning = () => ({
  type: constants.CLASSIFY_SIGNING,
});

export const loaddeniedDesc = () => ({
  type: constants.DENIED_DESC,
});

export const loadFeeStatus = () => ({
  type: constants.FEE_STATUS,
});

export const loadPayChannel = () => ({
  type: constants.PAY_CHANNEL,
});

export const loadTypeSource = () => ({
  type: constants.TYPE_SOURCE,
});

export const loadFolowCal = () => ({
  type: constants.FOLOW_CAL,
});

export const loadCalculationRules = () => ({
  type: constants.CALCULATION_RULES,
});

export const loadCalculationForm = () => ({
  type: constants.CALCULATION_FORM,
});

export const toggleAction = () => ({
  type: constants.TOGGLE_ACTION,
});

export const getApplyTypeMerchant = () => ({
  type: constants.APPLY_TYPE_MERCHANT,
});

export const getListBank = () => ({
  type: constants.LIST_BANKS,
});

export const getAllMccVmms = (data) => ({
  type: constants.LIST_MCC,
  data,
});

export const getFeeCodeFeeNameVmms = (data) => ({
  type: constants.FEE_CODE_FEE_NAME_VMMS,
  data,
});

export const addMccNational = (data) => ({
  type: constants.ADD_MCC_NATIONAL,
  data,
});

export const removeMccNational = (data) => ({
  type: constants.REMOVE_MCC_NATIONAL,
  data,
});

export const applyListMcc = (data) => ({
  type: constants.APPLY_MCC_NATIONAL,
  data,
});
