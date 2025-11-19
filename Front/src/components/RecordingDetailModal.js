import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import * as Tone from "tone";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled.div`
  position: relative;
  background: var(--background-1);
  border-radius: 1rem;
  padding: 5rem 4rem;
  max-width: 70rem;
  width: 100%;
  height: 78vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  @media (min-width: 1920px) and (max-width: 2560px) {
    height: 55vh;
  }

  @media (min-width: 2560px) {
    height: 55vh;
  }

  @media (max-width: 768px) {
    padding: 3.5rem 1.2rem 2rem 1.2rem;
    height: 40vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--neutral-04);
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.7rem;
    top: 1rem;
    left: 1rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,
    var(--background-3) 50%
  );

  padding: 1rem 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.3rem;
    padding: 0.7rem 1rem;
  }
`;

const TitleSvg = styled.img`
  height: 3rem;

  @media (max-width: 768px) {
    height: 1.0rem;
  }
`;

const NameNotesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const NoteImage = styled.img`
  transition: height 0.3s ease;


  &.note-small {
    height: 2.8rem;
  }

  &.note-large {
    height: 3.5rem;
  }

  @media (max-width: 768px) {
    &.note-small {
      height: 0.8rem !important;
    }
    &.note-large {
      height: 1.0rem !important;
    }
  }

  /* @media (max-width: 480px) {
    &.note-small {
      height: 1.2rem !important;
    }
    &.note-large {
      height: 1.5rem !important;
    }
  } */
`;

const UserIdLabel = styled.span`
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  color: var(--background-2);
  margin-top: 2rem;
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.4rem;
  }
`;

const Timestamp = styled.div`
  font-family: "Zen Dots";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  color: var(--green-04);
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    font-size: 0.3rem;
  }
`;

const SheetMusicContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const SheetMusicImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: -2rem;

  @media (max-width: 768px) {
    margin-top: -1rem;
  }
`;

const AudioControlsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const ButtonBg = styled.img`
  width: 20rem;
  height: auto;
  z-index: 0;
  position: absolute;
  left: 50%;
  bottom: -4rem;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    width: 10rem;
    bottom: -2.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  position: absolute;
  left: 50%;
  bottom: -3.5rem;
  transform: translateX(-50%);
  z-index: 1;

  .rewind-btn {
    width: 1.87rem;
  }
  .play-btn {
    width: 4rem;
  }
  .forward-btn {
    width: 1.87rem;
  }

  @media (max-width: 768px) {
    bottom: -2.2rem;
    gap: 1.5rem;

    .rewind-btn,
    .forward-btn {
      width: 0.935rem;
    }
    .play-btn {
      width: 2rem;
    }
  }
