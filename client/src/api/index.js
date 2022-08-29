import axios from "axios";

const url = "http://localhost:5432/signup";

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });

export const signUp = (formData) => {
  axios.post(url, formData);
};
