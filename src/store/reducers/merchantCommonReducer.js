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
  listMcc: [],
  listFeeCodeFeeNameVmms: [],
  listMccNational: [],
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

    case constants.LIST_MCC:
      return { ...state };
    case constants.LIST_MCC_SUCCESS:
      return { ...state, listMcc: action.listMcc };
    case constants.LIST_MCC_FAILED:
      return { ...state };

    case constants.FEE_CODE_FEE_NAME_VMMS:
      return { ...state };
    case constants.FEE_CODE_FEE_NAME_VMMS_SUCCESS:
      return { ...state, listFeeCodeFeeNameVmms: action.listFeeCodeFeeNameVmms };
    case constants.FEE_CODE_FEE_NAME_VMMS_FAILED:
      return { ...state };

    case constants.ADD_MCC_NATIONAL:
      return { ...state, listMccNational: [...state.listMccNational, ...action.data] };

    case constants.REMOVE_MCC_NATIONAL:
      for (let i = 0; i < state.listMccNational.length; i += 1) {
        if (i === action.data.index) {
          state.listMccNational.splice(i, 1);
        }
      }
      for (let i = action.data.data.mccNational.length - 1; i >= 0; i -= 1) {
        state.listMcc.push({
          mccCode: action.data.data.mccNational[i].value,
          mccName: action.data.data.mccNational[i].label,
        });
      }
      return {
        ...state,
        listFeeCodeFeeNameVmms: [...state.listFeeCodeFeeNameVmms, ...[{
          feeCode: action.data.data.feeCodeAndFeeName.value,
          feeName: action.data.data.feeCodeAndFeeName.feeName,
        }]],
      };

    case constants.APPLY_MCC_NATIONAL:
      for (let i = action.data.mccNational.length - 1; i >= 0; i -= 1) {
        state.listMcc.splice(action.data.mccNational[i].key, 1);
      }

      for (let i = 0; i < state.listFeeCodeFeeNameVmms.length; i += 1) {
        if (i === action.data.feeCodeAndFeeName.key) {
          state.listFeeCodeFeeNameVmms.splice(action.data.feeCodeAndFeeName.key, 1);
        }
      }
      return { ...state };
  }
  return state;
}

export default MerchantCommonReducer;
