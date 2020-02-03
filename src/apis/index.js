import axios from 'axios';
import { baseUrl } from '../utils';

/**
 * Fetch api endpoint
 * @param {String} endpoint Endpoint api
 * @param {String} method method in list method http accept
 * @param {Object} params Param to fetch
 * @param {String} accessToken Access token to auth
 * @return {Object} Object response
 */

// eslint-disable-next-line import/prefer-default-export
export async function axiosCallApi(endpoint, method = 'get', params, headerParams = {}) {
  let fullUrl = '';
  if (method === 'get' && params && Object.keys(params).length > 0) {
    fullUrl = baseUrl(endpoint, params);
  } else {
    fullUrl = baseUrl(endpoint, {});
  }

  const axiosSetup = {
    url: fullUrl,
    method,
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${Auth.getToken()}`,
      ...headerParams,
    },
    dataType: 'json',
  };
  if (method === 'get') {
    axiosSetup.params = params;
  } else {
    axiosSetup.data = params;
  }

  try {
    const result = await axios(axiosSetup);
    if (result && result.data) {
      return result.data;
    }
  } catch (err) {
    if (err && err.response && err.response.data) {
      if (!err.response.data.isSuccess && err.response.data.errorCode === 1003 && err.response.data.detail === 'Not signed in') {
        window.location.href = '/#/logout';
      }
      return err.response.data;
    }
  }
  return true;
}
