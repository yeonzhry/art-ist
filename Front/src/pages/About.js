import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import Header from "../components/Header";
import AnimatedDots from "../components/AnimatedDots";
import AnimatedDots2 from "../components/AnimatedDots2";


const Container = styled.div`
  min-height: 100vh;
  background-color: var(--background-1);
  padding-top: 7rem;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
`;

const Magnifier = styled.div`
  position: fixed;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  display: none;
  overflow: hidden;
  background: var(--background-1);
  transition: opacity 0.2s ease, transform 0.1s ease-out;
  transform: translate(-50%, -50%);
  
  &.active {
    display: block;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    max-width: 1400px;
    padding: 5rem 3rem;
  }

  @media (min-width: 2560px) {
    max-width: 1600px;
    padding: 6rem 4rem;
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    gap: 5rem;
  }

  @media (min-width: 2560px) {
    gap: 6rem;
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Logo = styled.img`
  width: 19rem;
  height: 19rem;
  margin-top: 8rem;
  display: flex;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(18rem, 9vw, 22rem);
    height: clamp(18rem, 9vw, 22rem);
    margin-top: clamp(6rem, 6vh, 10rem);
  }

  @media (min-width: 2560px) {
    width: clamp(20rem, 10vw, 25rem);
    height: clamp(20rem, 10vw, 25rem);
    margin-top: clamp(7rem, 7vh, 12rem);
  }

  @media (max-width: 1400px) {
    width: 15rem;
    height: 15rem;
    margin-top: 2rem;
  }
`;

const ContentBox = styled.div`
  flex: 1;
  margin-left: 5rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    margin-left: clamp(4rem, 3vw, 6rem);
  }

  @media (min-width: 2560px) {
    margin-left: clamp(5rem, 3.5vw, 8rem);
  }

  @media (max-width: 1400px) {
    margin-left: 0;
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    gap: 1.5rem;
  }

  @media (min-width: 2560px) {
    gap: 2rem;
  }
`;

const Title = styled.h2`
  color: var(--neutral-neutral-09);
  font-size: 3rem;
  font-family: "Zen Dots";
  font-weight: 400;
  text-align: center;
  width: 30.5625rem;
  height: 3.625rem;
  background-color: var(--background-3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: clamp(2.5rem, 2.5vw, 3.5rem);
    width: clamp(28rem, 28vw, 35rem);
    height: clamp(3.2rem, 3.2vw, 4.2rem);
  }

  @media (min-width: 2560px) {
    font-size: clamp(3rem, 3vw, 4rem);
    width: clamp(32rem, 32vw, 40rem);
    height: clamp(3.8rem, 3.8vw, 4.8rem);
  }

  @media (max-width: 1400px) {
    font-size: 2.5rem;
    width: 100%;
    max-width: 30rem;
    height: auto;
    padding: 1rem;
  }
`;

const Eyes = styled.img`
  width: 6.75rem;
  height: auto;
  align-items: center;
  justify-content: center;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(6rem, 3.5vw, 8rem);
  }

  @media (min-width: 2560px) {
    width: clamp(7rem, 3.8vw, 9rem);
  }

  @media (max-width: 1400px) {
    width: 5rem;
  }
`;

const Description = styled.p`
  color: var(--neutral-neutral-09);
  font-size: 1rem;
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 2rem;
  width: 42.1875rem;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    font-size: clamp(1rem, 1.1vw, 1.2rem);
    width: clamp(38rem, 38vw, 50rem);
    line-height: clamp(1.8rem, 2vw, 2.4rem);
  }

  @media (min-width: 2560px) {
    font-size: clamp(1.1rem, 1.2vw, 1.4rem);
    width: clamp(42rem, 42vw, 55rem);
    line-height: clamp(2rem, 2.2vw, 2.6rem);
  }

  @media (max-width: 1400px) {
    width: 100%;
    max-width: 42rem;
  }
`;

const DividerImage1 = styled.img`
  width: 15rem;
  margin: -5rem 45rem;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(14rem, 7.5vw, 18rem);
    margin: -5rem auto;
    display: block;
  }

  @media (min-width: 2560px) {
    width: clamp(16rem, 8vw, 20rem);
    margin: -5rem auto;
    display: block;
  }

  @media (max-width: 1400px) {
    width: 12rem;
    margin: -3rem auto;
    display: block;
  }
`;

const DividerImage2 = styled.img`
  width: 15rem;
  margin: -3rem 35rem;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(14rem, 7.5vw, 18rem);
    margin: -3rem auto;
    display: block;
  }

  @media (min-width: 2560px) {
    width: clamp(16rem, 8vw, 20rem);
    margin: -3rem auto;
    display: block;
  }

  @media (max-width: 1400px) {
    width: 12rem;
    margin: -2rem auto;
    display: block;
  }
`;

const AllVideo = styled.video`
  flex-shrink: 0;
  width: 20rem;
  height: 20rem;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(18rem, 10vw, 24rem);
    height: clamp(18rem, 10vw, 24rem);
  }

  @media (min-width: 2560px) {
    width: clamp(22rem, 11vw, 28rem);
    height: clamp(22rem, 11vw, 28rem);
  }

  @media (max-width: 1400px) {
    width: 16rem;
    height: 16rem;
    margin: 2rem auto;
  }
