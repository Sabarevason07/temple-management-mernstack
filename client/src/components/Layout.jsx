import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../Assets/yoga-logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Badge } from "antd";
import Map from "../components/Map";
import DonationForm from "../Pages/DonationForm"; // Ensure the correct path
import AboutPage from "../Pages/AboutPage"; 
import main from "../main/Main";
import DharshanPage from "../Pages/DharshanPage";


const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  };

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-2-line" },
    { name: "Poojas", path: "/poojas", icon: "ri-calendar-schedule-line" },
    { name: "pooja schedules", path: "/apply-pandith", icon: "ri-hospital-line" },
    { name: "Profile", path: "/profile", icon: "ri-profile-line" },
    {
      name: "About",
      path: "/about",
      icon: "ri-information-line", // Icon for the About link
    },
    {
      name: "Map",
      path: "/map",
      icon: "ri-information-line", // Icon for the Map link
    },
    {
      name: "Donation",
      path: "/donation",
      icon: "ri-hand-heart-line", // Icon for the Donation link
    },
    {
      name: "Main",
      path: "/main",
      icon: "ri-hand-heart-line", // Icon for the Donation link
    },
    {
      name: "DharshanPage",
      path: "/dharshan",
      icon: "ri-hand-heart-line", // Icon for the Donation link
    },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-2-line" },
    { name: "Users", path: "/admin/users", icon: "ri-user-line" },
    { name: "pooja schedules", path: "/admin/pandiths", icon: "ri-user-star-line" },
    { name: "Profile", path: "/profile", icon: "ri-profile-line" },
  ];

  const pandithMenu = [
    { name: "Home", path: "/", icon: "ri-home-2-line" },
    { name: "Poojas", path: "/pandith/poojas", icon: "ri-calendar-schedule-line" },
    { name: "Profile", path: `/pandith/profile/${user?._id}`, icon: "ri-profile-line" },
    {
      name: "About",
      path: "/about",
      icon: "ri-information-line", // Icon for the About link
    },
    {
      name: "Map",
      path: "/map",
      icon: "ri-information-line", // Icon for the Map link
    },
    {
      name: "Donation",
      path: "/donation",
      icon: "ri-hand-heart-line", // Icon for the Donation link
    },
    {
      name: "Main",
      path: "/main",
      icon: "ri-hand-heart-line", // Icon for the Donation link
    },
    {
      name: "DharshanPage",
      path: "/dharshan",
      icon: "ri-hand-heart-line", // Icon for the Donation link
    },
  ];

  const menuToBeRendered = user && user.isAdmin ? adminMenu : user?.isPandith ? pandithMenu : userMenu;

  return (
    <>
      <div className="navbar">
        <img className="navbar-logo" src="https://cdn-icons-png.flaticon.com/128/3336/3336130.png" alt="Yoga Logo" />
        <header>
          <div className="Center">
            <div className="site-logo">
              <h1>
                <Link to="/">Temple <span>Management </span> System</Link>
              </h1>
            </div>
          </div>
        </header>
        <div className="navbar-menu">
          {menuToBeRendered.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (

              
              <div
                key={menu.name}
                className={`navbar-item ${isActive ? "active-navbar-item" : ""}`}
              >
                <Link to={menu.path}>
                  <i className={menu.icon}></i>
                  {menu.name}
                </Link>

                
              </div>
            );
          })}
          
          <div className="navbar-item" onClick={handleLogout}>
            <Link to="/logout">
              <i className="ri-logout-box-line"></i>
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="menu-bar">
        <Badge
          count={user?.unSeenNotifications.length}
          onClick={() => navigate("/notifications")}
        >
          <i className="ri-notification-2-line notification-icon"></i>
        </Badge>
        <Link className="profile-link" to="/profile">
          {user?.name}
        </Link>
      </div>

      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;
