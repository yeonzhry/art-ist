import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Model from "../components/Model";

const BackgroundOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15vh;
  background-color: var(--background-3);
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  transform: translateY(36vh);
  transition: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    transform: translateY(36vh);
  }

  @media (min-width: 2560px) {
    transform: translateY(36vh);
  }
`;

const OnboardingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;

 
  
`;

const SideImg = styled.img`
  width: 420px;
  opacity: 1;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(350px, 18vw, 500px);
  }

  @media (min-width: 2560px) {
    width: clamp(400px, 20vw, 600px);
  }
`;

const BracketImg = styled.img`
  width: 50px;
  z-index: 20;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(40px, 2.5vw, 60px);
  }

  @media (min-width: 2560px) {
    width: clamp(50px, 2.5vw, 70px);
  }
`;

const CenterImgContainer = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  overflow: visible;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(180px, 10vw, 250px);
    height: clamp(270px, 15vw, 350px);
  }

  @media (min-width: 2560px) {
    width: clamp(220px, 11vw, 300px);
    height: clamp(330px, 16.5vw, 400px);
  }
`;

const NewImgContainer = styled.div`
  position: absolute;
  top: 12%;
  left: 62%;
  transform: translateX(-50%);
  opacity: 1;
  width: 200px;
  height: 200px;
  z-index: 50;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(180px, 10vw, 250px);
    height: clamp(180px, 10vw, 250px);
    left: 60%;
  }

  @media (min-width: 2560px) {
    width: clamp(220px, 11vw, 300px);
    height: clamp(220px, 11vw, 300px);
    left: 58%;
  }
`;

const CenterImgNew = styled.img`
  position: relative;
  z-index: 100;
  width: 150px;
  height: auto;
  display: block;
  opacity: 1;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(130px, 7.5vw, 200px);
  }

  @media (min-width: 2560px) {
    width: clamp(160px, 8vw, 240px);
  }
`;

const PupilImg = styled.img`
  position: absolute;
  top: 22%;
  width: 40px;
  height: auto;
  z-index: 101;
  pointer-events: none;
  transition: transform 0.1s ease-out;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(35px, 2vw, 50px);
  }

  @media (min-width: 2560px) {
    width: clamp(55px, 2.2vw, 60px);
  }
`;

const LeftPupil = styled(PupilImg)`
  left: 22%;
  transform: translate(-50%, -50%);
`;

const RightPupil = styled(PupilImg)`
  left: 54%;
  transform: translate(-50%, -50%);
`;

const ExtraImg = styled.img`
  position: absolute;
  opacity: 1;
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


const SoundToggle = styled.div`
  position: fixed;
  bottom: 160px;
  right: 40px;
  z-index: 99999;
  width: 60px;
  height: 32px;
  border-radius: 20px;
  background: var(--background-3);
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  transition: background 0.25s ease;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(55px, 3vw, 70px);
    height: clamp(30px, 1.7vw, 38px);
    bottom: clamp(140px, 8vh, 180px);
    right: clamp(35px, 2vw, 50px);
  }

  @media (min-width: 2560px) {
    width: clamp(65px, 3.2vw, 80px);
    height: clamp(35px, 1.8vw, 42px);
    bottom: clamp(150px, 8.5vh, 200px);
    right: clamp(40px, 2.2vw, 60px);
  }
`;

const ToggleHandle = styled.div`
  width: 24px;
  height: 24px;
  background: var(--background-1);
  border-radius: 50%;
  transform: ${(props) => (props.$active ? "translateX(28px)" : "translateX(0px)")};
  transition: transform 0.25s ease;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(22px, 1.2vw, 28px);
    height: clamp(22px, 1.2vw, 28px);
  }

  @media (min-width: 2560px) {
    width: clamp(26px, 1.3vw, 32px);
    height: clamp(26px, 1.3vw, 32px);
  }
`;





