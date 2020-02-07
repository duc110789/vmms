import * as constants from '../constants/VmmsListPageConstant'

const inititalState = {
  arrayMasterMerchant: '',
  arrayFeeCode: '',
  arrayStatus: '',
  arrayMCC: '',
};

function vmmsPageListReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_MASTER_MERCHANT:
      return { ...state };

    case constants.GET_MASTER_MERCHANT_SUCCESS:
      return { ...state, arrayMasterMerchant: action.data };

    case constants.GET_MASTER_MERCHANT_FAILED:
      return { ...state };

    case constants.GET_FEE_CODE:
      return { ...state };

    case constants.GET_FEE_CODE_SUCCESS:
      return { ...state, arrayFeeCode: action.data };

    case constants.GET_FEE_CODE_FAILED:
      return { ...state };

    case constants.GET_STATUS:
      return { ...state };

    case constants.GET_STATUS_SUCCESS:
      return { ...state, arrayStatus: action.data };

    case constants.GET_STATUS_FAILED:
      return { ...state };


    case constants.GET_ALL_MCC:
      return { ...state };

    case constants.GET_ALL_MCC_SUCCESS:
      return { ...state, arrayMCC: action.data };

    case constants.GET_ALL_MCC_FAILED:
      return { ...state };
  }

  return state;
}
export default vmmsPageListReducer;
