import axios from 'axios';



const baseURL = "https://localhost:44368/v1/"  //local
//const baseURL = "https://bbmpeaasthi.karnataka.gov.in/objection_api_test/v1" //testurl
//const baseURL = "https://bbmpeaasthi.karnataka.gov.in/BBMPCoreAPI/v1" //liveurl

const instance = axios.create({
  baseURL: `${baseURL}`,
  // Other custom configurations if needed
});
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
   
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;