import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Content = props => {
  const { children } = props;

  return <div className="container-component">{children}</div>;
};

Content.propTypes = {
  children: PropTypes.node.isRequired
};

export default Content;
