import React, { useEffect } from "react";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('main-page');
    document.documentElement.classList.add('main-html');

    const onboarding = document.querySelector(".onboarding-line");
    const originalImg = document.getElementById("original-img");
    const newImgContainer = document.getElementById("new-img-container");
    const extraImg1 = document.getElementById("extra-img-1");
    const extraImg2 = document.getElementById("extra-img-2");
    const sideImgs = document.querySelectorAll(".side-img");
    const container = document.getElementById("container");
    const backgroundOverlay = document.getElementById("background-overlay");

    setTimeout(() => onboarding && (onboarding.style.gap = "80px"), 300);
    setTimeout(() => originalImg && (originalImg.style.opacity = "1"), 1200);
    setTimeout(() => sideImgs.forEach(img => img && (img.style.opacity = "1")), 1600);
    setTimeout(() => backgroundOverlay && backgroundOverlay.classList.add("shrink"), 3000);
    setTimeout(() => container && container.classList.add("move-down"), 3200);
    setTimeout(() => originalImg && (originalImg.style.opacity = "0"), 3500);
    setTimeout(() => {
      newImgContainer && newImgContainer.classList.add("show");
      extraImg1 && extraImg1.classList.add("show");
      extraImg2 && extraImg2.classList.add("show");
    }, 5000);

    // 5초 후 메인 화면으로 이동
    const toMain = setTimeout(() => {
      navigate('/main');
    }, 5000);

    return () => {
      clearTimeout(toMain);
      document.body.classList.remove('main-page');
      document.documentElement.classList.remove('main-html');
    };
  }, [navigate]);

  return (
    <>
      <div className="background-overlay" id="background-overlay" style={{zIndex:1001}}></div>

      <div className="container" id="container" style={{zIndex:1002}}>
        <div className="onboarding-line">
          <img src="./images/1.svg" className="side-img left" alt="left text" />
          <img src="./images/2.svg" className="bracket-img" alt="left bracket" />

          <div className="center-img-container">
            <img
              src="./images/g-clef.png"
              className="center-img original"
              id="original-img"
              alt="original"
            />
          </div>

          <img src="./images/3.svg" className="bracket-img" alt="right bracket" />
          <img src="./images/4.svg" className="side-img right" alt="right text" />
        </div>

        <div className="new-img-container" id="new-img-container">
          <img
            src="./images/eyes.svg"
            className="center-img new"
            id="new-img"
            alt="new"
          />
        </div>

        <img
          src="./images/a.svg"
          className="extra-img img-one"
          id="extra-img-1"
          alt="extra1"
        />

        <img
          src="./images/5.svg"
          className="extra-img img-two"
          id="extra-img-2"
          alt="extra2"
        />
      </div>
    </>
  );
};

export default Onboard;


