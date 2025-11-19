import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

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
  /* justify-content: center; */
  animation: ${fadeIn} 1s ease forwards;
  z-index: 30000;
`;

const NotesContainer = styled.div`
  position: absolute; // 화면 기준으로 절대 위치
  top: 10%;  // 원하는 위치 조정
  left: 0;
  width: 100%;
  height: 15rem;
`;

const Note = styled.img`
  position: absolute;
  top: 30%;
  left: 30%;
`;

const DoneTitle = styled.h1`
  position: absolute;
  top: 28%;
  font-family: "Zen Dots", sans-serif;
  font-size: 6rem;
  color: var(--blue-04);
  margin-bottom: 1rem;
`;

const DoneText = styled.p`
  position: absolute;
  top: 48%; 
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
  position: absolute;
  top: 58%; 
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

const Archiving = ({ onClose, onNext, userId }) => {
  const [showDone, setShowDone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // LP 색상 매핑
  const LP_COLORS = {
    1: 'blue',
    2: 'red',
    3: 'green'
  };

  const handleLPClick = async (lpNumber) => {
    if (!userId) {
      console.error("User ID is missing");
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

      if (fetchError) {
        throw fetchError;
      }

      if (!recordings || recordings.length === 0) {
        throw new Error("해당 사용자의 녹음 기록을 찾을 수 없습니다.");
      }

      const recordingId = recordings[0].id;
      const lpColor = LP_COLORS[lpNumber];

      console.log(`Saving LP color: ${lpColor} for recording ID: ${recordingId}`);

      // 2. Recording 테이블에 LP 색상 저장
      // file_url 컬럼에 LP 색상 저장 (또는 새로운 컬럼이 있다면 그것 사용)
      const { error: updateError } = await supabase
        .from("Recording")
        .update({ lp_color: lpColor })
        .eq("id", recordingId);

      if (updateError) {
        throw updateError;
      }

      console.log("✅ LP color saved successfully:", lpColor);
      
      // 성공하면 Done 화면으로 전환
      setShowDone(true);
    } catch (error) {
      console.error("❌ Error saving LP color:", error);
      alert(`LP 색상 저장 중 오류가 발생했습니다: ${error.message}`);
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
        <LPWrapper
          onMouseEnter={() => {
            hoverSound.currentTime = 0;
            hoverSound.play();
          }}
          onClick={() => {
            clickSound.currentTime = 0;
            clickSound.play();
            handleLPClick(1);
          }}
                >
          <LPImage src="/images/LP_Blue.svg" alt="LP 1" />
        </LPWrapper>

        <LPWrapper
          onMouseEnter={() => {
            hoverSound.currentTime = 0;
            hoverSound.play();
          }}
          onClick={() => {
            clickSound.currentTime = 0;
            clickSound.play();
            handleLPClick(2);
          }}
                >
          <LPImage src="/images/LP_Red.svg" alt="LP 2" />
        </LPWrapper>
        <LPWrapper
          onMouseEnter={() => {
            hoverSound.currentTime = 0;
            hoverSound.play();
          }}
          onClick={() => {
            clickSound.currentTime = 0;
            clickSound.play();
            handleLPClick(3);
          }}
                >
          <LPImage src="/images/LP_Green.svg" alt="LP 3" />
        </LPWrapper>
      </LPContainer>

      <Notice>
        {isSaving ? "Saving..." : "Select Your LP Color"}
      </Notice>

      <ButtonBg src="/images/buttonBg.svg" alt="Button bg" />

      <ButtonContainer>
        <img
          src="/images/button1.svg"
          alt="Prev"
          onClick={onClose}
          style={{ 
            cursor: isSaving ? "not-allowed" : "pointer", 
            width: "1.87rem", 
            height: "auto",
            opacity: isSaving ? 0.5 : 1
          }}
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
          style={{ 
            cursor: isSaving ? "not-allowed" : "pointer", 
            width: "1.87rem", 
            height: "auto",
            opacity: isSaving ? 0.5 : 1
          }}
        />
      </ButtonContainer>
    </Overlay>
  );
};

export default Archiving;