import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";
import RecordingDetailModal from "../components/RecordingDetailModal";
import Loading from "../components/Loading";

// -------------------- STYLES -----------------------

const Overlay = styled.div`
  position: fixed;
  top: 81px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 81px);
  background: var(--background-1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
  filter: ${(props) => (props.isBlurred ? "blur(5rem)" : "none")};
  transition: filter 0.1s ease;


  @media (max-width: 768px) {
    top: 71px
  }
`;

const Label = styled.h1`
  font-size: 3rem;
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  color: var(--background-2);
  margin: 4rem auto;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

`;

const LPGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  width: 100%;
  padding: 2rem;
  justify-items: center;

  @media (min-width: 1920px) and (max-width: 2560px) {
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(3rem, 3vw, 5rem);
    padding: clamp(2rem, 2vw, 3rem);
  }

  @media (min-width: 2560px) {
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(4rem, 4vw, 6rem);
    padding: clamp(2.5rem, 2.5vw, 4rem);
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  /* ⭐ 여기 수정됨: 모바일에서 LP 2개씩 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  /* ⭐ 초소형 화면(예: 400px 이하)에서는 다시 1열 */
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LPWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 22rem;  /* 기본 최대 크기 */
  cursor: pointer;
  transition: transform 0.3s ease;
  aspect-ratio: 1;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
  }

  /* 큰 화면 (3~4개 컬럼) */
  @media (min-width: 1920px) {
    max-width: 26rem;
  }

  /* 1400px ~ 768px (2컬럼) */
  @media (max-width: 1400px) {
    max-width: 20rem;
  }

  /* 모바일 – 2컬럼일 때 사이즈 자동 늘림 */
  @media (max-width: 768px) {
    max-width: 18rem;
  }

  /* 초소형 – 1컬럼 → 100% 꽉 차게 */
  @media (max-width: 420px) {
    max-width: 90%;
  }
`;




const LPImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const LPImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NameCover = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: white;
  padding: 1.5rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  ${LPWrapper}:hover & {
    transform: translateY(100%);
  }
`;

const UserIdLabel = styled.div`
  font-family: "Zen Dots", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--background-2);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

`;

const StaffContainer = styled.div`
  position: relative;
  width: 100%;
  height: 3.5rem;
  margin-top: auto;

  
`;

const Staff = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to bottom,
        var(--background-2) 0%,
        var(--background-2) 1px,
        transparent 1px,
        transparent calc(25% - 0.5px),
        var(--background-2) calc(25% - 0.5px),
        var(--background-2) calc(25% + 0.5px),
        transparent calc(25% + 0.5px),
        transparent calc(50% - 0.5px),
        var(--background-2) calc(50% - 0.5px),
        var(--background-2) calc(50% + 0.5px),
        transparent calc(50% + 0.5px),
        transparent calc(75% - 0.5px),
        var(--background-2) calc(75% - 0.5px),
        var(--background-2) calc(75% + 0.5px),
        transparent calc(75% + 0.5px),
        transparent calc(100% - 1px),
        var(--background-2) calc(100% - 1px),
        var(--background-2) 100%
      );
    opacity: 0.4;
  }

