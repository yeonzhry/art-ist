import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background:var(--background-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--background-2);
  z-index: 1000;
`;

const Logo = styled.div`
  img {
    width: 40px;
    height: auto;
    padding-top: 10px;
    margin-left: 50px;
  }
`;

const NavMenu = styled.nav`
  ul {
    font-family: "timeline-210", sans-serif;
    font-weight: 400;
    display: flex;
    list-style: none;
    margin-right: 50px;
    padding-top: 20px;
    gap: 50px;
  }

  li {
    font-size: 1.5rem;
  }

  a {
    text-decoration: none;
    color: #000;
    font-weight: 400;
    transition: color 0.2s ease;

    &:hover {
      color: #666;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>
      <Link to="/main"> 
          <img src="./images/logo.svg" alt="Logo" />
      </Link>
      </Logo>
      <NavMenu>
        <ul>
          <li><Link to="/about">( About )</Link></li>
          <li><Link to="/howto">( How to? )</Link></li>
          <li><Link to="/archive">( Archive )</Link></li>
        </ul>
      </NavMenu>
    </HeaderWrapper>
  );
};

export default Header;
