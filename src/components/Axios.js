import axios from 'axios';



const baseURL = "https://localhost:44368/v1/"  //local
//const baseURL = "https://bbmpeaasthi.karnataka.gov.in/BBMPCoreAPI/v1" //testurl
//const baseURL = "https://localhost:44368/v1/" //produrl

const instance = axios.create({
  baseURL: `${baseURL}`,
  // Other custom configurations if needed
});

export default instance;