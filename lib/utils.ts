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

export default {
  checkSameObject,
  sendCounter,
};
