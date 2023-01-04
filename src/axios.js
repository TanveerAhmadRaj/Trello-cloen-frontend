import axios from "axios";

//============================== BASE URL===========================
axios.defaults.baseURL =
  "app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/";
axios.defaults.headers.common["Autherization"] =
  "Bearer " + localStorage.getItem("token");
