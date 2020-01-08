import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();


async function get(url) {
  // console.log(`Get: ${baseUrl} + ${url}`);  //eslint-disable-line no-console
  try {
    const response = await fetch(baseUrl + url);
    return onSuccess(response);
  }
  catch (error) {
    return onError(error);
  }
}

export function getUsers() {
  // console.log("getUsers");  //eslint-disable-line no-console
  return get('users');
}

export function deleteUser(id) {
  // console.log("deleteUser");  //eslint-disable-line no-console
  return del(`users/${id}`);
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE',
  });

  return fetch(request).then(onSuccess, onError);
}



function onSuccess(response) {
  // console.log("success");  //eslint-disable-line no-console
  // console.log(response.json());  //eslint-disable-line no-console
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
