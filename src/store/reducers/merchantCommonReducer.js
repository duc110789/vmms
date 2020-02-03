import * as constants from '../constants/MerchantCommonConstant';

const inititalState = {
  classifySigning: [],
  deniedDesc: [],
  payChannel: [],
  feeStatus: [],
  folowCal: [],
  calculationRules: [],
  calculationForm: [],
  isOpenInfo: false,
  listApplyType: [],
  listBanks: [],
};

function MerchantCommonReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.CLASSIFY_SIGNING:
      return { ...state };
    case constants.GET_CLASSIFY_SIGNING_SUCCESS:
      return { ...state, classifySigning: action.classifySigning };
    case constants.GET_CLASSIFY_SIGNING_FAILSE:
      return { ...state };

    case constants.DENIED_DESC:
      return { ...state };
    case constants.LOAD_DENIED_DESC_SUCCESS:
      return { ...state, deniedDesc: action.deniedDesc };
    case constants.LOAD_DENIED_DESC_FAILED:
      return { ...state };

    case constants.FEE_STATUS:
      return { ...state };
    case constants.LOAD_FEE_STATUS_SUCCESS:
      return { ...state, feeStatus: action.feeStatus };
    case constants.LOAD_FEE_STATUS_FAILED:
      return { ...state };

    case constants.PAY_CHANNEL:
      return { ...state };
    case constants.LOAD_PAY_CHANNEL_SUCCESS:
      return { ...state, payChannel: action.payChannel };
    case constants.LOAD_PAY_CHANNEL_FAILED:
      return { ...state };

    case constants.TYPE_SOURCE:
      return { ...state };
    case constants.LOAD_TYPE_SOURCE_SUCCESS:
      return { ...state, typeSource: action.typeSource };
    case constants.LOAD_TYPE_SOURCE_FAILED:
      return { ...state };

    case constants.FOLOW_CAL:
      return { ...state };
    case constants.LOAD_FOLOW_CAL_SUCCESS:
      return { ...state, folowCal: action.folowCal };
    case constants.LOAD_FOLOW_CAL_FAILED:
      return { ...state };

    case constants.CALCULATION_RULES:
      return { ...state };
    case constants.LOAD_CALCULATION_RULES_SUCCESS:
      return { ...state, calculationRules: action.calculationRules };
    case constants.LOAD_CALCULATION_RULES_FAILED:
      return { ...state };

    case constants.CALCULATION_FORM:
      return { ...state };
    case constants.LOAD_CALCULATION_FORM_SUCCESS:
      return { ...state, calculationForm: action.calculationForm };
    case constants.LOAD_CALCULATION_FORM_FAILED:
      return { ...state };

    case constants.TOGGLE_ACTION:
      inititalState.isOpenInfo = !inititalState.isOpenInfo;
      return state;

    case constants.APPLY_TYPE_MERCHANT:
      return { ...state };
    case constants.APPLY_TYPE_MERCHANT_SUCCESS:
      return { ...state, listApplyType: action.listApplyType };
    case constants.APPLY_TYPE_MERCHANT_FAILED:
      return { ...state };

    case constants.LIST_BANKS:
      return { ...state };
    case constants.LIST_BANKS_SUCCESS:
      return { ...state, listBanks: action.listBanks };
    case constants.LIST_BANKS_FAILED:
      return { ...state };
  }
  return state;
}

export default MerchantCommonReducer;
