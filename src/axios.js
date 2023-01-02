import axios from "axios";

//============================== BASE URL===========================
axios.defaults.baseURL = "http://localhost:5000/users/";
axios.defaults.headers.common["Autherization"] =
  "Bearer " + localStorage.getItem("token");
