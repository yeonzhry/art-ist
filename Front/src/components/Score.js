import React, { useRef, useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { supabase } from "../supabase"; 
import PlayControlButtons from "./PlayControlButtons";

const Overlay = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-1);
  z-index: 10000;
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

const System = styled.div`
  position: relative;
  width: 61rem;
  height: 12rem;
  left: 2rem;
  margin-top: -3rem;
  top: -8%;
`;

const StaffLine = styled.div`
  position: absolute;
  left: 0rem;
  right: 0;
  height: 0.16rem;
  background: var(--blue-04);
`;

const Clef = styled.img`
  position: absolute;
  left: -5rem;
  top: 2rem;
  width: 3.5rem;
  height: auto;
  z-index: 2;
`;

const SystemInner = styled.div`
  position: absolute;
  left: 0rem;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Measure = styled.div`
  position: relative;
  display: inline-block;
  width: 25%;
  height: 100%;
  box-sizing: border-box;
`;

const MeasureLine = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  bottom: 4rem;
  width: 0.16rem;
  background: #61b3c1;
`;

const DoubleMeasureLine = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  bottom: 4rem;
  
  &::before {
    content: '';
    position: absolute;
    right: 0.3rem;
    top: 0;
    bottom: 0;
    width: 0.16rem;
    background: #61b3c1;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 0.25rem;
    background: #61b3c1;
  }
`;

const NoteSprite = styled.img`
  position: absolute;
  width: 2.6rem;
  height: auto;
  transform: translate(-50%, -50%);
`;

const NoteLabel = styled.div`
  position: absolute;
  top: 9rem;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var(--background-2);
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
`;

const Notice = styled.div`
  position: absolute;
  top: 37rem;
  font-size: 1rem;
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
  color: var(--neutral-03);
`;


const ScoreDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: -5rem;
`;

