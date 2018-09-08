import axios from "axios";

export default {

    
    postLogin:function(login){
        return axios.post(process.env.REACT_APP_API_URL + "/api/login",login);

    },

    postSignup:function(login){
        return axios.post(process.env.REACT_APP_API_URL + "/api/signup",login)
    },

    getLogout:function(){
        return axios.get(process.env.REACT_APP_API_URL + "/logout")
    },

    getUser_data:function(token){
        return axios.get(process.env.REACT_APP_API_URL + "/api/user_data",{headers:{"x-token":"Bearer " + token}})
    },

    postUpload:function(clase){
        return axios.post(process.env.REACT_APP_API_URL + "/upload",clase)
    },
    getClass:function(){
        return axios.get(process.env.REACT_APP_API_URL + "/api/documentos")
    }
    
  };