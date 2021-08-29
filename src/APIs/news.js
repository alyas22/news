import axios from 'axios';
import { auth } from './auth';

const endPointApiUrl = 'https://newsapi.org/v2/everything';
const qInTitle = 'food';
const language = 'en';
const apiKey = 'e2a9823c97b741b7aba38c9936779498';

export function getNews(pageSize, page, searchKeyword) {
  return axios.get(`${endPointApiUrl}?qInTitle=${searchKeyword}&language=${language}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
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

  return fetch('/news/save', requestOptions);
}

function getMyNews() {
  const requestOptions = {
    method: 'GET',
    headers: auth(),
  };

  return fetch('/myNews', requestOptions);
}

function deleteNews(news) {
  const requestOptions = {
    method: 'DELETE',
    headers: auth(),
    body: JSON.stringify(news),
  };

  return fetch('/news/delete', requestOptions);
}