`;

const NoteImage = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;

// -------------------- COMPONENT -----------------------

const Archive = ({ onLPClick }) => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState(null);

  // ---------------- SOUND ----------------
  const hoverSound = useRef(null);
  const clickSound = useRef(null);

  // 오디오 언락
  useEffect(() => {
    hoverSound.current = new Audio("/sounds/hover4.mp3");
    clickSound.current = new Audio("/sounds/click2.mp3");

    const unlock = () => {
      hoverSound.current.play().then(() => {
        hoverSound.current.pause();
        hoverSound.current.currentTime = 0;
      });
      clickSound.current.play().then(() => {
        clickSound.current.pause();
        clickSound.current.currentTime = 0;
      });

      window.removeEventListener("click", unlock);
    };

    window.addEventListener("click", unlock, { once: true });
  }, []);

  // ---------------- DATA FETCH ----------------
  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("Recording")
        .select(`
          id,
          user_id,
          notes,
          image_url,
          file_url,
          created_at,
          lp_color,
          User:user_id (
            id,
            name,
            name_positions,
            name_color
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecordings(data || []);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      alert("녹음 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  const handleLPClick = (recording) => {
    clickSound.current?.play();
    setSelectedRecording(recording);
    onLPClick?.(recording);
  };

  const handleCloseModal = () => {
    setSelectedRecording(null);
  };

  const renderUserNameOnStaff = (userName, namePositions = null, nameColor = "pink") => {
  if (!userName) return null;

  const chars = userName.toLowerCase().split("").slice(0, 10);

  // ======================
  // 📌 1) 모바일/데스크탑 반응형 스케일 값 자동 계산
  // ======================
  const isMobile = window.innerWidth <= 768;
  const scale = isMobile ? 0.72 : 1; 
  const spacingRem = 2.0 * scale;

  const totalWidthRem = (chars.length - 1) * spacingRem;

  return chars.map((char, index) => {

    // ======================
    // 📌 2) X축 간격 (모바일에서는 좁게)
    // ======================
    const x = (index * spacingRem) - (totalWidthRem / 2);

    // ======================
    // 📌 3) Y축 위치 (모바일에서 살짝 중앙으로 당겨주기)
    // ======================
    const baseY = namePositions?.[index] ?? 0;
    const yPercent = baseY * scale + 50;

    // ======================
    // 📌 4) 글자별 크기 반응형
    // ======================
    const small = ["a", "e", "i", "m", "n", "r", "v"].includes(char);
    const h = (small ? 2.0 : 2.7) * scale + "rem";

    // ======================
    // 📌 5) 폴더/파일명
    // ======================
    const folder = nameColor === "pink" ? "notes" : "notes_b";
    const suffix = nameColor === "pink" ? "" : "_b";

    return (
      <NoteImage
        key={index}
        src={`./images/${folder}/${char}${suffix}.png`}
        style={{
          left: `calc(50% + ${x}rem)`,
          top: `${yPercent}%`,
          height: h,
        }}
      />
    );
  });
};

  const getLPImagePath = (color) => {
    const map = {
      blue: "/images/LP_Blue.svg",
      red: "/images/LP_Red.svg",
      green: "/images/LP_Green.svg",
    };
    return map[color?.toLowerCase()] || "/images/LP_Blue.svg";
  };

  const formatUserId = (id) => id ? `( ${String(id).padStart(2, "0")} )` : "( -- )";

  if (loading) {
    return (
      <Overlay>
        <Label>( Archive )</Label>
        <Loading />
      </Overlay>
    );
  }

  return (
    <>
      <Overlay isBlurred={!!selectedRecording}>
        <Label>( Archive )</Label>

        {recordings.length === 0 ? (
          <div style={{ color: "var(--neutral-04)" }}>아직 저장된 녹음이 없습니다.</div>
        ) : (
          <LPGrid>
            {recordings.map((rec) => {
              const lp = getLPImagePath(rec.lp_color);

              return (
                <LPWrapper
                  key={rec.id}
                  onMouseEnter={() => {
                    if (!hoverSound.current) return;
                    hoverSound.current.currentTime = 0; // 시작점으로
                    hoverSound.current.volume = 0.3;   // 원하면 볼륨도 줄임
                    hoverSound.current.play();
                    setTimeout(() => {
                      hoverSound.current.pause();       // 150ms 후 강제로 멈춤 → 짧은 소리
                      hoverSound.current.currentTime = 0;
                    }, 300);
                  }}
                  
                  onClick={() => handleLPClick(rec)}
                >
                  <LPImageContainer>
                    <LPImage src={lp} alt="LP" />
                  </LPImageContainer>

                  <NameCover>
                    <UserIdLabel>{formatUserId(rec.user_id)}</UserIdLabel>

                    <StaffContainer>
                      <Staff>
                        {renderUserNameOnStaff(
                          rec.User?.name,
                          rec.User?.name_positions,
                          rec.User?.name_color
                        )}
                      </Staff>
                    </StaffContainer>
                  </NameCover>
                </LPWrapper>
              );
            })}
          </LPGrid>
        )}
      </Overlay>

      {selectedRecording && (
        <RecordingDetailModal recording={selectedRecording} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Archive;
