import React, { useEffect } from "react";
import styled from "styled-components";
import Model from "../components/Model";

const BackgroundOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15vh; /* shrink 상태 */
  background-color: var(--background-3);
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  transform: translateY(36vh); /* move-down 상태 */
  transition: none;
`;

const OnboardingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 80px; /* 최종 상태 간격 */
`;

const SideImg = styled.img`
  width: 420px;
  opacity: 1; /* 최종 상태에서는 보임 */
`;

const BracketImg = styled.img`
  width: 50px;
  z-index: 20;
`;

const CenterImg = styled.img`
  height: auto;
  object-fit: cover;
  opacity: 1;
  margin-top: -5rem;
`;

const CenterImgContainer = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  overflow: visible;
`;

const NewImgContainer = styled.div`
  position: absolute;
  top: 12%;
  left: 62%;
  transform: translateX(-50%);
  opacity: 1; /* show 상태 */
  width: 200px;
  height: 200px;
  z-index: 50;
`;

const CenterImgNew = styled.img`
  z-index: 100;
  width: 150px;
  height: auto;
  display: block;
  opacity: 1;
`;

const ExtraImg = styled.img`
  position: absolute;
  opacity: 1; /* show 상태 */
  transition: none;
`;

const ImgOne = styled(ExtraImg)`
  top: 9%;
  left: 29.7%;
  width: 6%;
  z-index: 20;
`;

const ImgTwo = styled(ExtraImg)`
  bottom: 25.5%;
  right: 32.5%;
  width: 35%;
`;

const Main = () => {
  useEffect(() => {
    document.body.classList.add('main-page');
    document.documentElement.classList.add('main-html');
    return () => {
      document.body.classList.remove('main-page');
      document.documentElement.classList.remove('main-html');
    };
  }, []);

  return (
    <>
      <BackgroundOverlay />

      <Container>
        <OnboardingLine>
          <SideImg src="./images/1.svg" alt="left text" />
          <BracketImg src="./images/2.svg" alt="left bracket" />

          <CenterImgContainer>
            {/* original은 숨기고 최종 new 이미지만 별도 컨테이너에서 표시 */}
          </CenterImgContainer>

          <BracketImg src="./images/3.svg" alt="right bracket" />
          <SideImg src="./images/4.svg" alt="right text" />
        </OnboardingLine>

        <NewImgContainer>
          <CenterImgNew src="./images/eyes.svg" alt="new" />
        </NewImgContainer>

        <ImgOne src="./images/a.svg" alt="extra1" />
        <ImgTwo src="./images/5.svg" alt="extra2" />
      </Container>

      {/* 메인 상호작용 모델 */}
      <Model />
    </>
  );
};

export default Main;
