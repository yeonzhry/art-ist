import React, { useRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import * as Tone from "tone";
import { supabase } from '../supabase';
import PlayControlButtons from "./PlayControlButtons";

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
  const [userId, setUserId] = useState(null);

  const synthRef = useRef(null);
  const playSoundRef = useRef(() => {});
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false); // 저장 완료 플래그
  const [savedRecordingId, setSavedRecordingId] = useState(null); // 저장된 녹음 ID
  const recordingTimerRef = useRef(null);

  const [reverbIntensity, setReverbIntensity] = useState(0);
  const [delayIntensity, setDelayIntensity] = useState(0);
  const [chorusIntensity, setChorusIntensity] = useState(0);
  const [distortionIntensity, setDistortionIntensity] = useState(0);

  const reverbRef = useRef(null);
  const delayRef = useRef(null);
  const chorusRef = useRef(null);
  const distortionRef = useRef(null);

  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(parseInt(storedUserId));
        console.log("User ID loaded:", storedUserId);
      }
      
      // 이전에 저장된 녹음 ID 확인
      const previousRecordingId = localStorage.getItem('current_recording_id');
      if (previousRecordingId) {
        console.log("이전 녹음 ID 발견:", previousRecordingId);
        setSavedRecordingId(previousRecordingId);
      }
    } catch (error) {
      console.error("Failed to fetch user_id:", error);
    }
  }, []);
  
  // 컴포넌트 마운트 시 이전 녹음 삭제
  useEffect(() => {
    const deletePreviousRecording = async () => {
      const previousRecordingId = localStorage.getItem('current_recording_id');
      if (previousRecordingId && userId) {
        try {
          console.log("이전 녹음 삭제 시도:", previousRecordingId);
          
          // DB에서 녹음 정보 가져오기 (파일 URL 확인용)
          const { data: recordingData, error: fetchError } = await supabase
            .from("Recording")
            .select("file_url, id")
            .eq("id", previousRecordingId)
            .eq("user_id", userId)
            .single();
          
          if (fetchError) {
            console.log("이전 녹음을 찾을 수 없음 (이미 삭제되었거나 존재하지 않음):", fetchError.message);
          } else if (recordingData) {
            // 스토리지에서 파일 삭제
            if (recordingData.file_url) {
              try {
                const fileName = recordingData.file_url.split('/').pop();
                if (fileName) {
                  const { error: deleteError } = await supabase.storage
                    .from("recordings")
                    .remove([fileName]);
                  
                  if (deleteError) {
                    console.error("파일 삭제 실패:", deleteError);
                  } else {
                    console.log("파일 삭제 완료:", fileName);
                  }
                }
              } catch (err) {
                console.error("파일 삭제 중 오류:", err);
              }
            }
            
            // DB에서 녹음 삭제
            const { error: deleteError } = await supabase
              .from("Recording")
              .delete()
              .eq("id", previousRecordingId)
              .eq("user_id", userId);
            
            if (deleteError) {
              console.error("DB 삭제 실패:", deleteError);
            } else {
              console.log("이전 녹음 삭제 완료:", previousRecordingId);
            }
          }
          
          // localStorage에서 이전 녹음 ID 제거
          localStorage.removeItem('current_recording_id');
          setSavedRecordingId(null);
        } catch (err) {
          console.error("이전 녹음 삭제 중 오류:", err);
        }
      }
    };
    
    if (userId) {
      deletePreviousRecording();
    }
  }, [userId]);

  useEffect(() => {
    const initTone = async () => {
      try {
        if (Tone.context.state !== "running") {
          await Tone.start();
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
            La: "A4",
            Ti: "B4"
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
      const response = await fetch("http://127.0.0.1:8000/api/predict", {
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

  const startAudioRecording = async () => {
    try {
      const dest = Tone.getContext().createMediaStreamDestination();
      
      if (synthRef.current) {
        synthRef.current.connect(dest);
      }
      
      const stream = dest.stream;
      
      if (stream.getAudioTracks().length === 0) {
        console.error("No audio tracks in stream");
        return;
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start(100);
      console.log("Audio recording started");
    } catch (error) {
      console.error("Failed to start audio recording:", error);
    }
  };

  const stopAudioRecording = () => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        if (audioChunksRef.current.length === 0) {
          resolve(null);
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
        console.log("Audio blob created, size:", audioBlob.size, "bytes");
        resolve(audioBlob);
      };

      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error("Error stopping recorder:", error);
        resolve(null);
      }
    });
  };

  const saveToSupabase = async (notes, audioBlob) => {
    // 중복 저장 방지
    if (isSaving || hasSaved) {
      console.log("Already saving or saved, skipping...");
      return;
    }

    if (!userId) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }
  
    setIsSaving(true);
  
    try {
      let fileUrl = null;
  
      if (audioBlob && audioBlob.size > 0) {
        console.log("Uploading audio, size:", audioBlob.size);
  
        const fileName = `${Date.now()}.webm`;
  
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("recordings")
          .upload(fileName, audioBlob, {
            contentType: "audio/webm",
            upsert: false
          });
  
        if (uploadError) {
          console.error("Upload error:", uploadError);
          alert("오디오 업로드 실패: " + uploadError.message);
          setIsSaving(false);
          return;
        } else {
          console.log("Upload success:", uploadData);
  
          const { data: urlData } = supabase.storage
            .from("recordings")
            .getPublicUrl(uploadData.path);
  
          fileUrl = urlData.publicUrl;
          console.log("Public URL:", fileUrl);
        }
      }
  
      const instrument = localStorage.getItem("instrument") || "piano";
  
      const recordingData = {
        user_id: userId,
        notes: {
          sequence: notes,
          effects: {
            reverb: reverbIntensity,
            delay: delayIntensity,
            chorus: chorusIntensity,
            distortion: distortionIntensity
          },
          instrument: instrument
        },
        file_url: fileUrl
      };
  
      const { data, error } = await supabase
        .from("Recording")
        .insert([recordingData])
        .select();

      if (error) {
        console.error("DB insert error:", error);
        alert("DB 저장 실패: " + error.message);
        setIsSaving(false);
        return;
      } else {
        console.log("Recording saved:", data);
        const savedId = data[0]?.id;
        
        if (savedId) {
          // 저장된 녹음 ID를 localStorage에 저장 (재녹음 시 삭제용)
          localStorage.setItem('current_recording_id', savedId.toString());
          setSavedRecordingId(savedId.toString());
        }
        
        setHasSaved(true); // 저장 완료 표시
        setIsSaving(false); // 저장 완료
        console.log("✅ 녹음 저장 완료. ID:", savedId);
        
        // 저장이 완료된 후 자동으로 Score로 이동
        // 사용자가 Next 버튼을 클릭할 수도 있으므로, 여기서 자동으로 이동하지 않고
        // 사용자가 Next 버튼을 클릭하거나 자동 이동을 원하면 onComplete 호출
        // 자동 이동을 원하지 않으면 주석 처리
        setTimeout(() => {
          if (onComplete && notes && notes.length > 0) {
            onComplete(notes);
          }
        }, 500);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("저장 중 오류 발생.");
      setIsSaving(false);
      setHasSaved(false); // 저장 실패 시 플래그 리셋
    }
  };

  const startRecording = useCallback(async () => {
    if (isRecording || isSaving) return;
    

    setRecordedNotes([]);
    setIsRecording(true);
    setHasSaved(false); // 녹음 시작 시 플래그 초기화
    setIsSaving(false); // 저장 상태도 초기화
    
    const intervalMs = 1200;

    await startAudioRecording();

    // 녹음된 노트를 직접 추적하기 위한 배열
    const notesArray = [];
    
    let ticks = 0;
    recordingTimerRef.current = setInterval(async () => {
      try {
        const label = await captureAndSend();
        const note = label || "rest";
        notesArray.push(note);
        setRecordedNotes([...notesArray]);
      } catch (e) {
        const note = "rest";
        notesArray.push(note);
        setRecordedNotes([...notesArray]);
      }
      ticks += 1;
      
      if (ticks >= 32) {
        // 32틱일 때만 finalNotes 생성
        if (ticks === 32) {
          // 32개의 노트가 확실히 기록되었는지 확인
          const finalNotes = notesArray.length === 32 
            ? [...notesArray] 
            : [...notesArray, ...Array(32 - notesArray.length).fill("rest")].slice(0, 32);
          
          // 상태 업데이트
          setRecordedNotes(finalNotes);
        }
        
        // 34틱까지 기다렸다가 녹음 중단 (마지막 음 재생 시간 확보)
        if (ticks >= 33) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
          setIsRecording(false);
          
          const audioBlob = await stopAudioRecording();
          
          // 32개만 저장 (혹시 모를 추가 노트 제거)
          const finalNotes = notesArray.slice(0, 32);
          const paddedNotes = finalNotes.length === 32 
            ? finalNotes 
            : [...finalNotes, ...Array(32 - finalNotes.length).fill("rest")];
          
          setTimeout(() => {
            saveToSupabase(paddedNotes, audioBlob);
          }, 300);
        }
        return; // 32 이후에는 더 이상 노트 추가하지 않음
      }
    
    }, intervalMs);
  }, [isRecording, captureAndSend, userId, reverbIntensity, delayIntensity, chorusIntensity, distortionIntensity]);

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
          {isSaving ? "저장 중..." : isRecording ? `녹음중... ${recordedNotes.length}/32` : "대기 중"}
        </span>
      </div>

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

      <PlayControlButtons
        buttons={[
          {
            src: "/images/button1.svg",
            alt: "Prev",
            width: "1.87rem",
            onClick: onPrev ? onPrev : () => console.log("Prev clicked"),
          },
          {
            src: "/images/button2.svg",
            alt: "Record",
            width: "4rem",
            onClick: startRecording,
            disabled: isRecording || isSaving,
          },
          {
            src: "/images/button3.svg",
            alt: "Next",
            width: "1.87rem",
            onClick: () => {
              if (onComplete && recordedNotes.length > 0 && !isSaving) {
                onComplete(recordedNotes);
              }
            },
            disabled: isSaving,
          },
        ]}
      />

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

      {!isRecording && !isSaving && recordedNotes.length === 32 && (
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
        </div>
      )}
    </Overlay>
  );
};

export default Record;