const Main = () => {
  const [leftPupilPosition, setLeftPupilPosition] = useState({ x: 15, y: 5 });
  const [rightPupilPosition, setRightPupilPosition] = useState({ x: 15, y: 5 });

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.body.classList.add('main-page');
    document.documentElement.classList.add('main-html');
    return () => {
      document.body.classList.remove('main-page');
      document.documentElement.classList.remove('main-html');
    };
  }, []);


  useEffect(() => {
    const audio = new Audio("/sounds/background.mp3"); 
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        console.log("BGM autoplay success");
        return true;
      } catch (err) {
        console.log("Autoplay blocked. Waiting for user interaction...");
        setIsPlaying(false);
        return false;
      }
    };

    tryPlay();


    const handleRealMove = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener("pointermove", handleRealMove);
      window.removeEventListener("pointerdown", handleRealMove);
      window.removeEventListener("touchstart", handleRealMove);
    };

    window.addEventListener("pointermove", handleRealMove, { once: true });
    window.addEventListener("pointerdown", handleRealMove, { once: true });
    window.addEventListener("touchstart", handleRealMove, { once: true });

    return () => {
      window.removeEventListener("pointermove", handleRealMove);
      window.removeEventListener("pointerdown", handleRealMove);
      window.removeEventListener("touchstart", handleRealMove);
      audio.pause();
    };
  }, []);


  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {

        console.warn("Play failed:", err);
        setIsPlaying(false);
      }
    }
  };



  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyesContainer = document.getElementById("eyes-container");
      if (!eyesContainer) return;
  
      const rect = eyesContainer.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
  
      const isUltraWide = window.innerWidth >= 2560; 
      const limit = isUltraWide ? 16 : 9;   // ← 여기서 확대 범위 조절!
  
      const leftEyeCenterX = rect.left + containerWidth * 0.42;
      const leftEyeCenterY = rect.top + containerHeight * 0.25;
  
      const rightEyeCenterX = rect.left + containerWidth * 0.58;
      const rightEyeCenterY = rect.top + containerHeight * 0.25;
  
      const leftDeltaX = e.clientX - leftEyeCenterX;
      const leftDeltaY = e.clientY - leftEyeCenterY;
      const leftAngle = Math.atan2(leftDeltaY, leftDeltaX);
      const leftDistance = Math.min(
        Math.sqrt(leftDeltaX ** 2 + leftDeltaY ** 2),
        limit
      );
      const leftMoveX = Math.cos(leftAngle) * leftDistance * 2;
      const leftMoveY = Math.sin(leftAngle) * leftDistance;
  
      const rightDeltaX = e.clientX - rightEyeCenterX;
      const rightDeltaY = e.clientY - rightEyeCenterY;
      const rightAngle = Math.atan2(rightDeltaY, rightDeltaX);
      const rightDistance = Math.min(
        Math.sqrt(rightDeltaX ** 2 + rightDeltaY ** 2),
        limit
      );
      const rightMoveX = Math.cos(rightAngle) * rightDistance * 2;
      const rightMoveY = Math.sin(rightAngle) * rightDistance;
  
      setLeftPupilPosition({ x: leftMoveX, y: leftMoveY });
      setRightPupilPosition({ x: rightMoveX, y: rightMoveY });
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  

  return (
    <>
      <BackgroundOverlay />

      <SoundToggle onClick={toggleSound} $active={isPlaying}>
  <ToggleHandle $active={isPlaying} />
</SoundToggle>



      <Container>
        <OnboardingLine>
          <SideImg src="./images/1.svg" alt="left text" />
          <BracketImg src="./images/2.svg" alt="left bracket" />

          <CenterImgContainer></CenterImgContainer>

          <BracketImg src="./images/3.svg" alt="right bracket" />
          <SideImg src="./images/4.svg" alt="right text" />
        </OnboardingLine>

        <NewImgContainer id="eyes-container">
          <CenterImgNew src="./images/eyes2.svg" alt="new" />

          <LeftPupil
            src="./images/eyes3.svg"
            alt="left pupil"
            style={{
              transform: `translate(calc(-50% + ${leftPupilPosition.x}px), calc(-50% + ${leftPupilPosition.y}px))`,
            }}
          />
          <RightPupil
            src="./images/eyes3.svg"
            alt="right pupil"
            style={{
              transform: `translate(calc(-50% + ${rightPupilPosition.x}px), calc(-50% + ${rightPupilPosition.y}px))`,
            }}
          />
        </NewImgContainer>

        <ImgOne src="./images/a.svg" alt="extra1" />
        <ImgTwo src="./images/5.svg" alt="extra2" />
      </Container>

      <Model />
    </>
  );
};

export default Main;
