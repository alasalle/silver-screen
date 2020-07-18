import axios from "axios";
import { beURL } from "../config/key";

import { LOGIN_USER } from "./types";

export default function loginUser(data) {
  const request = axios.post(`${beURL}/api/user/login`, data)
    .then(res => res.data)
    .catch(err => err)

  return {
    type: LOGIN_USER,
    payload: request
  }
}