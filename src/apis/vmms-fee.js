import { axiosCallApi } from './index';
import CONFIG_API from './configEndPoint';

export const getAllBanks = (params) => axiosCallApi(`${CONFIG_API.FEE_REACT_APP_BACKEND_HOST}/vmms/fee/banks`, 'get', params);