`;

const TeamSection = styled.div`
  display: flex;
  gap: 10rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    gap: clamp(8rem, 6vw, 12rem);
  }

  @media (min-width: 2560px) {
    gap: clamp(10rem, 7vw, 14rem);
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const PhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  flex-shrink: 0;
  margin-top: 12rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    gap: clamp(4rem, 4vw, 6rem);
    margin-top: clamp(10rem, 8vh, 14rem);
  }

  @media (min-width: 2560px) {
    gap: clamp(5rem, 5vw, 7rem);
    margin-top: clamp(11rem, 9vh, 15rem);
  }

  @media (max-width: 1400px) {
    margin-top: 2rem;
    gap: 3rem;
    align-items: center;
  }
`;

const MemberVideo = styled.video`
  width: 14.1875rem;
  height: 14.1875rem;
  border-radius: 50%;
  object-fit: cover;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(13rem, 7vw, 17rem);
    height: clamp(13rem, 7vw, 17rem);
  }

  @media (min-width: 2560px) {
    width: clamp(15rem, 7.5vw, 19rem);
    height: clamp(15rem, 7.5vw, 19rem);
  }

  @media (max-width: 1400px) {
    width: 12rem;
    height: 12rem;
  }
`;

const TeamContent = styled.div`
  flex: 1;
`;

const MemberInfo = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  display: flex;
`;

const Member = styled.div`
  display: block;
  margin-bottom: 8rem;
  cursor: none;
`;

const MemberName = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  color: var(--neutral-neutral-09);
  margin-bottom: -0.5rem;
`;

const MemberInsta = styled.p`
  font-size: 1rem;
  color: var(--neutral-neutral-09);
`;

const MemberDescription = styled.p`
  position: absolute;
  right: 15rem;
  color: var(--neutral-neutral-09);
  font-size: 1rem;
  line-height: 2rem;
  width: 21rem;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    right: clamp(12rem, 8vw, 18rem);
    width: clamp(19rem, 12vw, 25rem);
    font-size: clamp(0.9rem, 1vw, 1.1rem);
  }

  @media (min-width: 2560px) {
    right: clamp(14rem, 9vw, 20rem);
    width: clamp(21rem, 13vw, 28rem);
    font-size: clamp(1rem, 1.1vw, 1.2rem);
  }

  @media (max-width: 1400px) {
    position: static;
    width: 100%;
    margin-top: 1rem;
  }
`;

const Line = styled.div`
  width: 44rem;
  height: 0.18rem;
  background-color: #929292;
  margin: 2rem 0rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(40rem, 40vw, 50rem);
  }

  @media (min-width: 2560px) {
    width: clamp(44rem, 44vw, 55rem);
  }

  @media (max-width: 1400px) {
    width: 100%;
    max-width: 44rem;
  }
`;

const BottomSpacing = styled.div`
  height: 4rem;
