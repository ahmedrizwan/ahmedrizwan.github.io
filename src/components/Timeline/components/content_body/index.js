/* eslint-disable no-tabs */
import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const ContentBody = props => {
  const { title, children } = props;

  return (
    <div className="body-component">
      <p className="body-component-title">{title}</p>
      {children}
    </div>
  );
};

ContentBody.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default ContentBody;
