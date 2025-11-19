import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: var(--background-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--background-2);
  z-index: 1000;

  @media (max-width: 768px) {
    height: 70px; 
  }

  @media (min-width: 1920px) and (max-width: 2560px) {
    height: clamp(75px, 4.5vh, 90px);
  }

  @media (min-width: 2560px) {
    height: clamp(80px, 5vh, 100px);
  }
`;

const Logo = styled.div`
  img {
    width: 40px;
    height: auto;
    padding-top: 10px;
    margin-left: 50px;

    @media (max-width: 768px) {
      width: 30px; 
      margin-left: 20px;
      padding-top: 5px;
    }

    @media (min-width: 1920px) and (max-width: 2560px) {
      width: clamp(38px, 2.2vw, 48px);
      margin-left: clamp(45px, 3vw, 60px);
    }

    @media (min-width: 2560px) {
      width: clamp(45px, 2.5vw, 55px);
      margin-left: clamp(50px, 3.5vw, 80px);
    }
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

    @media (min-width: 1920px) and (max-width: 2560px) {
      margin-right: clamp(45px, 3vw, 60px);
      gap: clamp(45px, 3vw, 60px);
      padding-top: clamp(18px, 1.2vh, 25px);
    }

    @media (min-width: 2560px) {
      margin-right: clamp(50px, 3.5vw, 70px);
      gap: clamp(50px, 3.5vw, 70px);
      padding-top: clamp(20px, 1.3vh, 30px);
    }

    @media (max-width: 768px) {
      display: none; 
    }
  }

  li {
    font-size: 1.5rem;

    @media (min-width: 1920px) and (max-width: 2560px) {
      font-size: clamp(1.3rem, 1.5vw, 1.8rem);
    }

    @media (min-width: 2560px) {
      font-size: clamp(1.5rem, 1.7vw, 2rem);
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  a {
    text-decoration: none;
    color: var(--background-2);
    font-weight: 400;
    transition: color 0.2s ease;

    &:hover {
      color: var(--neutral-06);
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  margin-right: 20px;
  margin-top: 5px;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: var(--background-2);
    margin: 5px 0;
    border-radius: 5px;
    transition: 0.4s;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    position: absolute;
    top: 80px;
    right: 12px; 
    flex-direction: column;
    gap: 10px;
    z-index: 999;

    a {
      font-family: "timeline-210", sans-serif;
      font-size: 0.9rem;
      font-weight: 400;
      padding: 10px 16px;
      color: var(--background-2);
      text-decoration: none;
      text-align: center;
      background: var(--background-1);
      border: 1px solid var(--background-2);
      opacity: 0;
      transform: translateX(30px);
      animation: ${({ open }) => open ? slideIn : 'none'} 0.4s forwards;
      
      &:nth-child(1) { animation-delay: 0.1s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.3s; }

      &:hover {
        color: #666;
        background: rgba(0,0,0,0.02);
      }
    }
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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

      <Hamburger onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </Hamburger>

      <MobileMenu open={menuOpen}>
        <Link to="/about" onClick={() => setMenuOpen(false)}>( About )</Link>
        <Link to="/howto" onClick={() => setMenuOpen(false)}>( How to? )</Link>
        <Link to="/archive" onClick={() => setMenuOpen(false)}>( Archive )</Link>
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;
