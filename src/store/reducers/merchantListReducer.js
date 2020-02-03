import * as constants from '../constants/MerchantListConstant';

const inititalState = {
  feeName: null,
  typeSource: null,
  payChannel: null,
  textMerchantName: null,
  arrayMerchantName: null,
  merchantCode: '',
  status: null,
  fromRow: 0,
  toRow: 5,
  applyDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  expirationDate: new Date(),
  arrayTableData: null,
  dataSearch: null,
  dataExcelFile: null,
};

function MerchantListReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.CLICK_ONE_BUTTON:
      return { ...state, data: { ...state.data, count: action.data } };

    case constants.LOAD_FEE_NAME_MERCHANT:
      return { ...state };

    case constants.LOAD_FEE_NAME_MERCHANT_SUCCESS:
      return { ...state, feeName: action.feeNameMerchant };

    case constants.LOAD_FEE_NAME_MERCHANT_FAILED:
      return { ...state };

    case constants.LOAD_TYPE_SOURCE:
      return { ...state };

    case constants.LOAD_TYPE_SOURCE_SUCCESS:
      return { ...state, typeSource: action.data };

    case constants.LOAD_TYPE_SOURCE_FAILED:
      return { ...state };

    case constants.LOAD_TYPE_CHANNEL:
      return { ...state };

    case constants.LOAD_TYPE_CHANNEL_SUCCESS:
      return { ...state, payChannel: action.data };

    case constants.LOAD_TYPE_CHANNEL_FAILED:
      return { ...state };

    case constants.TEXT_MERCHANT_NAME:
      return { ...state, textMerchantName: action };

    case constants.TEXT_MERCHANT_NAME_SUCCESS:
      return { ...state, arrayMerchantName: action.data };

    case constants.TEXT_MERCHANT_NAME_FAILED:
      return { ...state };

    case constants.LOAD_FEE_MERCHANT_STATUS:
      return { ...state };

    case constants.LOAD_FEE_MERCHANT_STATUS_SUCCESS:
      return { ...state, status: action.data };

    case constants.LOAD_FEE_MERCHANT_STATUS_FAILED:
      return { ...state };

    case constants.LOAD_TABLE:
      return { ...state, dataSearch: action.data };

    case constants.LOAD_TABLE_SUCCESS:
      return { ...state, arrayTableData: action.data };

    case constants.LOAD_TABLE_FAILED:
      return { ...state };

    case constants.SEARCH_FEE_MERCHANT_BUTTON:
      return { ...state, dataSearch: action.data };

    case constants.SEARCH_FEE_MERCHANT_BUTTON_SUCCESS:
      return { ...state, arrayTableData: action.data };

    case constants.SEARCH_FEE_MERCHANT_BUTTON_FAILED:
      return { ...state };

    case constants.CLICK_CHANGE_ROW_PAGE:
      return { ...state };

    case constants.CLICK_CHANGE_ROW_PAGE_SUCCESS:
      return {
        ...state, arrayTableData: action.data, fromRow: action.fromRow, toRow: action.toRow,
      };

    case constants.CLICK_CHANGE_ROW_PAGE_FAILED:
      return { ...state };

    case constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE:
      return { ...state };

    case constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE_SUCCESS:
      return { ...state, dataExcelFile: action.data };

    case constants.CLICK_TO_EXPORT_EXCEL_MERCHANT_LIST_FILE_FAILED:
      return { ...state };

    case constants.CLICK_TO_EDIT_A_MERCHANT:
      return { ...state };
  }

  return state;
}


export default (MerchantListReducer);