const CaptureArea = styled.div`
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--background-1);
  padding: 5rem 4rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const normalizeLabel = (label) => {
  if (!label) return "rest";
  const s = String(label).trim();
  return s || "rest";
};

const PITCH_Y = {
  Do: 5.8,
  Re: 5.0,
  Mi: 4.4,
  Fa: 3.6,
  Sol: 2.8,
  La: 2,
  Ti: 1.2,
  rest: 5,
};

const noteImageFromLabel = (label) => {
  const key = (label || "rest").toLowerCase();
  if (key === "no hand") {
    return `/images/scores/rest.svg`;
  }
  return `/images/scores/${key}.svg`;
};

const NOTE_TO_EN = { Do: 'Do', Re: 'Re', Mi: 'Mi', Fa: 'Fa', Sol: 'Sol', La: 'La', Ti: 'Ti' };

const placeNotesInMeasure = (measureNotes, measureIndex) => {
  const lefts = [12.5, 37.5, 62.5, 87.5];
  return measureNotes.map((raw, idx) => {
    const label = normalizeLabel(raw);
    const y = PITCH_Y[label] ?? PITCH_Y.rest;
    const src = noteImageFromLabel(label);
    return (
      <React.Fragment key={`${measureIndex}-${idx}`}>
        <NoteSprite
          src={src}
          alt={label}
          style={{ left: `${lefts[idx]}%`, top: `${y}rem` }}
        />
        {label !== 'rest' && NOTE_TO_EN[label] && (
          <NoteLabel style={{ left: `${lefts[idx]}%` }}>
            ({NOTE_TO_EN[label]})
          </NoteLabel>
        )}
      </React.Fragment>
    );
  });
};

const Staff = ({ systemNotes, systemIndex }) => {
  const linesTop = [2, 3.5, 5, 6.5, 8];
  const isFirstSystem = systemIndex === 0;
  const isLastSystem = systemIndex === 1;
  return (
    <System>
      {isFirstSystem && <Clef src="/images/scores/clef.svg" alt="treble clef" />}
      {linesTop.map((t, i) => (
        <StaffLine key={i} style={{ top: `${t}rem` }} />
      ))}
      <SystemInner>
        {Array.from({ length: 4 }, (_, m) => {
          const notesForMeasure = systemNotes.slice(m * 4, m * 4 + 4);
          const isLastMeasureOfLastSystem = isLastSystem && m === 3;
          
          return (
            <Measure key={`${systemIndex}-${m}`}>
              {placeNotesInMeasure(notesForMeasure, `${systemIndex}-${m}`)}
              {isLastMeasureOfLastSystem ? <DoubleMeasureLine /> : <MeasureLine />}
            </Measure>
          );
        })}
      </SystemInner>
    </System>
  );
};

const Score = ({ notes = [], bpm = 100, onClose, onNext, userId }) => {
  const scoreRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const filled = Array.from({ length: 32 }, (_, i) => normalizeLabel(notes[i]));
  const system1 = filled.slice(0, 16);
  const system2 = filled.slice(16, 32);


  const StaffContent = () => (
    <>
      <Staff systemNotes={system1} systemIndex={0} />
      <Staff systemNotes={system2} systemIndex={1} />
    </>
  );


  const saveScoreImage = async () => {
    if (!scoreRef.current) {
      console.error("Score reference is missing");
      return null;
    }

    if (!userId) {
      console.error("User ID is missing - please pass userId prop to Score component");
      alert("User ID가 없습니다. userId prop을 전달해주세요.");
      return null;
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
      console.log("Found recording ID:", recordingId);


      const canvas = await html2canvas(scoreRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 2,
        useCORS: true,
        logging: false,
        width: scoreRef.current.scrollWidth,
        height: scoreRef.current.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
      });


      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png", 0.95);
      });

      if (!blob) {
        throw new Error("Failed to create image blob");
      }


      const fileName = `score_${userId}_${recordingId}_${Date.now()}.png`;

      
      const { error: uploadError } = await supabase.storage
        .from("scores")
        .upload(fileName, blob, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("scores")
        .getPublicUrl(fileName);

  
      const { error: updateError } = await supabase
        .from("Recording")
        .update({ image_url: publicUrl })
        .eq("id", recordingId);

      if (updateError) {
        throw updateError;
      }

      console.log("✅ Score image saved successfully:", publicUrl);
      return publicUrl;
    } catch (error) {
      console.error("❌ Error saving score image:", error);
      alert(`악보 저장 중 오류가 발생했습니다: ${error.message}`);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    const publicUrl = await saveScoreImage(); 
    if (!publicUrl) return;
  

    await fetch("http://localhost:3001/print-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: publicUrl })
    });
  
    if (onNext) {
      onNext();
    }
  };

  return (
    <Overlay>
      <Label>( Recording )</Label>
      
      {/* 화면에 보이는 악보 */}
      <ScoreDisplay>
        <StaffContent />
      </ScoreDisplay>
      
      {/* 캡처용 악보 (화면 밖에 숨김) */}
      <CaptureArea ref={scoreRef}>
        <StaffContent />
      </CaptureArea>
      
      <Notice>
        Click <img src="./images/button1.svg" alt="Re-record button" style={{marginBottom: "-0.3rem", padding: "0 0.5rem"}}/>  to re-record
      </Notice>
      
      <PlayControlButtons
        buttons={[
          {
            src: "/images/button1.svg",
            alt: "Prev",
            width: "1.87rem",
            onClick: onClose,
          },
          {
            src: "/images/button2.svg",
            alt: "Next",
            width: "4rem",
            onClick: handleNext,
            disabled: isSaving,
            disabledOpacity: 0.6,
            disabledCursor: "wait",
          },
          {
            src: "/images/button3.svg",
            alt: "Save",
            width: "1.87rem",
            onClick: saveScoreImage,
          },
        ]}
      />
    </Overlay>
  );
};

export default Score;