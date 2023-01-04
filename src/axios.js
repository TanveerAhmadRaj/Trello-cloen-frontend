import axios from "axios";

//============================== BASE URL===========================
axios.defaults.baseURL = "domain.par.clever-cloud.com/users/";
axios.defaults.headers.common["Autherization"] =
  "Bearer " + localStorage.getItem("token");
