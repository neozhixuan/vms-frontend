import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={"/"} className="nav-start">
        VMS
      </Link>
      <Link to={"/login"} className="nav-items">
        Login
      </Link>
    </div>
  );
};

export default Navbar;
