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

    getUser_dataOne:function(id){
        return axios.get(process.env.REACT_APP_API_URL + "/api/UserOne/"+id);

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
    deleteBorrarCurso:function(id){
        return axios.delete(process.env.REACT_APP_API_URL + "/borrar/curso/" + id)
    },
    //Route to delete a document
    postBorrarDocumento:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/documento/delete",data)
    },
    //Route to know if material has been uploaded
    getDocumentoCurso:function(id){
        return axios.get(process.env.REACT_APP_API_URL + "/api/documentocurso/"+id)
    },
    //Route to add a question
    postAgregarPregunta:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/api/pregunta",data)
    },
    //Route to get the questions
    getPreguntasCurso:function(CursoId){
        return axios.get(process.env.REACT_APP_API_URL + "/api/pregunta/"+ CursoId)
    },
    //Route to add an answer
    postAgregarRespuesta:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/api/respuestas",data)
    },
    //Route to update examen
    putExamen:function(data){
        return axios.put(process.env.REACT_APP_API_URL + "/api/examen",data)
    },
    //Find the value of the answer
    getRespuesta:function(id){
        return axios.get(process.env.REACT_APP_API_URL + "/api/respuesta/"+id)
    },
    //Route to post the answer to the questions
    postRespuesta:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/api/contestado",data)
    },
    //Route to get users of empresa
    getUsuarios:function(empresa){
        return axios.get(process.env.REACT_APP_API_URL + "/api/numusuarios/"+empresa)
    },
    //Route to get all Usuario y Cursos
    getUsuarioCurso:function(curso){
        return axios.get(process.env.REACT_APP_API_URL + "/api/contestados/"+curso)
    },
    getUsuarioCursoBuenas:function(usuario,curso){
        return axios.get(process.env.REACT_APP_API_URL + "/api/contestadostrue/"+usuario+"/"+curso)
    },
    //Route to create a user to an exam
    postExamen:function(data){
        return axios.post(process.env.REACT_APP_API_URL + "/api/examen", data)
    },
    //Sacar el total de preguntas
    getNumPreguntas:function(curso){
        return axios.get(process.env.REACT_APP_API_URL + "/api/numpregunta/"+curso)
    },
    //Subir calificacion
    putCalificacion:function(data){
        return axios.put(process.env.REACT_APP_API_URL + "/api/calificacion",data)
    },
    //Revisar si ya tomo el examane
    getExamen:function(user,curso){
        return axios.get(process.env.REACT_APP_API_URL + "/api/tomados/"+user+"/"+curso)
    },
    //Obtener califacion
    getCalificaciones:function(data){
        return axios.get(process.env.REACT_APP_API_URL + "/api/examen",data)
    }
  };