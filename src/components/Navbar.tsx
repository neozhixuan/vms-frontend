import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/authentication";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <Link to={"/"} className='nav-start'>
        VMS
      </Link>
      {auth.id !== -1 ? (
        <>
          <button
            onClick={() => {
              console.log("bye");
              navigate(`/boss/${auth.id}`);
            }}
            className='nav-items'
          >
            {auth.usern}
          </button>
          <button
            style={{ background: "transparent", border: "0px" }}
            onClick={() => {
              console.log("bye");
              dispatch(logout());
              navigate("/");
            }}
            className='nav-items'
          >
            Logout
          </button>
        </>
      ) : (
        <Link to={"/login"} className='nav-items'>
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
