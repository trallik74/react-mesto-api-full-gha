export const BASE_URL = "http://localhost:3000";

function getErrorMessage(res) {
  return res.json().then((err) => {
    return err.message || err.error;
  });
}

async function getResponseData(res, errorQualifier) {
  if (res.ok) {
    return res.json();
  } else {
    try {
      return Promise.reject({
        status: `Error: ${res.status}${errorQualifier}`,
        message: await getErrorMessage(res),
      });
    } catch (err) {
      throw new Error("Непредвиденная ошибка");
    }
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => getResponseData(res, "r"));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => getResponseData(res, "a"));
};

export const checkToken = (token) => {
  console.log(localStorage);
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponseData(res, "c"));
};
