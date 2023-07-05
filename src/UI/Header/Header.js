import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <React.Fragment>
      <h2 className={classes.header}>Gent Meals</h2>
      <img
        className={classes["main-image"]}
        alt="Various Foods"
        src="./meals.jpg"
      />
    </React.Fragment>
  );
};

export default Header;
