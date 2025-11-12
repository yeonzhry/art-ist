import React, { useRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import * as Tone from "tone";

const Overlay = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100%;
  height: calc(100% - 81px);
  background-color: var(--background-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  z-index: 9999;
`;

const Label = styled.div`
  font-size: 3rem;
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  color: var(--background-2);
  position: absolute;
  top: 4.44rem;
`;

const HandsContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const LeftHand = styled(HandsContainer)`
  left: 13rem;
`;

const RightHand = styled(HandsContainer)`
  right: 13rem;
`;

const HandItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: "Zen Dots", sans-serif;

  img {
    width: 9rem;
    height: auto;
  }
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

const WebcamContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid var(--green-04);
  width: 40rem;
  height: 27rem;
  background: black;
  z-index: 2;
  overflow: hidden;

  video {
    object-fit: cover; 
    width: 100%;
    height: 100%;
  }
`;

// ⭐️ 이펙트 조절 버튼 스타일
const EffectControlContainer = styled.div`
  display: flex;
  gap: 2.6rem;
  position: fixed;
  bottom: 6.5rem;
  z-index: 1;
`;

const LeftEffects = styled(EffectControlContainer)`
  left: 26.5rem;
`;

const RightEffects = styled(EffectControlContainer)`
  right: 26.5rem;
`;

const EffectKnob = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    width: 2.4rem;
    height: auto;
    cursor: pointer;
    transition: transform 0.1s ease-out;
    transform: rotate(${(props) => props.$rotation || 0}deg);
  }

  span {
    font-size: 0.6rem;
    color: var(--green-04);
    margin-top: 0.5rem;
    font-family: "Zen Dots", sans-serif;
  }
`;

const Record = ({ onPrev, onNext, onComplete }) => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState("");

  const synthRef = useRef(null);
  const playSoundRef = useRef(() => {});

  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const recordingTimerRef = useRef(null);

  const [reverbIntensity, setReverbIntensity] = useState(0);
  const [delayIntensity, setDelayIntensity] = useState(0);
  const [chorusIntensity, setChorusIntensity] = useState(0);
  const [distortionIntensity, setDistortionIntensity] = useState(0);

  // Tone.js 이펙트 Ref
  const reverbRef = useRef(null);
  const delayRef = useRef(null);
  const chorusRef = useRef(null);
  const distortionRef = useRef(null);

  useEffect(() => {
    const initTone = async () => {
      try {
        if (Tone.context.state !== "running") {
          await Tone.start();
          console.log("Tone.js started successfully");
        }

        reverbRef.current = new Tone.Reverb({ decay: 2, wet: 0 }).toDestination();
        delayRef.current = new Tone.PingPongDelay({ delayTime: "8n", feedback: 0.2, wet: 0 }).toDestination();
        chorusRef.current = new Tone.Chorus(4, 2.5, 0.5);
        distortionRef.current = new Tone.Distortion(0);

        let instrument = 'piano';
        try {
          const saved = localStorage.getItem('instrument');
          if (saved === 'guitar' || saved === 'piano') instrument = saved;
        } catch {}

        if (instrument === 'guitar') {
          // 기타: 샘플러 사용 (public/Guitar/*.wav). 실패 시 플럭신스로 폴백
          try {
            const sampler = new Tone.Sampler({
              urls: {
                C4: "./Guitar/C.wav",
                D4: "./Guitar/D.wav",
                E4: "./Guitar/E.wav",
                F4: "./Guitar/F.wav",
                G4: "./Guitar/G.wav",
                A4: "./Guitar/A.wav",
                B4: "./Guitar/B.wav"
              }
            });
            await sampler.loaded;
            synthRef.current = sampler.chain(
              reverbRef.current,
              delayRef.current,
              chorusRef.current,
              distortionRef.current,
              Tone.Destination
            );
          } catch (e) {
            synthRef.current = new Tone.PluckSynth({
              attackNoise: 4,
              dampening: 6000,
              resonance: 1.0
            }).chain(
              reverbRef.current,
              delayRef.current,
              chorusRef.current,
              distortionRef.current,
              Tone.Destination
            );
          }
        } else {
          // 피아노: 기본 Synth (필요 시 샘플러로 교체 가능)
          synthRef.current = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.2, sustain: 0.2, release: 1.2 }
          }).chain(
            reverbRef.current,
            delayRef.current,
            chorusRef.current,
            distortionRef.current,
            Tone.Destination
          );
        }

        playSoundRef.current = (prediction) => {
          if (!prediction) return;
          const notes = {
            Do: "C4",
            Re: "D4",
            Mi: "E4",
            Fa: "F4",
            Sol: "G4",
            La: "A3",
            Ti: "Bb3"
          };
          const note = notes[prediction];
          if (note && synthRef.current) {
            synthRef.current.triggerAttackRelease(note, "4n");
          }
        };
      } catch (error) {
        console.error("Tone.js initialization error:", error);
      }
    };
    initTone();
  }, []);

  // 이펙트 강도 변화
  useEffect(() => {
    if (reverbRef.current) reverbRef.current.set({ wet: reverbIntensity / 100 });
  }, [reverbIntensity]);

  useEffect(() => {
    if (delayRef.current)
      delayRef.current.set({
        wet: delayIntensity / 100,
        feedback: Math.min(0.8, (delayIntensity / 100) * 0.7)
      });
  }, [delayIntensity]);

  useEffect(() => {
    if (chorusRef.current) chorusRef.current.set({ wet: chorusIntensity / 100 });
  }, [chorusIntensity]);

  useEffect(() => {
    if (distortionRef.current)
      distortionRef.current.set({ distortion: (distortionIntensity / 100) * 0.8 });
  }, [distortionIntensity]);

  const cycleIntensity = (setter, current) => {
    const next = current < 100 ? current + 25 : 0;
    setter(next);
  };

  const captureAndSend = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      let detectedLabel =
        (data.prediction && data.prediction[0]?.label) ||
        data.label ||
        (typeof data === "string" ? data : "");

      if (detectedLabel) {
        setPrediction(detectedLabel);
        playSoundRef.current(detectedLabel);
        return detectedLabel;
      }
    } catch (err) {
      console.error("Prediction error:", err.message);
      setPrediction("");
    }
    return "";
  }, []);

  useEffect(() => {
    if (isRecording) return;
    const interval = setInterval(captureAndSend, 1500);
    return () => clearInterval(interval);
  }, [captureAndSend, isRecording]);

  // 🎵 BPM 제거 → 1.5초 간격 고정 녹음
  const startRecording = useCallback(() => {
    if (isRecording) return;
    const intervalMs = 1200;
    setRecordedNotes([]);
    setIsRecording(true);

    let ticks = 0;
    recordingTimerRef.current = setInterval(async () => {
      try {
        const label = await captureAndSend();
        setRecordedNotes((prev) => [...prev, label || "rest"]);
      } catch (e) {
        setRecordedNotes((prev) => [...prev, "rest"]);
      }
      ticks += 1;
      if (ticks >= 32) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
        setIsRecording(false);
      }
    }, intervalMs);
  }, [isRecording, captureAndSend]);

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    };
  }, []);


  return (
    <Overlay>
      <Label>( Recording )</Label>

      <LeftHand>
        {["C", "D", "E", "F"].map((note) => (
          <HandItem key={note}>
            <img src={`/images/hands/${note}.svg`} alt={note} />
          </HandItem>
        ))}
      </LeftHand>

      <RightHand>
        {["G", "A", "B", "C2"].map((note) => (
          <HandItem key={note}>
            <img src={`/images/hands/${note}.svg`} alt={note} />
          </HandItem>
        ))}
      </RightHand>

      <WebcamContainer>
          <Webcam
            ref={webcamRef}
            mirrored={true}
            audio={false}
            screenshotFormat="image/jpeg"
            style={{ width: "100%", height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white"
            }}
          >
            {prediction && <h1>{prediction}</h1>}
          </div>
        </WebcamContainer>

      <ButtonBg src="/images/buttonBg.svg" alt="Button bg" />

      {/* 🎵 단순 녹음 상태 표시 */}
      <div
        style={{
          position: "fixed",
          bottom: "11.5rem",
          display: "flex",
          gap: "0.8rem",
          alignItems: "center",
          fontFamily: "timeline-210, sans-serif",
          fontWeight: "400",
          fontStyle: "normal",
          color: "var(--neutral-04)"
        }}
      >
        <span>
          {isRecording ? `녹음중... ${recordedNotes.length}/32` : "대기 중"}
        </span>
      </div>

      {/* Left Side Effects */}
      <LeftEffects>
        <EffectKnob
          $rotation={reverbIntensity * 3.6}
          onClick={() => cycleIntensity(setReverbIntensity, reverbIntensity)}
        >
          <img src="/images/effect.svg" alt="Reverb Knob" />
          <span>Reverb</span>
        </EffectKnob>

        <EffectKnob
          $rotation={chorusIntensity * 3.6}
          onClick={() => cycleIntensity(setChorusIntensity, chorusIntensity)}
        >
          <img src="/images/effect.svg" alt="Chorus Knob" />
          <span>Chorus</span>
        </EffectKnob>
      </LeftEffects>

      {/* 중앙 버튼 */}
      <ButtonContainer>
  {/* 이전 화면으로 돌아가기 */}
  <img
    src="/images/button1.svg"
    alt="Prev"
    onClick={onPrev ? onPrev : () => console.log("Prev clicked")}
    style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
  />

  {/* 녹음 시작 */}
  <img
    src="/images/button2.svg"
    alt="Record"
    onClick={startRecording}
    style={{ cursor: "pointer", width: "4rem", height: "auto" }}
  />

  {/* 다음 화면 (Score) */}
  <img
    src="/images/button3.svg"
    alt="Next"
    onClick={() => {
      if (onComplete && recordedNotes.length > 0) {
        onComplete(recordedNotes);
      }
    }}
    style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
  />
</ButtonContainer>

      {/* Right Side Effects */}
      <RightEffects>
        <EffectKnob
          $rotation={delayIntensity * 3.6}
          onClick={() => cycleIntensity(setDelayIntensity, delayIntensity)}
        >
          <img src="/images/effect.svg" alt="Delay Knob" />
          <span>Delay</span>
        </EffectKnob>

        <EffectKnob
          $rotation={distortionIntensity * 3.6}
          onClick={() => cycleIntensity(setDistortionIntensity, distortionIntensity)}
        >
          <img src="/images/effect.svg" alt="Distortion Knob" />
          <span>Distortion</span>
        </EffectKnob>
      </RightEffects>

      {!isRecording && recordedNotes.length === 32 && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            color: "var(--green-04)",
            fontFamily: "Zen Dots, sans-serif",
            fontSize: "0.8rem"
          }}
        >
          <span>녹음 완료!</span>
        </div>
      )}
    </Overlay>
  );
};

export default Record;
