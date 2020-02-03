import * as constants from '../constants/AddMerchantConstant';

const initialState = {
  listMerchantByClassify: null,
  listMerchantMcc: null,
  listMerchantName: null,
  listMerchantNameAndTypeCode: null,
  dataInfoGeneral: null,
  dataInfoMerchantApply: null,
  dataResponseUploadFile: null,
  listMerchantLocal: [],
  dataResponseSaveOrPending: null,
  responValidateFeeMerchant: {},
  availableData: [],
  merchantType: '',
  fileExcelName: '',
  applyType: '1',
};

function ListMerchantByClassifyReducer(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.LIST_MERCHANT_BY_CLASSIFY:
      return { ...state };
    case constants.GET_LIST_MERCHANT_BY_CLASSIFY_SUCCESS:
      return { ...state, listMerchantByClassify: action.listMerchantByClassify };
    case constants.GET_LIST_MERCHANT_BY_CLASSIFY_FAILSE:
      return { ...state };

    case constants.LIST_FEE_MERCHANT_MCC:
      return { ...state };
    case constants.GET_LIST_FEE_MERCHANT_MCC_SUCCESS:
      return { ...state, listMerchantMcc: action.listMerchantMcc };
    case constants.GET_LIST_FEE_MERCHANT_MCC_FAILSE:
      return { ...state };

    case constants.LIST_FEE_MERCHANT_BY_TYPE_CODE:
      return { ...state, merchantType: action.data };
    case constants.GET_LIST_FEE_MERCHANT_BY_TYPE_CODE_SUCCESS:
      return { ...state, listMerchantName: action.listMerchantName };
    case constants.GET_LIST_FEE_MERCHANT_BY_TYPE_CODE_FAILSE:
      return { ...state };

    case constants.LIST_FEE_MERCHANT_NAME_AND_TYPE_CODE:
      return { ...state, listMerchantNameAndTypeCode: action.data };

    case constants.GET_INFO_GENERAL_MERCHANT:
      return { ...state, dataInfoGeneral: action.data };

    case constants.GET_INFO_APPLY_MERCHANT:
      return { ...state, dataInfoMerchantApply: action.data };

    case constants.UPLOAD_MC_BY_FILE_EXCELL:
      return { ...state, fileExcelName: action.data.fileName };
    case constants.UPLOAD_MC_BY_FILE_EXCELL_SUCCESS:
      return { ...state, dataResponseUploadFile: action.dataResponseUploadFile };
    case constants.UPLOAD_MC_BY_FILE_EXCELL_FAILSE:
      return { ...state };

    case constants.STORE_LIST_MERCHANT_LOCAL:
      return { ...state, listMerchantLocal: action.data };

    case constants.ADD_FEE_MERCHANT:
      return { ...state };
    case constants.ADD_FEE_MERCHANT_SUCCESS:
      return { ...state, dataResponseSaveOrPending: action.dataResponseSaveOrPending };
    case constants.ADD_FEE_MERCHANT_FAILSE:
      return { ...state };

    case constants.VALIDATE_ADD_FEE_MERCHANT:
      return { ...state };
    case constants.VALIDATE_ADD_FEE_MERCHANT_SUCCESS:
      return { ...state, responValidateFeeMerchant: action.responValidateFeeMerchant };
    case constants.VALIDATE_ADD_FEE_MERCHANT_FAILSE:
      return { ...state };

    case constants.GET_INFO_GENERAL_MERCHANT_EDIT_PAGE:
      return { ...state, dataInfoGeneral: action.data };

    case constants.GET_ARRAY_DATA_MERCHANT_AVAILABLE:
      return { ...state, availableData: action.data };

    case constants.CHANGE_VALUE_APPLY_TYPE:
      return { ...state, applyType: action.data };
  }
  return state;
}

export default ListMerchantByClassifyReducer;
