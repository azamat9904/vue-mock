import axios from "./index";

const SIGN_UP = "user/signup";
const SIGN_IN = "user/signin";

export const signUp = (payload) => {
  return axios.post(SIGN_UP, payload);
};

export const signIn = (payload) => {
  return axios.post(SIGN_IN, payload);
};
