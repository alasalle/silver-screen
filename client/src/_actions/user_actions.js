import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { REGISTER_USER } from "./types";
import { beURL } from "../config/key";

export function registerUser(data) {
  const { getAccessTokenSilently } = useAuth0();
  const token = getAccessTokenSilently({
    audience: "https://silver-screen.herokuapp.com/",
  });
  const request = axios
    .post(`${beURL}/api/users/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
