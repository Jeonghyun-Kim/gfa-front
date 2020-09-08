import { deviceDetect } from 'react-device-detect';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const checkSameObject = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const sendCounter = () => {
  fetch(`api/counter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      href: window.location.href,
      deviceInfo: JSON.stringify(deviceDetect()),
    }),
  });
};

export const checkLength = (input: string, maxLength: number) => {
  let totalLength = 0;
  for (let i = 0; i < input.length; i += 1) {
    const oneChar = input.charAt(i);
    if (escape(oneChar).length > 4) {
      totalLength += 2;
    } else {
      totalLength += 1;
    }
    if (totalLength > maxLength) return false;
  }
  return true;
};

export const splitLongText = (input: string, splitHeight: number) => {
  let totalLine = 0;
  let totalLength = 0;
  let splitIndex = input.length - 1;
  for (let i = 0; i < input.length; i += 1) {
    const oneChar = input.charAt(i);
    if (oneChar === '\n') {
      totalLine += 1;
      totalLength = 0;
    } else {
      totalLength += 1;
      if (totalLength === 20) {
        totalLine += 1;
        totalLength = 0;
      }
    }
    if (totalLine === splitHeight) splitIndex = i;
  }

  return {
    shortStr: input.substring(0, splitIndex + 1),
    extraStr: input.substring(splitIndex + 1, input.length),
  };
};

export default {
  checkSameObject,
  sendCounter,
  checkLength,
  splitLongText,
};
