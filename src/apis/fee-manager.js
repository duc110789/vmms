import { axiosCallApi } from './index';
import CONFIG_API from './configEndPoint';
// start-fee-manager-list-screen
export const getListMasterMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/master-merchants`, 'get', params);
export const getListBanks = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/banks`, 'get', params);
// end-fee-manager-list-screen
export const getFeeTables = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/list`, 'post', params);
export const getCacheStatusByType = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/status/${params.type}`, 'get', params);
export const callApiAddOrUpdateFee = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/add`, 'post', params);
export const getFeeCode = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/feecodes`, 'get', params);
export const callApiDetailFee = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/detail`, 'post', params);
export const postFeeLock = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/lock`, 'post', params);
export const postFeeUnLock = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/unlock`, 'post', params);
export const postLockFeeCode = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/lock-fee-code`, 'post', params);
export const postUnLockFeeCode = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/unlock-fee-code`, 'post', params);
export const postDeleteFeeCode = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/del`, 'post', params);
export const editModalFee = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/update`, 'post', params);
export const checkFeeExist = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/check-fee-exist`, 'post', params);
export const getListMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/merchants`, 'post', params);
export const getFeeMerchantList = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/list`, 'post', params);
export const getFeeMerchantDetail = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/detail`, 'post', params);
export const getFeeMerchantDetailBySearch = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/detail-merchant`, 'post', params);
export const getFeeNameListByClassify = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/feecode-by-classify/${params.type}`, 'get', params);
export const getAllMcc = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/mcc`, 'get', params);
export const getAllMerchantByTypeCode = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/merchantcode-by-type/`, 'post', params);
export const getExcelFileMerchantList = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/builder-excel`, 'post', params);
export const lockFeeMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/lock`, 'post', params);
export const postValidationMcBatch = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/valid-mer-batch`, 'post', params);
export const getDetailMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/detail`, 'post', params);
export const addFeeMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/add`, 'post', params);
export const validateFeeMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/valid-merchant`, 'post', params);
export const processApproveFeeMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/process`, 'post', params);
export const updateMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/update-merchant`, 'post', params);
export const updateFeeMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee-merchant/update`, 'post', params);

export const getAllBanks = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/banks`, 'get', params);
export const getAllMccVmms = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/mcc-by-mastermc/${params}`, 'get', params);
export const getFeeCodeAndFeeNameVmms = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/feecode-by-bank/${params}`, 'get', params);
export const callApiMasterMerchant = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/master-merchants`, 'get', params);

export const callApiAllMCC = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/all-mcc`, 'get', params);

