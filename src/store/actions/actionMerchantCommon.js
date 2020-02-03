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
