import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/MaterialButton/MaterialButton.jsx";
import UserAPI from "../../api/user.api";
import "./Examenes.css"


class Examenes extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.obtenerPreguntas = this.obtenerPreguntas.bind(this);
    this.responderPregunta = this.responderPregunta.bind(this);


    this.state = {
      showPregunta: false,
      showRespuesta: false,
      empresa: localStorage.getItem("empresa"),
      cursos: [],
      preguntas: [],
      cursoid: "",
      value: "",
      btnVer: true,
      numPregunta: 0,
      respuestaid: "",
      GridExamen: "hideDiv",
      preguntaid: "",
      UserId:localStorage.getItem("user")
    };
  }



  componentDidMount() {
    this.obtenerCursos();
  }

  //*Funcion para obtener los datos nuevos y ponerlos en el render
  obtenerCursos() {
    UserAPI.getCurso(this.state.empresa)

      .then(response => {
        console.log(response)
        this.setState({
          cursos: response.data
        })
      })
  }

  //*Obtiene el id del curso
  handleChange(event) {
    this.setState({
      value: event.target.value,
      btnVer: false,

    })
  }

  //*Para ver las preguntas

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      numPregunta: 0
    })
    this.obtenerPreguntas();
  }

  //*Funcion para obtener las preguntas y ponerlas en desorden
  obtenerPreguntas() {
    UserAPI.getPreguntasCurso(this.state.value)
      .then(response => {
        console.log(response)
        let arr = response.data;
        let i;
        let j;
        let temp = [];
        for (i = arr.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        this.setState({
          preguntas: arr,
        })
      })
  }


  MostrarPregunta() {
    let pregunta;
    if (this.state.preguntas.length > 0) {
      if (this.state.numPregunta === this.state.preguntas.length) {
        pregunta = "Gracias por Contestar el Examen"
      }
      else {
        //console.log(this.state.numPregunta)
        //console.log(this.state.preguntas.length)
        pregunta = this.state.preguntas[this.state.numPregunta].pregunta
        //console.log(this.state.preguntas[this.state.numPregunta].id)

      }


    }

    return pregunta

  }

  handleChangeOpcion(event) {
    this.setState({
      respuestaid: event.target.value
    });
  };

  MostrarRespuesta() {
    let cuestionario = [];
    let respuestas
    if (this.state.preguntas.length > 0) {
      if (this.state.numPregunta === this.state.preguntas.length) {
        cuestionario = []
      }
      else {
        respuestas = this.state.preguntas[this.state.numPregunta].Respuesta
        for (let i = 0; i < respuestas.length; i++) {
          //console.log(respuestas[i].Respuesta)
          cuestionario.push(
            <Button key={respuestas[i].id} idrespuesta={respuestas[i].id} bsStyle="primary" fill onClick={(e)=>{this.responderPregunta(e)}}>{respuestas[i].Respuesta}</Button>
          )
          cuestionario.push(' ')
        }
      }
    }
    return cuestionario;
  }

  responderPregunta(e) {
    this.setState({
      numPregunta: this.state.numPregunta + 1
    })
    let respuestaid=e.target.getAttribute("idrespuesta");
    console.log("El id de la respuesta es " + respuestaid)
    UserAPI.getRespuesta(respuestaid)
    .then(response=>{
      console.log(response.data.Correcta)
      UserAPI.postRespuesta({
        respuesta:response.data.Correcta,
        RespuestumId:respuestaid,
        UserId:this.state.UserId,
        CursoId:this.state.value
      }).then(response=>{
        console.log(response)
      })
    })
  }



  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Examenes"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Grid>
                    <FormGroup controlId="formControlsSelect">
                      <Row>
                        <Col md={6}>
                          <ControlLabel>Selecciona un Curso</ControlLabel>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8}>
                          <FormControl value={this.state.value} onChange={this.handleChange} componentClass="select" placeholder="select">
                            <option>Selecciona un Curso</option>
                            {this.state.cursos.map((respuesta, index) => {
                              return (
                                <option key={respuesta.id} value={respuesta.id}>{respuesta.curso}</option>
                              )
                            })}
                          </FormControl>
                          <br />
                          <Button bsStyle="info" disabled={this.state.btnVer} pullRight fill type="submit" onClick={this.handleSubmit}>Empezar Examen</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Grid>



                }
              />

            </Col>
          </Row>
        </Grid>


        {/*Espacio Para ver las preguntas*/}
        <div className={this.state.GridExamen}>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Examen"
                  ctTableFullWidth
                  ctTableResponsive

                  content={
                    <div>
                      <h2>{this.MostrarPregunta()}</h2>
                      {this.MostrarRespuesta()}


                    </div>

                  } />
              </Col>
            </Row>
          </Grid>
        </div>








      </div>
    )

  }
}

export default Examenes;