`;

const RecordingDetailModal = ({ recording, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);
  const playbackSequenceRef = useRef(null);
  const currentNoteIndexRef = useRef(0);
  const playbackTimeoutRef = useRef(null);

  const clearPlaybackTimer = () => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const initTone = async () => {
      try {
        if (Tone.context.state !== "running") {
          await Tone.start();
        }

        const instrument = recording?.notes?.instrument || "piano";

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
            synthRef.current = sampler;
          } catch (e) {
            synthRef.current = new Tone.PluckSynth({
              attackNoise: 4,
              dampening: 6000,
              resonance: 1.0
            });
          }
        } else {
          synthRef.current = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.2, sustain: 0.2, release: 1.2 }
          });
        }

        if (recording?.notes?.effects) {
          const effects = recording.notes.effects;
          const reverb = new Tone.Reverb({ decay: 2, wet: (effects.reverb || 0) / 100 });
          const delay = new Tone.PingPongDelay({ 
            delayTime: "8n", 
            feedback: 0.2, 
            wet: (effects.delay || 0) / 100 
          });
          const chorus = new Tone.Chorus(4, 2.5, 0.5).set({ wet: (effects.chorus || 0) / 100 });
          const distortion = new Tone.Distortion((effects.distortion || 0) / 100 * 0.8);

          synthRef.current = synthRef.current.chain(
            reverb,
            delay,
            chorus,
            distortion,
            Tone.Destination
          );
        } else {
          synthRef.current = synthRef.current.toDestination();
        }
      } catch (error) {
        console.error("Tone.js initialization error:", error);
      }
    };

    initTone();

    return () => {
      clearPlaybackTimer();
      if (playbackSequenceRef.current) {
        playbackSequenceRef.current.dispose();
      }
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, [recording]);

  const playNotesSequence = async () => {
    if (!synthRef.current || !recording?.notes?.sequence) return;

    try {
      if (Tone.context.state !== "running") {
        await Tone.start();
      }

      const notes = recording.notes.sequence;
      const noteDuration = "4n"; 
      const bpm = recording?.notes?.tempo || 80;
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.stop();
      Tone.Transport.cancel();

      if (playbackSequenceRef.current) {
        playbackSequenceRef.current.dispose();
      }

      currentNoteIndexRef.current = 0;

      const noteMap = {
        Do: "C4",
        Re: "D4",
        Mi: "E4",
        Fa: "F4",
        Sol: "G4",
        La: "A4",
        Ti: "B4"
      };

      const sequence = new Tone.Sequence((time, note) => {
        if (note && note !== "rest" && note !== "no hand" && noteMap[note]) {
          const toneNote = noteMap[note];
          synthRef.current.triggerAttackRelease(toneNote, noteDuration, time);
        }
        currentNoteIndexRef.current++;
      }, notes, noteDuration);

      sequence.start(0);
      playbackSequenceRef.current = sequence;
      Tone.Transport.start();

      const noteSeconds = Tone.Time(noteDuration).toSeconds();
      const totalDuration = noteSeconds * notes.length;

      clearPlaybackTimer();
      playbackTimeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
        currentNoteIndexRef.current = 0;
        if (playbackSequenceRef.current) {
          playbackSequenceRef.current.stop();
        }
        Tone.Transport.stop();
        playbackTimeoutRef.current = null;
      }, totalDuration * 1000);

    } catch (error) {
      console.error("Playback error:", error);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      Tone.Transport.stop();
      clearPlaybackTimer();
      if (playbackSequenceRef.current) {
        playbackSequenceRef.current.stop();
        playbackSequenceRef.current.dispose();
        playbackSequenceRef.current = null;
      }
      setIsPlaying(false);
      currentNoteIndexRef.current = 0;
    } else {
      setIsPlaying(true);
      await playNotesSequence();
    }
  };

  const handleRewind = () => {
    Tone.Transport.stop();
    clearPlaybackTimer();
    if (playbackSequenceRef.current) {
      playbackSequenceRef.current.stop();
      playbackSequenceRef.current.dispose();
      playbackSequenceRef.current = null;
    }
    currentNoteIndexRef.current = Math.max(0, currentNoteIndexRef.current - 4);
    setIsPlaying(false);
  };

  const handleForward = () => {
    Tone.Transport.stop();
    clearPlaybackTimer();
    if (playbackSequenceRef.current) {
      playbackSequenceRef.current.stop();
      playbackSequenceRef.current.dispose();
      playbackSequenceRef.current = null;
    }
    const notes = recording?.notes?.sequence || [];
    currentNoteIndexRef.current = Math.min(notes.length, currentNoteIndexRef.current + 4);
    setIsPlaying(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const renderUserNameNotes = (userName, nameColor = "pink") => {
    if (!userName) return null;
    
    const nameArray = userName.toLowerCase().split("");
    const colorFolder = nameColor === "pink" ? "notes" : "notes_b";
    const suffix = nameColor === "pink" ? "" : "_b";

    return nameArray.map((char, index) => {
      const noteType = ["a", "e", "i", "m", "n", "r", "v"].includes(char)
        ? "small"
        : "large";

      return (
        <NoteImage
          key={`${char}-${index}`}
          src={`./images/${colorFolder}/${char}${suffix}.png`}
          alt={char}
          className={`note-${noteType}`}
        />
      );
    });
  };

  const userName = recording.User?.name || "Unknown";
  const userId = recording.user_id;
  const nameColor = recording.User?.name_color || "pink";

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        
        <TitleContainer>
          <TitleSvg src="/images/art.svg" alt="art" />
          <NameNotesContainer>
            {renderUserNameNotes(userName, nameColor)}
          </NameNotesContainer>
          <TitleSvg src="/images/ist.svg" alt="IST" />
          <UserIdLabel>({String(userId).padStart(2, "0")})</UserIdLabel>
        </TitleContainer>

        <Timestamp>{formatDate(recording.created_at)}</Timestamp>

        <SheetMusicContainer>
          {recording.image_url ? (
            <SheetMusicImage src={recording.image_url} alt="Sheet Music" />
          ) : (
            <div style={{ color: "var(--neutral-04)" }}>악보 이미지가 없습니다.</div>
          )}
        </SheetMusicContainer>

        <AudioControlsWrapper>
          <ButtonBg src="/images/buttonBg.svg" alt="Button bg" />
          <ButtonContainer>
            <img 
              className="rewind-btn"
              src="/images/button1.svg"
              alt="Rewind"
              onClick={handleRewind}
            />
            <img 
              className="play-btn"
              src={isPlaying ? "/images/button5_pause.svg" : "/images/button5.svg"}
              alt={isPlaying ? "Pause" : "Play"}
              onClick={togglePlayPause}
            />
            <img 
              className="forward-btn"
              src="/images/button3.svg"
              alt="Forward"
              onClick={handleForward}
            />
          </ButtonContainer>
        </AudioControlsWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RecordingDetailModal;