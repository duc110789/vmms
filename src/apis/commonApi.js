import { getCacheStatusByType } from './fee-manager';

export async function setItemCommon(item) {
  const itemCommon = await getCacheStatusByType({
    type: item,
  });
  if (localStorage.getItem(item) === null) {
    localStorage.setItem(item, JSON.stringify(itemCommon.list));
  }
}

export function callApiCommon() {
  setItemCommon('FEE_TYPE');
  setItemCommon('CLASSIFY_SIGNING');
  setItemCommon('FEE_STATUS');
  setItemCommon('CALCULATION_FORM');
  setItemCommon('CALCULATION_RULES');
  setItemCommon('FOLOW_CAL');
  setItemCommon('DENIED_DESC');
  setItemCommon('PAY_CHANNEL');
}
