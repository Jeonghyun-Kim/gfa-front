export const checkSameObject = (obj1: object, obj2: object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const sendCounter = () => {
  fetch(`api/counter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ href: window.location.href }),
  });
};

export const checkLength = (input: string, maxLength: number) => {
  let totalLength = 0;
  for (let i = 0; i < input.length; i++) {
    const oneChar = input.charAt(i);
    if (escape(oneChar).length > 4) {
      totalLength += 2;
    } else {
      totalLength++;
    }
    if (totalLength > maxLength) return false;
  }
  return true;
};

export default {
  checkSameObject,
  sendCounter,
  checkLength,
};
