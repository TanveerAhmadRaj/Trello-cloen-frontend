import axios from "axios";

//============================== BASE URL===========================
axios.defaults.baseURL = process.env.baseURL;
axios.defaults.headers.common["Autherization"] =
  "Bearer " + localStorage.getItem("token");
