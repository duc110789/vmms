import * as constants from '../constants/ModalConstant';

export const openModal = (data, code) => ({
  type: constants.CLICK_TO_OPEN_MODAL,
  data,
  code,
});

export const closeModal = (data) => ({
  type: constants.CLICK_TO_CLOSE_MODAL,
  data,
});

export const clickToLockInMoDal = (data) => ({
  type: constants.CLICK_TO_LOCK_IN_MODAL,
  data,
});

export const clickToUnlockInModal = (data) => ({
  type: constants.CLICK_TO_UNLOCK_MODAL,
  data,
});

export const openModalUnLock = (data, code) => ({
  type: constants.CLICK_TO_OPEN_MODAL_UNLOCK,
  data,
  code
});

export const onClickToLockMerchantInEditPage = (data) => ({
  type: constants.CLICK_TO_LOCK_MERCHANT_IN_EDIT,
  data,
});

export const onClickToUnLockMerchantInEditPage = (data) => ({
  type: constants.CLICK_TO_UN_LOCK_MERCHANT_IN_EDIT,
  data,
});
