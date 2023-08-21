import axios from "axios";

const url = "https://url-shortener-0973.onrender.com/";

let baseUrl = axios.create({
  baseURL: url,
});

export default baseUrl;
