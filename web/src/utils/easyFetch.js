import { API_URI } from './constants';

const easyFetch = async (path, data = {}, method = 'POST') => {
  try {
    const response = await fetch(API_URI + path, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method,
      body: method !== 'GET' ? JSON.stringify(data) : null,
    });
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export default easyFetch;
