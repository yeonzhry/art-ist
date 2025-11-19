import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: var(--background-1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--background-2);
  z-index: 1000;

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

    @media (min-width: 1920px) and (max-width: 2560px) {
      width: clamp(38px, 2.2vw, 48px);
    }

    @media (min-width: 2560px) {
      width: clamp(45px, 2.5vw, 55px);
    }

    @media (max-width: 768px) {
      width: 35px;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>
        <Link to="/">
          <img src="./images/logo.svg" alt="Logo" />
        </Link>
      </Logo>
    </HeaderWrapper>
  );
};

export default Header;

