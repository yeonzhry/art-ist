import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import PlayControlButtons from "./PlayControlButtons";

const hoverSound = new Audio("/sounds/hover.mp3");
const clickSound = new Audio("/sounds/click.mp3");

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
  position: absolute;
  font-weight: 400;
  color: var(--background-2);
  top: 4.44rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: 3.6rem;
    top: 12rem;
  }
  @media (min-width: 2560px) {
    font-size: 3.6rem;
    top: 12rem;
  }
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
  margin-top: -14rem;
  width: 12.6875rem;
  height: 12.6875rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: 16rem;
    height: 16rem;
  }
  @media (min-width: 2560px) {
    width: 16rem;
    height: 16rem;
  }
`;

const Notice = styled.div`
  font-size: 1.5rem;
  font-family: "timeline-210", sans-serif;
  color: var(--neutral-09);
  margin-top: 1rem;


  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: 2rem;
    margin-top: 3rem;

  }
  @media (min-width: 2560px) {
    margin-top: 3rem;
    font-size: 2rem;

  }
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
  animation: ${fadeIn} 1s ease forwards;
  z-index: 30000;
`;

const NotesContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 15rem;
`;

const Note = styled.img`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: 60rem;

  }
  @media (min-width: 2560px) {
    width: 60rem;
  }
`;

const DoneTitle = styled.h1`
  position: absolute;
  top: 28%;
  font-family: "Zen Dots", sans-serif;
  font-size: 6rem;
  color: var(--blue-04);

  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: 7.2rem;
  }
  @media (min-width: 2560px) {
    font-size: 7.2rem;
  }
`;

const DoneText = styled.p`
  position: absolute;
  top: 48%;
  font-family: "timeline-210", sans-serif;
  font-size: 1.5rem;
  color: var(--neutral-03);

  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: 2rem;
  }
  @media (min-width: 2560px) {
    font-size: 2rem;
  }
`;

const ArchiveLink = styled.span`
  color: var(--blue-00);
  cursor: pointer;
  text-decoration: underline;
`;

const HomeButton = styled.div`
  position: absolute;
  top: 58%;
  font-family: "timeline-210", sans-serif;
  font-size: 2rem;
  color: var(--background-2);
  border-bottom: 4px solid var(--background-3);
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: 2.4rem;
  }
  @media (min-width: 2560px) {
    font-size: 2.4rem;
  }
`;

const Archiving = ({ onClose, onNext, userId }) => {
  const [showDone, setShowDone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const LP_COLORS = {
    1: "blue",
    2: "red",
    3: "green",
  };

  const handleLPClick = async (lpNumber) => {
    if (!userId) {
      alert("User ID가 없습니다.");
      return;
    }

    setIsSaving(true);

    try {
      const { data: recordings, error: fetchError } = await supabase
        .from("Recording")
        .select("id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (fetchError || !recordings?.length) {
        throw new Error("녹음 기록을 찾을 수 없습니다.");
      }

      const recordingId = recordings[0].id;
      const lpColor = LP_COLORS[lpNumber];

      await supabase
        .from("Recording")
        .update({ lp_color: lpColor })
        .eq("id", recordingId);

      setShowDone(true);
    } catch (error) {
      alert(`LP 저장 오류: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (showDone) {
    return (
      <DoneOverlay>
        <NotesContainer>
          <Note src="/images/note.svg" alt="note" />
        </NotesContainer>

        <DoneTitle>All done!</DoneTitle>

        <DoneText>
          You can check your sheet music in{" "}
          <ArchiveLink onClick={() => navigate("/archive")}>(Archive)</ArchiveLink>
        </DoneText>

        <HomeButton onClick={() => navigate("/")}>Go Home</HomeButton>
      </DoneOverlay>
    );
  }

  return (
    <Overlay>
      <Label>( Archiving )</Label>

      <LPContainer>
        <LPWrapper
          onMouseEnter={() => (hoverSound.currentTime = 0, hoverSound.play())}
          onClick={() => (clickSound.currentTime = 0, clickSound.play(), handleLPClick(1))}
        >
          <LPImage src="/images/LP_Blue.svg" alt="LP 1" />
        </LPWrapper>

        <LPWrapper
          onMouseEnter={() => (hoverSound.currentTime = 0, hoverSound.play())}
          onClick={() => (clickSound.currentTime = 0, clickSound.play(), handleLPClick(2))}
        >
          <LPImage src="/images/LP_Red.svg" alt="LP 2" />
        </LPWrapper>

        <LPWrapper
          onMouseEnter={() => (hoverSound.currentTime = 0, hoverSound.play())}
          onClick={() => (clickSound.currentTime = 0, clickSound.play(), handleLPClick(3))}
        >
          <LPImage src="/images/LP_Green.svg" alt="LP 3" />
        </LPWrapper>
      </LPContainer>

      <Notice>{isSaving ? "Saving..." : "Select Your LP Color"}</Notice>

      <PlayControlButtons
        showBackground={true}
        backgroundAlt="Archiving controls"
        buttons={[
          {
            src: "/images/button1.svg",
            alt: "Prev",
            width: "1.87rem",
            disabled: isSaving,
            disabledOpacity: 0.5,
            onClick: onClose,
          },
          {
            src: "/images/button2.svg",
            alt: "Record",
            width: "4rem",
            disabled: false,
          },
          {
            src: "/images/button3.svg",
            alt: "Next",
            width: "1.87rem",
            disabled: isSaving,
            disabledOpacity: 0.5,
            onClick: onNext,
          },
        ]}
      />
    </Overlay>
  );
};

export default Archiving;
