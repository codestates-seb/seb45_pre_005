// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;

export const getQuestion = (id) => {
  const result = fetch(`/questions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    },
    credentials: 'include',
    mode: 'cors'
  })
    .then((res) => res.json())
    .then((data) => data);
  return result;
};

export const patchQuestion = (id, payload, token) => {
  const result = fetch(`${BASE_URL}/questions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload),
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const deleteQuestion = (id, token) => {
  const result = fetch(`${BASE_URL}/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const postAnswer = (payload, token) => {
  const result = fetch(`${BASE_URL}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload),
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const patchAnswer = (id, payload, token) => {
  const result = fetch(`${BASE_URL}/answers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload),
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const deleteAnswer = (id, token) => {
  const result = fetch(`${BASE_URL}/answers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const postComment = (payload, token) => {
  const result = fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload),
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const patchComment = (id, payload, token) => {
  const result = fetch(`${BASE_URL}/comments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload),
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};

export const deleteComment = (id, token) => {
  const result = fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    credentials: 'include',
    mode: 'cors'
  }).then((res) => res);

  return result;
};
