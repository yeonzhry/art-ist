import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-1);
  z-index: 20001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--green-04);
  font-family: "Zen Dots", sans-serif;
`;

const Label = styled.div`
  font-size: 3rem;
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  color: var(--background-2);
  position: absolute;
  top: 4.44rem;
`;

const LPContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const LPWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-0.5rem);
  }
`;

const LPImage = styled.img`
  margin-top: -15rem;
  width: 12.6875rem;
  height: 12.6875rem;
  object-fit: cover;
`;

const Notice = styled.div`
  font-size: 1.5rem;
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
  color: var(--neutral-09);
`;

const ButtonBg = styled.img`
  width: 20rem;
  height: auto;
  z-index: 0;
  position: fixed;
  left: 50%;
  bottom: 6rem;
  transform: translateX(-50%);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  position: fixed;
  left: 50%;
  bottom: 6.5rem;
  transform: translateX(-50%);
  z-index: 1;
`;

const DoneOverlay = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-1);
  color: var(--background-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease forwards;
  z-index: 30000;
`;

const NotesContainer = styled.div`
  position: absolute;
  top: 15rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Note = styled.img`
  :first-child  {
    width: 6.5rem;
    height: auto;
    margin-top: -15rem;
  }
  :nth-child(2)  {
    width: 2.44rem;
    height: auto;
  }
  :nth-child(3)  {
    width: 9rem;
    height: auto;
  }
`;

const DoneTitle = styled.h1`
  position: absolute;
  top: 20%;
  font-family: "Zen Dots", sans-serif;
  font-size: 6rem;
  color: #76b8c9;
  margin-bottom: 1rem;
`;

const DoneText = styled.p`
  font-family: "timeline-210", sans-serif;
  font-size: 1.2rem;
  color: #bfbfbf;
  margin-bottom: 2rem;
`;

const ArchiveLink = styled.span`
  color: #9dd7e3;
  cursor: pointer;
  text-decoration: underline;
`;

const HomeButton = styled.div`
  font-family: "timeline-210", sans-serif;
  font-size: 1.3rem;
  color: var(--background-2);
  border-bottom: 2px solid #d9e5c7;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Archiving = ({ onClose, onNext }) => {
  const [showDone, setShowDone] = useState(false);
  const navigate = useNavigate();

  const handleLPClick = () => {
    setShowDone(true);
  };

  if (showDone) {
    return (
      <DoneOverlay>
        <NotesContainer>
          <Note src="/images/note1.svg" alt="note1" />
          <Note src="/images/note2.svg" alt="note2" />
          <Note src="/images/note3.svg" alt="note3" />
        </NotesContainer>

        <DoneTitle>All done!</DoneTitle>
        <DoneText>
          You can check your sheet music in{" "}
          <ArchiveLink onClick={() => navigate("/archive")}>
            (Archive)
          </ArchiveLink>
        </DoneText>

        <HomeButton onClick={() => navigate("/")}>Go Home</HomeButton>
      </DoneOverlay>
    );
  }

  return (
    <Overlay>
      <Label>( Archiving )</Label>

      <LPContainer>
        <LPWrapper onClick={() => handleLPClick(1)}>
          <LPImage src="/images/LP_Blue.svg" alt="LP 1" />
        </LPWrapper>
        <LPWrapper onClick={() => handleLPClick(2)}>
          <LPImage src="/images/LP_Red.svg" alt="LP 2" />
        </LPWrapper>
        <LPWrapper onClick={() => handleLPClick(3)}>
          <LPImage src="/images/LP_Green.svg" alt="LP 3" />
        </LPWrapper>
      </LPContainer>

      <Notice>Select Your LP Color</Notice>

      <ButtonBg src="/images/buttonBg.svg" alt="Button bg" />

      <ButtonContainer>
        <img
          src="/images/button1.svg"
          alt="Prev"
          onClick={onClose}
          style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
        />
        <img
          src="/images/button2.svg"
          alt="Record"
          style={{ cursor: "pointer", width: "4rem", height: "auto" }}
        />
        <img
          src="/images/button3.svg"
          alt="Next"
          onClick={onNext}
          style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
        />
      </ButtonContainer>
    </Overlay>
  );
};

export default Archiving;
