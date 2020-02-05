/* eslint-disable default-case */
import React from 'react';
import { Badge } from 'reactstrap';


export const getTypeNameFee = (arrFeeType, itemCode) => {
  let nameType = 'Không có dữ liệu hợp lệ.';
  if (arrFeeType && arrFeeType.length > 0) {
    arrFeeType.map((item) => {
      if (parseInt(item.code, 10) === parseInt(itemCode, 10) || item.code === itemCode) {
        nameType = item.description;
      }
      return nameType;
    });
  }
  return nameType;
};

export const getbankCode = (arrbankCode, itemCode) => {
  let bankType = 'Không có dữ liệu hợp lệ.';
  if (arrbankCode && arrbankCode.length > 0) {
    // eslint-disable-next-line no-unused-expressions
    arrbankCode.map((item) => {
      if (parseInt(item.bankCode, 10) === parseInt(itemCode, 10) || item.bankCode === itemCode) {
        bankType = item.bankName;
      }
      return bankType;
    });
  }
  return bankType;
};

const renderUIStatus = (code, name) => {
  switch (code) {
    case 1:
      return (<Badge color="success">{name}</Badge>);
    case 2:
      return (<Badge color="info">{name}</Badge>);
    case 3:
      return (<Badge color="primary">{name}</Badge>);
    case 4:
      return (<Badge color="danger">{name}</Badge>);
    case -1:
      return (<Badge color="danger">{name}</Badge>);
    case 5:
      return (<Badge color="warning">{name}</Badge>);
    case 6:
      return (<Badge color="pink">{name}</Badge>);
  }
  return <span>Khong tim duoc</span>;
};


export const convertClassifySigning = (classifySigning) => {
  switch (classifySigning) {
    case 1:
      return 'Hợp đồng';
    case 2:
      return 'Phụ lục';
    case 3:
      return 'Công văn';
  }
  return null;
};


export const getStatusUI = (array, itemCode) => {
  let nameType = 'Không có dữ liệu hợp lệ.';
  if (array && array.length > 0) {
    array.map((item) => {
      if (parseInt(item.code, 10) === itemCode || item.code === itemCode) {
        nameType = item.description;
      }
      return item;
    });
    return renderUIStatus(itemCode, nameType);
  }
  return nameType;
};

export const convertDateTimeFormat = (stringDateTime) => `${stringDateTime.getDate()}/${stringDateTime.getMonth() + 1}/${stringDateTime.getFullYear()}`;


export const convertValueToString = (arrayValue, value) => {
  let nameChannel = 'Không có giá trị hợp lệ';
  if (arrayValue && arrayValue.length >= 0) {
    arrayValue.map((item) => {
      if (parseInt(item.value, 10) === parseInt(value, 10)) {
        nameChannel = item.label;
      }
      return nameChannel;
    });
  }
  return nameChannel;
};

export const convertArrayValueToString = (arrayStringValue, value) => {
  const arrayValue = value.split(',');
  const nameTypeSource = [];
  if (arrayStringValue && arrayStringValue.length >= 0) {
    for (let i = 0; i < arrayValue.length; i += 1) {
      for (let j = 0; j < arrayStringValue.length; j += 1) {
        if (parseInt(arrayValue[i], 10) === parseInt(arrayStringValue[j].value, 10)) {
          nameTypeSource.push(arrayStringValue[j].label);
        }
      }
    }
    return nameTypeSource.join();
  }
  return 'Hình thức thanh toán không hợp lệ';
};

export const convertValueToArray = (arrayStringValue, value) => {
  if (value !== '' && value !== null && typeof value !== 'undefined') {
    const arrayValue = value.split(',');
    const usedArray = [];
    if (arrayStringValue && arrayStringValue.length >= 0) {
      for (let i = 0; i < arrayValue.length; i += 1) {
        for (let j = 0; j < arrayStringValue.length; j += 1) {
          if (parseInt(arrayValue[i], 10) === parseInt(arrayStringValue[j].value, 10)) {
            usedArray.push({ value: arrayStringValue[j].value, label: arrayStringValue[j].label });
          }
        }
      }
    }
    return usedArray;
  }
  return '';
};


// eslint-disable-next-line max-len
export const checkDisableFieldByStatus = (codeStatus, additionalSigning) => (codeStatus === 2) || (codeStatus === 6) || (codeStatus === 4) || (codeStatus === 1 && additionalSigning === 0);

export const validateTime = (signDate, applyDate, expirationDate, status) => {
  if (new Date(applyDate) < new Date(signDate)) {
    return 2;
  } if (new Date(expirationDate) < new Date(applyDate)) {
    return 3;
  }
  if ((new Date(expirationDate) < new Date()) && status === 4) {
    return 4;
  }
  return 0;
};


export const convertArrayToString = (convertArray) => {
  const data = convertArray.map((element) => element.value);
  return data.toString();
};

export const convertPropertyInArray = (convertArray) => {
  // eslint-disable-next-line max-len
  const data = convertArray.map((element) => ({ merchantCode: element.value, merchantName: element.name }));
  return data;
};
