import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const ButtonBg = styled.img`
  width: 20rem;
  height: auto;
  z-index: 0;
  position: fixed;
  left: 50%;
  bottom: 6rem;
  transform: translateX(-50%);

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(22rem, 12vw, 26rem);
    bottom: clamp(9rem, 8vh, 11rem);
  }

  @media (min-width: 2560px) {
    width: clamp(24rem, 13vw, 28rem);
    bottom: clamp(10rem, 9vh, 12rem);
  }

  @media (max-width: 1400px) {
    bottom: 7rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  position: fixed;
  left: 50%;
  bottom: 6.5rem;
  transform: translateX(-50%);
  z-index: 1;

  @media (min-width: 1920px) and (max-width: 2560px) {
    gap: clamp(3.5rem, 3.5vw, 4rem);
    bottom: clamp(9.5rem, 8.5vh, 11.5rem);
  }

  @media (min-width: 2560px) {
    gap: clamp(4rem, 4vw, 4.5rem);
    bottom: clamp(10.5rem, 9.5vh, 12.5rem);
  }

  @media (max-width: 1400px) {
    bottom: 7.5rem;
    gap: 2.5rem;
  }
`;

const ControlButton = styled.img`
  width: ${({ $width }) => $width || "2rem"};
  height: auto;
  cursor: ${({ $disabled, $disabledCursor }) =>
    $disabled ? $disabledCursor || "not-allowed" : "pointer"};
  opacity: ${({ $disabled, $disabledOpacity }) =>
    $disabled ? $disabledOpacity ?? 0.5 : 1};
  transition: opacity 0.2s ease, transform 0.2s ease;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: ${({ $width }) => {
      const baseWidth = $width || "2rem";
      if (baseWidth === "1.87rem") return "clamp(2rem, 1.2vw, 2.3rem)";
      if (baseWidth === "4rem") return "clamp(4.5rem, 2.5vw, 5rem)";
      return `clamp(calc(${baseWidth} * 1.1), 1.2vw, calc(${baseWidth} * 1.2))`;
    }};
  }

  @media (min-width: 2560px) {
    width: ${({ $width }) => {
      const baseWidth = $width || "2rem";
      if (baseWidth === "1.87rem") return "clamp(2.2rem, 1.3vw, 2.5rem)";
      if (baseWidth === "4rem") return "clamp(5rem, 2.8vw, 5.5rem)";
      return `clamp(calc(${baseWidth} * 1.15), 1.3vw, calc(${baseWidth} * 1.25))`;
    }};
  }

  &:hover:not([disabled]) {
    transform: scale(1.05);
  }

  &:active:not([disabled]) {
    transform: scale(0.95);
  }
`;

const PlayControlButtons = ({
  buttons = [],
  showBackground = true,
  backgroundAlt = "Controls background",
}) => {
  const clickSound = useRef(null);

  // 컴포넌트가 마운트될 때 오디오 준비
  useEffect(() => {
    clickSound.current = new Audio("/sounds/click3.mp3"); // 원하는 사운드
    clickSound.current.volume = 0.5;

    // 브라우저에서 interaction 없으면 play 실패 방지
    const unlock = () => {
      clickSound.current.play().then(() => {
        clickSound.current.pause();
        clickSound.current.currentTime = 0;
      }).catch(() => {});
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock, { once: true });
  }, []);

  if (!buttons.length) return null;

  return (
    <>
      {showBackground && (
        <ButtonBg src="/images/buttonBg.svg" alt={backgroundAlt} />
      )}
      <ButtonContainer>
        {buttons.map(
          (
            {
              src,
              alt,
              onClick,
              width,
              disabled,
              disabledOpacity,
              disabledCursor,
              style,
            },
            index
          ) => (
            <ControlButton
              key={index}
              src={src}
              alt={alt}
              onClick={(event) => {
                if (disabled) {
                  event.preventDefault();
                  return;
                }

                if (clickSound.current) {
                    clickSound.current.currentTime = 0;
                    clickSound.current.play().catch(() => {});
                    
                    // 0.2초 후 강제로 멈춤
                    setTimeout(() => {
                      clickSound.current.pause();
                      clickSound.current.currentTime = 0;
                    }, 200); // 200ms
                  }
                  
                onClick?.(event);
              }}
              $width={width}
              $disabled={disabled}
              $disabledOpacity={disabledOpacity}
              $disabledCursor={disabledCursor}
              style={style}
            />
          )
        )}
      </ButtonContainer>
    </>
  );
};

export default PlayControlButtons;
