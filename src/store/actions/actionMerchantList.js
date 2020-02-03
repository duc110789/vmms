
import * as constants from '../constants/MerchantListConstant';

// eslint-disable-next-line import/prefer-default-export
export const clickButton = (data) => ({
  type: constants.CLICK_ONE_BUTTON,
  data,
});

export const loadFeeNameMerchant = (data) => ({
  type: constants.LOAD_FEE_NAME_MERCHANT,
  data,
});

export const loadFeeNameMerchantSuccess = () => ({
  type: constants.LOAD_FEE_NAME_MERCHANT_SUCCESS,
});

export const loadTypeSource = () => ({
  type: constants.LOAD_TYPE_SOURCE,
});

export const loadTypeChannel = () => ({
  type: constants.LOAD_TYPE_CHANNEL,
});

export const textMerchantName = (data) => ({
  type: constants.TEXT_MERCHANT_NAME,
  data,
});

export const loadMerchantStatus = () => ({
  type: constants.LOAD_FEE_MERCHANT_STATUS,
});

export const loadTable = (data) => ({
  type: constants.LOAD_TABLE,
  data,
});

export const searchByButton = (data) => ({
  type: constants.SEARCH_FEE_MERCHANT_BUTTON,
  data,
});

export const clickChangeRowPage = (data, fromRow, toRow) => ({
  type: constants.CLICK_CHANGE_ROW_PAGE,
  data,
  fromRow,
  toRow,
});

export const clickToDownloadExcelFile = (data) => ({
  type: constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE,
  data,
});

export const clickToEditMerchant = (data) => ({
  type: constants.CLICK_TO_EDIT_A_MERCHANT,
  data,
});
