import axios from 'axios';

import authInstance from '../logic/auth.logic';

export const http = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
  });

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] =  authInstance.getAuthToken() ? `Bearer ${authInstance.getAuthToken()}` : null;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });