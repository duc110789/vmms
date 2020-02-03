// import _ from 'lodash';
// import UserService from '../components/UserService/service';

// export const setPermissions = (content) => {
//   const permissions = {};
//   const roles = content && content.roles && content.roles.items;
//   const myPermissions = JSON.parse(content && content.permissions);

//   _.merge(permissions, myPermissions);
//   _.forEach(roles, (role) => {
//     const tmpPermissions = JSON.parse(role.permissions);
//     _.merge(permissions, tmpPermissions);
//   });
//   localStorage.setItem('permissions', JSON.stringify(permissions));
//   return true;
// };

// export const getPermissions = () => {
//   const rawPermissions = localStorage.getItem('permissions');
//   let totalPermissions;
//   if (rawPermissions) {
//     totalPermissions = JSON.parse(localStorage.getItem('permissions'));
//   }
//   return totalPermissions;
// };

// export const clearPermissions = () => {
//   localStorage.setItem('permissions', {});
// };

// export const checkPermissions = (permissions = []) => {
//   const rawPermissions = UserService.getPermissions();
//   if (!rawPermissions) {
//     return false;
//   }
//   return permissions.some(permission => rawPermissions[permission] === true);
// };
