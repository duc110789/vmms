
import * as constants from '../constants/EditMerchantConstant';

const inititalState = {
  dataMerchant: null,
  feeCodeByClassify: null,
  isConfirm: null,
  isSuccess: false,
};

function editMerchantReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.LOAD_INFOR_MERCHANT_BEFORE_EDIT:
      return { ...state };

    case constants.LOAD_INFOR_MERCHANT_BEFORE_SUCCESS:
      return { ...state, dataMerchant: action.data, isConfirm: Math.floor(Math.random() * 1000) };

    case constants.LOAD_INFOR_MERCHANT_BEFORE_FAILED:
      return { ...state };

    case constants.LOAD_FEE_CODE_BY_CLASSIFY:
      return { ...state };

    case constants.LOAD_FEE_CODE_BY_CLASSIFY_SUCCESS:
      return { ...state, feeCodeByClassify: action.data.list };

    case constants.LOAD_FEE_CODE_BY_CLASSIFY_FAILED:
      return { ...state };

    case constants.UPDATE_FEE_MERCHANT:
      return { ...state };

    case constants.UPDATE_FEE_MERCHANT_SUCCESS:
      return { ...state, isSuccess: true };

    case constants.UPDATE_FEE_MERCHANT_FAILED:
      return { ...state };

    case constants.COME_BACK_LIST_MERCHANT_PAGE:
      return { ...state, isSuccess: false };

    case constants.RESET_IS_SUCCESS_VALUE_IN_EDIT_MERCHANT_REDUCER:
      return { ...state, isSuccess: false };
  }

  return state;
}

export default editMerchantReducer;
