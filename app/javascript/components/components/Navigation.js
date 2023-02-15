import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom"

const Navigation = ({
  logged_in,
  current_user,
  new_user_route,
  sign_in_route,
  sign_out_route
}) => {
  return(
    <>
      <Nav>
        <NavItem>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </NavItem>
        {logged_in && (
          <NavItem>
            <a href={sign_out_route} className="nav-link">
             Sign Out
            </a>
          </NavItem>
        )}
        {logged_in && (
          <NavItem>
            <NavLink to="/myposts" className="nav-link">
              My Posts
            </NavLink>
          </NavItem>
        )}
        {logged_in && (
          <NavItem>
            <NavLink to="/restaurantindex" className="nav-link">
              Restaurants 
            </NavLink>
          </NavItem>
        )}
        {!logged_in && (
          <NavItem>
            <NavLink to="/restaurantindex" className="nav-link">
              Restaurants 
            </NavLink>
          </NavItem>
        )}
        {!logged_in && (
          <NavItem>
            <a href={sign_in_route} className="nav-link">
              Sign In
            </a>
          </NavItem>
        )}
        {!logged_in && (
          <NavItem>
            <a href={new_user_route} className="nav-link">
              Sign Up
            </a>
          </NavItem>
        )}
        {logged_in && (
          <NavItem>
            <NavLink to="/reviewnew" className="nav-link">
              Write a review
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </>
  )
}
  
  export default Navigation