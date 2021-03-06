import { combineReducers } from 'redux';
import merchantListReducer from './merchantListReducer';
import MerchantCommonReducer from './merchantCommonReducer';
import addMerchantReducer from './addMerchantReducer';
import merchantDetailReducer from './merchantDetailReducer';
import controlModalReducer from './controlModalReducer';
import editMerchantReducer from './editMerchantReducer';
import merchantApproveReducer from './merchantApproveReducer';

const rootReducer = combineReducers({
  merchantList: merchantListReducer,
  merchantCommon: MerchantCommonReducer,
  addMerchant: addMerchantReducer,
  merchantDetail: merchantDetailReducer,
  controlModal: controlModalReducer,
  editMerchant: editMerchantReducer,
  merchantApprove: merchantApproveReducer,
});

export default rootReducer;
