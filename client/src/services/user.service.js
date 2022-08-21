import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://solidsoftware.ru:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const sendEmail = () => {
  return axios.get(API_URL + "sendEmail", { headers: authHeader() });
};

const downloadMobileconfig = () => {
  return axios.get(API_URL + "mobileconfig", {headers: authHeader(), responseType: 'blob'}).then((r) => {
    const path= window.URL.createObjectURL(new Blob([r.data]));
    const link = document.createElement('a');
    link.href = path;
    link.setAttribute('download', 'frvpn.mobileconfig');
    document.body.appendChild(link);
    link.click();
  }).catch((error) => console.log(error));
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  sendEmail,
  downloadMobileconfig
};
