// import React from 'react'
// import './Navbar.css'
// import {assets} from '../../assets/assets'

// const Navbar = () =>{
//     return(
//         <div className="navbar">
//             <img src={assets.logo} alt="" className="logo" />
//             <img src={assets.profile_image} alt="" className="profile" />

//         </div>
//     )
// }

// export default Navbar;

import React,{useContext} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import {toast} from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const {token,setToken,setShowLogin}=useContext(StoreContext);


    const logout=()=>{
        localStorage.removeItem("token");
        setToken("");
        setShowLogin(true);
        toast.success("Logged-out Successfully");
        navigate('/');

    }
    return (
        <div className="navbar">
            <img src={assets.logo2} alt="" className="logo" />
            <div className="navbar-profile">
                <img src={assets.profile_image} alt="" className="profile" />
                <ul className="navbar-profile-dropdown">
                    <li onClick={logout}>
                        <img src={assets.logout_icon} alt="" />
                        <p>Signout</p></li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar;
