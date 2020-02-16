/* eslint-disable no-tabs */
import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const mapMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

const handleTransformMonth = (month, type) => {
  if (type === "number") {
    return month.length === 1 ? `0${month}` : month;
  }
  const index = month - 1;
  return mapMonth[index];
};

const handleGetDate = (month, type, day, year) => {
  const newMonth = handleTransformMonth(month, type);

  if (day !== "" && month !== "") {
    if (type === "text") {
      return `${newMonth} ${day}, ${year}`;
    }
    return `${newMonth}-${day}-${year}`;
  }
  if (month !== "") {
    if (type === "text") {
      return `${newMonth}, ${year}`;
    }
    return `${newMonth}-${year}`;
  }
  return year;
};

const handlePrintDate = (mounth, day, year, monthType, current) => {
  const date = new Date();
  const startDate = handleGetDate(mounth, monthType, day, year);

  if (current) {
    return (
      <>
        <div className="item-year-component">{date.getFullYear()}</div>
        <div className="item-year-component">{startDate}</div>
      </>
    );
  }
  return <div className="item-year-component">{startDate}</div>;
};

const ContentYear = props => {
  const { startMonth, startDay, startYear, monthType, currentYear } = props;

  return (
    <div className="year-component">
      {handlePrintDate(startMonth, startDay, startYear, monthType, currentYear)}
    </div>
  );
};

ContentYear.defaultProps = {
  startMonth: "",
  monthType: "number",
  startDay: "",
  currentYear: false
};

ContentYear.propTypes = {
  startMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthType: PropTypes.oneOf(["text", "number"]),
  startDay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  currentYear: PropTypes.bool
};

export default ContentYear;
