import * as constants from '../constants/MerchantApproveConst';

const initialState = {
  isOpenInfo: true,
  listMerchantDetail: [],
  dataObject: null,
  listMerchantDetailSearch: [],
};

function ApproveMerchantReducer(state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.APPROVE_LIST_MERCHANT:
      return { ...state };

    case constants.APPROVE_LIST_MERCHANT_SUCCESS:
      return { ...state, dataObject: action.data.data, listMerchantDetail: action.data.list };

    case constants.APPROVE_LIST_MERCHANT_FAILED:
      return { ...state };
  }

  return state;
}

export default ApproveMerchantReducer;