`;

export default function About() {
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    
    const handleMouseMove = (e) => {
      // requestAnimationFrame을 사용하여 부드러운 업데이트
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setMagnifierPos({ x: e.clientX, y: e.clientY });

        // 마우스가 확대 가능한 요소 위에 있는지 확인
        const zoomableElements = document.querySelectorAll('img, video, h2, h3');
        let foundElement = null;

        zoomableElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            foundElement = el;
          }
        });

        setTargetElement(foundElement);
        setIsHovering(!!foundElement);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const getMagnifiedContent = () => {
    if (!targetElement) return null;

    const rect = targetElement.getBoundingClientRect();
    const scale = 1.5; // 확대 배율
    const magnifierSize = 200;

    // 마우스 위치를 기준으로 확대할 영역 계산
    const offsetX = (magnifierPos.x - rect.left) * scale - magnifierSize / 2;
    const offsetY = (magnifierPos.y - rect.top) * scale - magnifierSize / 2;

    if (targetElement.tagName === 'IMG') {
      return (
        <img
          src={targetElement.src}
          alt=""
          style={{
            position: 'absolute',
            width: `${rect.width * scale}px`,
            height: `${rect.height * scale}px`,
            left: `-${offsetX}px`,
            top: `-${offsetY}px`,
            pointerEvents: 'none',
          }}
        />
      );
    } else if (targetElement.tagName === 'VIDEO') {
      return (
        <video
          src={targetElement.src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: `${rect.width * scale}px`,
            height: `${rect.height * scale}px`,
            left: `-${offsetX}px`,
            top: `-${offsetY}px`,
            pointerEvents: 'none',
            objectFit: targetElement.style.objectFit || 'cover',
            borderRadius: targetElement.style.borderRadius || '0',
          }}
        />
      );
    } else {
      // 텍스트 요소
      const clone = targetElement.cloneNode(true);
      const styles = window.getComputedStyle(targetElement);
      
      return (
        <div
          dangerouslySetInnerHTML={{ __html: clone.innerHTML }}
          style={{
            position: 'absolute',
            width: `${rect.width * scale}px`,
            left: `-${offsetX}px`,
            top: `-${offsetY}px`,
            fontSize: `${parseFloat(styles.fontSize) * scale}px`,
            lineHeight: styles.lineHeight,
            color: styles.color,
            fontFamily: styles.fontFamily,
            fontWeight: styles.fontWeight,
            textAlign: styles.textAlign,
            backgroundColor: styles.backgroundColor,
            pointerEvents: 'none',
          }}
        />
      );
    }
  };

  return (
    <>
      <Header />
      <Container ref={containerRef}>
        <Magnifier 
          className={isHovering ? 'active' : ''}
          style={{
            left: `${magnifierPos.x}px`,
            top: `${magnifierPos.y}px`,
          }}
        >
          {getMagnifiedContent()}
        </Magnifier>

        <Section>
          <FlexRow>
            <Logo src="./images/about/title.svg" alt="Logo" />
            
            <ContentBox>
              <TitleWrapper>
                <Title>
                  <img src="./images/about/Vector1.svg" style={{marginRight: "1.6rem"}} alt="" />
                  About Work
                  <img src="./images/about/Vector2.svg" style={{marginLeft: "1.6rem"}} alt="" />
                </Title>
                <Eyes src="./images/about/eyes1.svg" alt="eyes1" style={{margin: "-2rem -5rem"}}/>
              </TitleWrapper>
              <Description>
                모션 인식을 통해 사운드를 생성하고 이를 악보로 실시간 기록·저장하는 인터랙티브 콘텐츠이다. 궁극적 목표는 단순한 기술적 구현을 넘어서 악기에 대한 진입 장벽을 낮추고 포용적인 음악 환경을 조성하는 데에 있다. 이는 인간의 가장 기본적인 단위인 몸을 활용하는 신체적 언어인 수어를 기반으로 한다. 물리적 도구와 복잡한 학습을 요구하던 기존의 방식에서 벗어나 간단한 동작만으로 연주 가능한 새로운 방식을 통해 음악에 대한 접근성을 높인다. 특정 조건이나 한계에 구애받지 않고 다양한 사용자가 참여 가능한 새로운 음악 체험 기회를 제시한다.
              </Description>
            </ContentBox>
          </FlexRow>
        </Section>

        <AnimatedDots/>

        <Section>
          <FlexRow>
            <ContentBox>
              <TitleWrapper>
                <Title>
                  <img src="./images/about/Vector1.svg" style={{marginRight: "1.6rem"}} alt="" />
                  About Team
                  <img src="./images/about/Vector2.svg" style={{marginLeft: "1.6rem"}} alt="" />
                </Title>
                <Eyes src="./images/about/eyes2.svg" alt="eyes1" style={{margin: "-2rem -34rem"}}/>
              </TitleWrapper>
              <Description>
                저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 
                저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠
                저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^
              </Description>
            </ContentBox>
            <AllVideo src="./All_final.mov" autoPlay loop muted playsInline />
          </FlexRow>
        </Section>
        
        <AnimatedDots2/>

    
        <Section>
          <TeamSection>
            <PhotoColumn>
              <MemberVideo src="./Yeonjae_final.mov" autoPlay loop muted playsInline />
              <MemberVideo src="./Mingyeong_final.mov" autoPlay loop muted playsInline />
              <MemberVideo src="./Jimin_final.mov" autoPlay loop muted playsInline />
            </PhotoColumn>
            
            <TeamContent>
              <TitleWrapper>
                <Title>
                  <img src="./images/about/Vector1.svg" style={{marginRight: "4rem"}} alt="" />
                  About Us
                  <img src="./images/about/Vector2.svg" style={{marginLeft: "4rem"}} alt="" />
                </Title>
                <Eyes src="./images/about/eyes3.svg" alt="eyes1" style={{margin: "-2rem -5rem"}}/>
              </TitleWrapper>

              <MemberInfo>
                <Member>
                  <MemberName>이연재</MemberName>
                  <MemberInsta>@leeyeonzh</MemberInsta>
                </Member>
                <MemberDescription>
                  <span style={{color:"#9F9E9E"}}>프론트엔드</span> <br />
                  큼큼...
                </MemberDescription>
              </MemberInfo>
              <Line />

              <MemberInfo>
                <Member>
                  <MemberName>조민경</MemberName>
                  <MemberInsta>@firohdkv</MemberInsta>
                </Member>
                <MemberDescription>
                  <span style={{color:"#9F9E9E"}}>백엔드</span> <br />
                  큼큼...
                </MemberDescription>
              </MemberInfo>
              <Line />

              <MemberInfo>
                <Member>
                  <MemberName>현지민</MemberName>
                  <MemberInsta>@hyunzimn</MemberInsta>
                </Member>
                <MemberDescription>
                  <span style={{color:"#9F9E9E"}}>디자인</span> <br />
                  큼큼...
                </MemberDescription>
              </MemberInfo>
            </TeamContent>
          </TeamSection>
        </Section>

        <BottomSpacing />
      </Container>
    </>
  );
}