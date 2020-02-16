/* eslint-disable no-tabs */
import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Description = props => {
  const { text, optional, event } = props;

  return (
    <div className="description-component">
      {text ? <span className="description-component-text">{text}</span> : null}

      {optional ? (
        <span className="description-component-text-optional">{optional}</span>
      ) : null}

      {event ? (
        <div className="top-margin">
          <span className="description-component-text-event">{event}</span>
        </div>
      ) : null}
    </div>
  );
};

Description.propTypes = {
  text: PropTypes.string,
  optional: PropTypes.string,
  event: PropTypes.string
};

Description.defaultProps = {
  optional: "",
  event: ""
};

export default Description;
