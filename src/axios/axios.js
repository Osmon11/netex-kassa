import axios from 'axios'


const baseURL = "https://api.netex-kassa.com/";
const baseURL2 = 'https://crypto.media-center.kg'
// const headers = {};

// if(localStorage.token) {
//   headers.Authorization = `Bearer ${localStorage.token}`
// }
const headers = { "Content-Type": "application/x-www-form-urlencoded" };
export const AppAxios = axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

export const AppAxios2 = axios.create({
  baseURL: 'https://api.netex-kassa.com'
});

