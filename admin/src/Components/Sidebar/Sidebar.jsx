// import React from 'react'
// import './Sidebar.css'
// import {assets} from '../../assets/assets'
// import Navbar from '../Navbar/Navbar'
// import { NavLink } from 'react-router-dom'

// const Sidebar = () =>{
//     return(
//         <div className="sidebar">
//             <div className="sidebar-options">
//                 <NavLink to='/add' className="sidebar-option">
//                     <img src={assets.add_icon} alt="" />
//                     <p className="">Add Items</p>
//                 </NavLink>
//                 <NavLink to='/list' className="sidebar-option">
//                     <img src={assets.order_icon} alt="" />
//                     <p className="">List Items</p>
//                 </NavLink>
//                 <NavLink to='/orders' className="sidebar-option">
//                     <img src={assets.order_icon} alt="" />
//                     <p className="">Orders</p>
//                 </NavLink>
//             </div>
//         </div>
//     )
// }

// export default Sidebar;


import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import Navbar from '../Navbar/Navbar'
import { NavLink } from 'react-router-dom'

const Sidebar = () =>{
    return(
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p className="">Add Items</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p className="">List Items</p>
                </NavLink>
                <NavLink to='/orders' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p className="">Orders</p>
                </NavLink>
                <NavLink to='/comments' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p className="">Comments</p>
                </NavLink>
                <NavLink to='/sentiments' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p className="">Sentiments</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;
