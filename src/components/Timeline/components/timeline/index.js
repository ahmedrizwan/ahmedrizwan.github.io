/* eslint-disable no-tabs */
import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Timeline = props => {
  const { children } = props;

  return <div className="timeline">{children}</div>;
};

Timeline.propTypes = {
  children: PropTypes.node.isRequired
};

export default Timeline;
