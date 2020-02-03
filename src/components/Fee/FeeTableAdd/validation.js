
import { checkFeeExist } from '../../../apis/fee-manager';

// eslint-disable-next-line import/prefer-default-export
export const checkFeeType = (feeType) => {
  console.log('feeType', feeType);
  if (feeType === 0) {
    return true;
  }
  return false;
};

export const checkClassifySigning = (classifySigning) => {
  if (classifySigning === 0) {
    return true;
  }
  return false;
};

export const checkFeeName = (feeName) => {
  if (feeName === '') {
    return true;
  }
  return false;
};

export const validateFeeHandle = (feeMinHandle, feeMaxHandle) => {
  console.log(feeMinHandle, feeMaxHandle);
  if (
    feeMinHandle >= feeMaxHandle
    || (feeMinHandle < 0 || feeMaxHandle <= 0
    || feeMinHandle === '' || feeMaxHandle === ''
    || Number.isNaN(feeMinHandle)
    || Number.isNaN(feeMaxHandle))
  ) {
    return true;
  }
  return false;
};

export const checkFeeNameExist = async (name) => {
  const isExist = await checkFeeExist({
    feeName: name,
  });
  return isExist;
};

export const checkUpdateClassifySigningOrNot = (prevClassify, currentClassify, status) => {
  if ((
    (prevClassify === 1 && currentClassify === 2)
    || (prevClassify === 2 && currentClassify === 3)
    || (prevClassify === currentClassify))
    || status === 2) {
    return true;
  }
  return false;
};

// eslint-disable-next-line consistent-return
export const checkFeeTax = (value) => {
  if (!value || (value >= 0 && value <= 100)) {
    return true;
  }
  return false;
};

export const convertClassifyByNumber = (array, numberValue) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].value === numberValue) {
      return array[i].label;
    }
  }
  return 'Chọn';
};

// export const checkValidateOrderClassify = (convertedArrayClassify, availableClassify) => {
//   console.log(convertedArrayClassify, availableClassify);
//   if(availableClassify && availableClassify.length === 3) {
//     console.log(3, convertedArrayClassify);
//    return convertedArrayClassify.splice(0,2);
//   }
//   else if ( availableClassify && availableClassify.length === 2) {
//     console.log(2, convertedArrayClassify);
//    return convertedArrayClassify.splice(0,1);
//   }
//   else if ( availableClassify && availableClassify.length === 1) {
//     console.log(1, convertedArrayClassify);
//    return convertedArrayClassify.splice(2,1);
//   }
//   else if ( availableClassify && availableClassify.length === 0) {
//     console.log(convertedArrayClassify.splice(0,1));
//
//   }
//
// }
