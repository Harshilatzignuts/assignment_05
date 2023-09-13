import React, { useState } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import "./header.css";
import Avatar from "react-avatar";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

const Header = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  //const authUser = useSelector((state) => state.users.authUser);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>React App</h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/products">Product List</NavLink>
            </li>
            <li>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  <div className="use_detail">
                    <Avatar
                      name={currentUser.firstName + " " + currentUser.lastName}
                      maxInitials={2}
                    />
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <h3>Email : {currentUser.email}</h3>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/change-password">Change Password</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/edit-profile">Edit Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <h3
                      onClick={() => {
                        dispatch(logout());
                        Navigate("/login");
                      }}
                    >
                      Log Out
                    </h3>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
