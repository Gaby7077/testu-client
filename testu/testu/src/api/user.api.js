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

    //Route to get all the documents uploaded
    getClass:function(empresa){
        return axios.get(process.env.REACT_APP_API_URL + "/api/documentos/" + empresa)
    },
      //Route for updating profile
      putUpdate: function (user) {
        return axios.put(process.env.REACT_APP_API_URL + "/api/update",user)
    },
    //Route to get all the course by empresa
    getCurso:function(empresa){
        return axios.get(process.env.REACT_APP_API_URL + "/api/curso/" + empresa)
    },
    //Route to create a course
    postCurso:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/api/curso/",data)
    },
    //Route to delete a course
    postBorrarCurso:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/curso/delete",data)
    },
    //Route to delete a document
    postBorrarDocumento:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/documento/delete",data)
    }
  };