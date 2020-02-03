// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import querystring from 'querystring';
import moment from 'moment';
import { checkPermissions } from './auth';

/**
 * Show a confirm alert
 *
 * @param {String} title title for alert box
 * @param {Message} message message for alert box
 * @param {Func} onClickYes handle on click Yes
 *
 * @return void
 */
// export function showConfirmAlert(title, message, onClickYes) {
//   confirmAlert({
//     title,
//     message,
//     buttons: [
//       {
//         label: 'Yes',
//         onClick: onClickYes,
//       },
//       {
//         label: 'No',
//       },
//     ],
//   });
// }

export function baseUrl(realBaseUrl = '', params = false) {
  if (params) {
    return `${realBaseUrl}?${querystring.stringify(params)}`;
  }
  return (`${realBaseUrl}`);
}

/**
 * Convert time from UTC to current timezone
 * @param {String} time Time in UTC
 * @return {String} Time in current timezone
 */
export const convertTimeFromUTC = (time) => {
  const utc = moment.utc(time);
  const local = utc.local();
  return local;
};

/**
 * Config for global variables
 */
export const config = {
  formatDate: 'YYYY-MM-DD',
  formatDateHourMin: 'YYYY-MM-DD HH:mm',
  formatDatetimeSecond: 'MM-DD-YYYY HH:mm:ss',
};

export const handleNavigation = (navigation) => {
  const nav = navigation;

  for (let i = (nav.items.length - 1); i >= 0; i -= 1) {
    if (nav.items[i] && nav.items[i].children) {
      for (let j = (nav.items[i].children.length - 1); j >= 0; j -= 1) {
        if (nav.items[i].children[j] && nav.items[i].children[j].permissions) {
          if (!checkPermissions(nav.items[i].children[j].permissions)) {
            nav.items[i].children.splice(j, 1);
          }
        }
      }
    }
    if (nav.items[i] && nav.items[i].children.length === 0) {
      nav.items.splice(i, 1);
    }
  }
  return nav;
};

export const filterOption = (option, inputValue) => {
  const { label } = option;
  return label && label.replace(/\s\s+/g, ' ').toLowerCase().includes(inputValue.replace(/\s\s+/g, ' ').toLowerCase());
};
