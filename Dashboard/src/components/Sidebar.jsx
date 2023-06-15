import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {     FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList} from 'react-icons/fa';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/productlist",
            name:"ProductList",
            icon:<FaUserAlt/>
        },


    ]
    return (
        <section className="container">
           <article style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <section className="top_section">
                  
                   <article style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </article>
               </section>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <section className="icon">{item.icon}</section>
                           <section style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</section>
                       </NavLink>
                   ))
               }
           </article>
           <main>{children}</main>
        </section>
    );
};


export default Sidebar;
