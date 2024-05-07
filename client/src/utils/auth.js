
import {setTokenHeader } from "./apiCall";

//Functions logs out a user, takes in parameter to access context
export function logout(setUserData){
  localStorage.clear();
  setTokenHeader(false);
  setUserData({});
}