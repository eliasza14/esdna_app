import React from "react";
import {NavLink} from "react-router-dom";
import logo from "../logo2.svg";
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {LogOut, LoginUser,reset} from "../features/authSlice"
import '../navbar-custom.css';
const Navbar =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const logout = ()=>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    return(
        <div>
            <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <NavLink className="navbar-item" to="dashboard">
                    <img 
                        src={logo}
                        width="152" 
                        height="80"
                        alt="logo"
                    />
                </NavLink>
            
                <a href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
            
              <div id="navbarBasicExample" className="navbar-menu">
                
            
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      
                      <button onClick={logout} className="button is-light">
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
        </div>
    )
}
export default Navbar