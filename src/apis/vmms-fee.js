import { axiosCallApi } from './index';
import CONFIG_API from './configEndPoint';

export const getAllBanks = (params) => axiosCallApi(`${CONFIG_API.VMMS_FEE_APP_BACKEND_HOST}/vmms/fee/banks`, 'get', params);
