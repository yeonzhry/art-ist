import React from "react";
import styled from "styled-components";


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
  top: 9rem; /* 필요에 따라 값 조절 */
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: var( --background-2);
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

const CloseBtn = styled.button`
  margin-top: 1rem;
  background: transparent;
  border: 1px solid var(--green-04);
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
`;

const normalizeLabel = (label) => {
  if (!label) return "rest";
  const s = String(label).trim();
  return s || "rest";
};

// 오선 위 수직 위치 (5선 간격 조정)
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

const Score = ({ notes = [], bpm = 100, onClose, onNext }) => {
  const filled = Array.from({ length: 32 }, (_, i) => normalizeLabel(notes[i]));
  const system1 = filled.slice(0, 16);
  const system2 = filled.slice(16, 32);
  console.log("onNext:", onNext);

  return (
    <Overlay>
      <Label>( Recording )</Label>
      <Staff systemNotes={system1} systemIndex={0} />
      <Staff systemNotes={system2} systemIndex={1} />
      <Notice>Click  <img src="./images/button1.svg" style={{marginBottom: "-0.3rem", padding: "0 0.5rem"}}/>  to re-record</Notice>
      
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
          alt="Next"
          onClick={onNext}
          style={{ cursor: "pointer", width: "4rem", height: "auto"}}
        />
        <img
          src="/images/button3.svg"
          alt="Next"
          onClick={onNext}
          style={{ cursor: "pointer", width: "1.87rem", height: "auto"}}
        />
      </ButtonContainer>
    </Overlay>
  );
};

export default Score;