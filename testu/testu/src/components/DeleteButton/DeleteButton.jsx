import React, { Component } from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";
import UserAPI from "../../api/user.api";

class DeleteButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.borrarCurso=this.borrarCurso.bind(this);
    
    this.state = {
        id:this.props.id
    };
}

borrarCurso(){
  UserAPI.postBorrarCurso({
    id:this.state.id
  })
  .then(data=>{
    console.log(data)
  })
}
  
  render() {
    const { fill, simple, pullRight, round, block, ...rest } = this.props;

    const btnClasses = cx({
      "btn-fill": fill,
      "btn-simple": simple,
      "pull-right": pullRight,
      "btn-block": block,
      "btn-round": round
    });

    return <Button className={btnClasses} onClick={this.borrarCurso} {...rest} />;
  }
}

DeleteButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool
};

export default DeleteButton;
