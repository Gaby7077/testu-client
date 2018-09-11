import React, { Component } from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";

class MaterialButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.agregarMaterial = this.agregarMaterial.bind(this);
    
    this.state = {
        cursoid:this.props.cursoid
    };
}

agregarMaterial(){
  console.log(this.state.cursoid)
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

    return <Button className={btnClasses}  {...rest} />;
  }
}

MaterialButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool
};

export default MaterialButton;
