import axios from "axios";

//Sets bearer token if called token
export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];

    }
}
