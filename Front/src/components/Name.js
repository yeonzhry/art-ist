// Name.js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; 
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import * as Tone from "tone";
import { supabase } from "../supabase"; // ✅ Supabase 연동
import PlayControlButtons from "./PlayControlButtons";

// ========================
// Styled Components
// ========================
const fadeIn = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 81px);
  margin-top: 81px;
  background-color: var(--background-1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  animation: ${fadeIn} 1s ease forwards;
  padding-top: 2rem;
  z-index: 99999; 
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`;

const Label = styled.div`
  font-size: 3rem;
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  color: var(--background-2);
  position: absolute;
  top: 4.44rem;
`;

const TextBox = styled.div`
  width: 58.68rem;
  height: 14.81rem;
  background-color: var(--background-3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 13.13rem;
  cursor: text;
`;

const Staff = styled.div`
  position: relative;
  width: 50.6rem;
  height: 14.81rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    margin-top: 2rem;
    left: 0;
    width: 100%;
    height: 9.71rem;
    background-image: linear-gradient(to bottom, var(--background-2) 2px, transparent 1px);
    background-size: 100% 20%;
    opacity: 0.7;
  }
`;

const NotesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Note = styled.img`
  height: ${({ noteType }) => (noteType === "large" ? "82px" : "65px")};
  transform: translateY(${({ randomY }) => `${randomY}px`});
  transition: none;
`;

const TextBoxFooter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--neutral-04);
`;

const TextBoxFooterLeft = styled.div`
  text-align: left;
  margin-left: 4rem;
`;

const TextBoxFooterRight = styled.div`
  text-align: right;
  margin-right: 4rem;
`;

const ColorButtonContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 0.5rem; 
  margin-top: 1.04rem;
  align-items: center; 
`;

const ColorButtonsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const SelectColor = styled.p`
  font-size: 1rem;
  color: var(--neutral-04);
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const ColorButton = styled.img`
  width: 100%;
  cursor: pointer;
  border-bottom: ${({ $isSelected }) => ($isSelected ? "5px solid var(--neutral-04)" : "none")};
  padding: 0.1rem;
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  color: var(--neutral-04);
  font-size: 1rem;
`;

// ========================
// Name Component
// ========================
const Name = ({ onNext }) => {
  const [name, setName] = useState("");
  const [randomPositions, setRandomPositions] = useState([]);
  const [selectedColor, setSelectedColor] = useState("pink");
  const [synth, setSynth] = useState(null);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const synthInstance = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 },
    }).toDestination();
    setSynth(synthInstance);

    const input = document.getElementById("hidden-input");
    if (input) input.focus();
  }, []);

  const noteMap = {
    a:"C4", b:"C4", c:"D4", d:"D4", e:"E4", f:"E4",
    g:"F4", h:"F4", i:"G4", j:"G4", k:"A4", l:"A4",
    m:"B4", n:"B4", o:"C5", p:"C5", q:"D5", r:"D5",
    s:"E5", t:"E5", u:"F5", v:"F5", w:"G5", x:"G5",
    y:"A5", z:"A5",
  };

  const getFixedRandomPosition = (char, index) => {
    const seed = char.charCodeAt(0);
    return ((seed * 9301 + 49297) % 233280) / 233280 * 20 - 10;
  };

  const handleChange = async (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 10);
    
    if (value.length > name.length) {
      const newChar = value[value.length - 1].toLowerCase();
      const note = noteMap[newChar];
      if (note && synth) {
        await Tone.start(); 
        synth.triggerAttackRelease(note, "8n");
      }
    }

    setName(value);
    const positions = value.split("").map((char, i) => getFixedRandomPosition(char, i));
    setRandomPositions(positions);
  };

  const getNoteType = (char) => {
    const largeNotes = ["a","e","i","m","n","r","v"];
    return largeNotes.includes(char.toLowerCase()) ? "small" : "large";
  };

  const letterToImage = (letter, color) => {
    const baseName = letter.toLowerCase();
    return color === "black"
      ? `/images/notes_b/${baseName}_b.png`
      : `/images/notes/${baseName}.png`;
  };

  const handleTextBoxClick = () => {
    const input = document.getElementById("hidden-input");
    if (input) input.focus();
  };

  const handlePrev = () => navigate("/main");

  // ========================
  // Supabase Insert
  // ========================
  const handleNext = async () => {
    if (!name) return;

    // 🎸 Main.js에서 선택된 instrument 불러오기
    const instrument = localStorage.getItem("instrument");
    if (!instrument) {
      setStatus("악기 정보가 없습니다. 메인 화면에서 다시 선택해주세요.");
      return;
    }

    try {
      // ✅ Supabase에 name + instrument + color + positions 함께 저장
      const { data, error } = await supabase
        .from("User")
        .insert([{ 
          name, 
          instrument,
          name_color: selectedColor,
          name_positions: randomPositions
        }])
        .select();

      if (error) {
        console.error("Supabase Error:", error);
        setStatus(`DB 오류: ${error.message}`);
        return;
      }

      const user = data[0];
      setStatus(`생성 완료! ID: ${user.id}, Name: ${user.name}, Instrument: ${user.instrument}`);

      // ✅ user_id를 localStorage에 저장
      localStorage.setItem("user_id", user.id);

      if (onNext) onNext();
    } catch (err) {
      console.error("네트워크 오류:", err);
      setStatus("네트워크 오류");
    }
  };

  // ========================
  // Render
  // ========================
  const nameContent = (
    <Overlay>
      <Label>( Your Name )</Label>

      <TextBox onClick={handleTextBoxClick}>
        <Staff>
          <NotesContainer>
            {name.split("").map((char, i) => (
              <Note
                key={`${char}-${i}`}
                src={letterToImage(char, selectedColor)}
                noteType={getNoteType(char)}
                randomY={randomPositions[i] || 0}
              />
            ))}
          </NotesContainer>
        </Staff>

        <TextBoxFooter>
          <TextBoxFooterLeft>Only alphabets</TextBoxFooterLeft>
          <TextBoxFooterRight>{name.length} / 10 words</TextBoxFooterRight>
        </TextBoxFooter>
      </TextBox>

      <ColorButtonContainer>
        <ColorButtonsWrapper>
          <ColorButton
            src="/images/pink.svg"
            onClick={() => setSelectedColor("pink")}
            $isSelected={selectedColor === "pink"}
            alt="Pink color"
          />
          <ColorButton
            src="/images/black.svg"
            onClick={() => setSelectedColor("black")}
            $isSelected={selectedColor === "black"}
            alt="Black color"
          />
        </ColorButtonsWrapper>
        <SelectColor>Select Color</SelectColor>
      </ColorButtonContainer>

      <StatusMessage>{status}</StatusMessage>

      <PlayControlButtons
        buttons={[
          {
            src: "/images/button1.svg",
            alt: "Prev",
            width: "1.87rem",
            onClick: handlePrev,
          },
          {
            src: "/images/button2.svg",
            alt: "Next",
            width: "4rem",
            onClick: handleNext,
          },
          {
            src: "/images/button3.svg",
            alt: "Next",
            width: "1.87rem",
            onClick: handleNext,
          },
        ]}
      />
      <HiddenInput
        id="hidden-input"
        type="text"
        value={name}
        maxLength={10}
        onChange={handleChange}
        autoFocus
      />
    </Overlay>
  );

  return ReactDOM.createPortal(nameContent, document.body);
};

export default Name;
