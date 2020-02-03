import * as constants from '../constants/MerchantDetailConstant';

const inititalState = {
  isOpenInfo: true,
  listMerchantDetail: [],
  dataObject: null,
  listMerchantDetailSearch: [],
};

function MerchantDetailReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.LOAD_REASON_FOR_REFUSE_MERCHANT:
      return { ...state };

    case constants.LOAD_REASON_FOR_REFUSE_MERCHANT_SUCCESS:
      return { ...state, dataObject: action.data.data, listMerchantDetail: action.data.list };

    case constants.LOAD_REASON_FOR_REFUSE_MERCHANT_FAILED:
      return { ...state };

    case constants.LOAD_LIST_MERCHANT_DETAIL:
      return { ...state };

    case constants.LOAD_LIST_MERCHANT_DETAIL_SUCCESS:
      return { ...state, listMerchantDetailSearch: action.data.list };

    case constants.LOAD_LIST_MERCHANT_DETAIL_FAILED:
      return { ...state };
  }

  return state;
}

export default MerchantDetailReducer;
