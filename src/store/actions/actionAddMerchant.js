import * as constants from '../constants/AddMerchantConstant';

// eslint-disable-next-line import/prefer-default-export
export const getListMerchantByClassify = (data) => ({
  type: constants.LIST_MERCHANT_BY_CLASSIFY,
  data,
});

export const getListMerchantMcc = () => ({
  type: constants.LIST_FEE_MERCHANT_MCC,
});

export const getListMerchantNameByTypeCode = (data) => ({
  type: constants.LIST_FEE_MERCHANT_BY_TYPE_CODE,
  data,
});

export const saveListFeeMerchantName = (data) => ({
  type: constants.LIST_FEE_MERCHANT_NAME_AND_TYPE_CODE,
  data,
});

export const getInfoGeneralMerchant = (data) => ({
  type: constants.GET_INFO_GENERAL_MERCHANT,
  data,
});

export const getInfoApplyMerchant = (data) => ({
  type: constants.GET_INFO_APPLY_MERCHANT,
  data,
});

export const getFileUploadMerchant = (data) => ({
  type: constants.UPLOAD_MC_BY_FILE_EXCELL,
  data,
});

export const storeListMerchantLocal = (data) => ({
  type: constants.STORE_LIST_MERCHANT_LOCAL,
  data,
});

export const addFeeMerchant = (data) => ({
  type: constants.ADD_FEE_MERCHANT,
  data,
});

export const validateAddFeeMerchant = (data) => ({
  type: constants.VALIDATE_ADD_FEE_MERCHANT,
  data,
});

export const getInfoGeneralMerchantInEditPage = (data) => ({
  type: constants.GET_INFO_GENERAL_MERCHANT_EDIT_PAGE,
  data,
});

export const getAvailableDataMerchant = (data) => ({
  type: constants.GET_ARRAY_DATA_MERCHANT_AVAILABLE,
  data,
})

export const onCLickchangeValueApplyType = (data) => ({
  type: constants.CHANGE_VALUE_APPLY_TYPE,
  data,
})
