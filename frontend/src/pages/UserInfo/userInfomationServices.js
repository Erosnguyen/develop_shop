import axiosCuston from "../../config/axios-custom.js";

const baseURL = "http://127.0.0.1:8000";

const API_PATH = baseURL + "/accounts";

export const getUserInfo = () => {
  return axiosCuston.get(API_PATH + "/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    });
}

export const handleUpdateUserInfo = (payload) => {
  return axiosCuston.put(API_PATH + "/me", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },  
    });
}

export const handleUpdatePassword = (payload) => {
  return axiosCuston.put(API_PATH + "/me/password", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

export const handleUpdateEmail = (payload) => {
    return axiosCuston.post(API_PATH + "/me/email", payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });
}

export const handleVerifyOTP = (payload) => {
    return axiosCuston.patch(API_PATH + "/me/email/verify", payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });
}

