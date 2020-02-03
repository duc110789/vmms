import { all, fork } from 'redux-saga/effects';
import merchantListSaga from './listMerchantSaga';
import commonSourceSate from './commonSourceSage';
import addMerchant from './addMerchantBySage';
import editMerchantSaga from './editMerchantSaga';
import detailMerchantSaga from './detailMerchantSaga';
import approveMerchantSaga from './approveMerchantSaga';

export default function* rootSaga() {
  yield all([
    fork(merchantListSaga),
    fork(commonSourceSate),
    fork(addMerchant),
    fork(editMerchantSaga),
    fork(detailMerchantSaga),
    fork(approveMerchantSaga),
  ]);
}
