import * as DappUI from "@elrondnetwork/dapp-core/UI";
//import BigNumber from '@elrondnetwork/erdjs/node_modules/bignumber.js/bignumber.js';
//import { Egld } from '@elrondnetwork/erdjs/out';

/*export const stringToHex = (str: string) => {
  if (str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
  return '';
};

export const hexToString = (strVal: string) => {
  if (strVal) {
    const hex = strVal.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
  return '';
};*/

export const base64ToHex = (str: string) => {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result.toUpperCase();
};
// eslint-disable-next-line
/*export const decimalToHex = (dec: number | BigNumber, padding = 2) => {
  let hex = dec.toString(16);
  // make the length of hex string as even number
  if (hex.length % 2 === 1) {
    hex = '0' + hex;
  }
  return hex;
};*/

export const hexToPrice = (prc: string) => {
  
  let price1 = prc.substring(8);
  let price = parseInt(price1,16)
  
  return price;
};

export const shortenWalletAddress = (address: string, charsAmount = 6) => {
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};

export const splitEncoded = (encoded: string) => {
  const token = encoded.substring(0, 20);
  const price = encoded.substring(20, 30);
  return token;
};
