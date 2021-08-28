import axios from 'axios';
import { auth } from './auth';

const endPointApiUrl = 'https://newsapi.org/v2/everything';
const qInTitle = 'food';
const language = 'en';
const apiKey = 'e2a9823c97b741b7aba38c9936779498';

export function getNews(pageSize, page) {
  return axios.get(`${endPointApiUrl}?qInTitle=${qInTitle}&language=${language}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
}

export const newsService = {
  saveNews,
  deleteNews,
  getMyNews,
};

function saveNews(news) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(news),
  };

  return fetch('/news/save', requestOptions).then(handleResponse);
}

function getMyNews() {
  const requestOptions = {
    method: 'GET',
    headers: auth(),
  };

  return fetch('/myNews', requestOptions).then(handleResponse);
}

function deleteNews(news) {
  const requestOptions = {
    method: 'DELETE',
    headers: auth(),
  };

  return fetch('/news/delete', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
