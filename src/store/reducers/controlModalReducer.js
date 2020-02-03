
import * as constants from '../constants/ModalConstant';

const inititalState = {
  isOpen: false,
  id: null,
  isOpenUnlock: false,
  numberLockorUnlock: null,
  merchantArray: [],
  merchantCode: '',
  isConfirmLock: null,
};

function controlModalReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.CLICK_TO_OPEN_MODAL:
      return { ...state, isOpen: true, id: action.data, merchantCode: action.code };

    case constants.CLICK_TO_CLOSE_MODAL:
      return { ...state, isOpen: false, isOpenUnlock: false };

    case constants.CLICK_TO_LOCK_IN_MODAL:
      return { ...state };

    case constants.CLICK_TO_LOCK_IN_MODAL_SUCCESS:
      return { ...state, isOpen: false, numberLockorUnlock: action.number };

    case constants.CLICK_TO_LOCK_IN_MODAL_FAILED:
      return { ...state };

    case constants.CLICK_TO_UNLOCK_MODAL:
      return { ...state };

    case constants.CLICK_TO_UNLOCK_MODAL_SUCCESS:
      return { ...state, isOpenUnlock: false, numberLockorUnlock: action.number };

    case constants.CLICK_TO_UNLOCK_MODAL_FAILED:
      return { ...state };

    case constants.CLICK_TO_OPEN_MODAL_UNLOCK:
      return { ...state, isOpenUnlock: true, id: action.data, merchantCode: action.code };


    case constants.CLICK_TO_LOCK_MERCHANT_IN_EDIT:
      return { ...state };

    case constants.CLICK_TO_LOCK_MERCHANT_IN_EDIT_SUCCESS:
      return { ...state, isOpen: false, isConfirmLock: false };

    case constants.CLICK_TO_LOCK_MERCHANT_IN_EDIT_FAILED:
      return { ...state };

    case constants.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT:
      return { ...state };

    case constants.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT_SUCCESS:
      return { ...state, isOpenUnlock: false, isConfirmLock: true };

    case constants.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT_FAILED:
      return { ...state };
  }

  return state;
}

export default (controlModalReducer);
