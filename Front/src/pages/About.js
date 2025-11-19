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
  margin-top: 3rem;

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
const EyesBase = styled.img`
  position: absolute;
  width: 6.75rem;
  height: auto;
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

const Eyes1 = styled(EyesBase)`
  top: 10rem;
  right: 23rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    top: 12rem;
  right: 53rem;
  }

  @media (min-width: 2560px) {
    top: 12rem;
    right: 53rem;
  }
`;

const Eyes2 = styled(EyesBase)`
  top: 45rem;
  left: 15rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    top: 55rem;
    left: 38rem;
  }

  @media (min-width: 2560px) {
    top: 55rem;
    left: 38rem;
  }

`;



const Eyes3 = styled(EyesBase)`
  top: 78rem;
  right: 26rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    top: 98rem;
  right: 60rem;

  }

  @media (min-width: 2560px) {
    top: 98rem;
    right: 60rem;

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
  margin-bottom: 3rem;

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

const DotsWrapper = styled.div`
  position: absolute; 
  left: 65%;         
  transform: translate(-50%, -50%); 
  pointer-events: none;
`;


const DotsWrapper2 = styled.div`
  position: absolute; 
  left: 40%;         
  transform: translate(-50%, -50%); 
  pointer-events: none;
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
  gap: 5.5rem;
  flex-shrink: 0;
  margin-top: 13rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    gap: clamp(4rem, 4vw, 5rem);
    margin-top: clamp(14rem, 9vh, 15rem);
  }

  @media (min-width: 2560px) {
    gap: clamp(4rem, 4vw, 5rem);
    margin-top: clamp(14rem, 9vh, 15rem);
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
  margin-top: 1.7rem;
  margin-left: 15rem;
  color: var(--neutral-neutral-09);
  font-size: 1rem;
  line-height: 2rem;
  width: 26rem;
  cursor: none;

  @media (min-width: 1920px) and (max-width: 2560px) {
    margin-left: 17rem;
    width: 30rem;

  }

  @media (min-width: 2560px) {
    margin-left: 17rem;
  width: 30rem;

  }


`;

const Line = styled.div`
  width: 44rem;
  height: 0.18rem;
  background-color: #929292;
  margin: 1rem 0rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
    width: clamp(44rem, 44vw, 55rem);
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
    
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setMagnifierPos({ x: e.clientX, y: e.clientY });

      
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
    const scale = 1.5; 
    const magnifierSize = 200;

    
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
                <Eyes1 src="./images/about/eyes1.svg" alt="eyes" />
              </TitleWrapper>
              <Description>
                모션 인식을 통해 사운드를 생성하고 이를 악보로 실시간 기록·저장하는 인터랙티브 콘텐츠이다. 궁극적 목표는 단순한 기술적 구현을 넘어서 악기에 대한 진입 장벽을 낮추고 포용적인 음악 환경을 조성하는 데에 있다. 이는 인간의 가장 기본적인 단위인 몸을 활용하는 신체적 언어인 수어를 기반으로 한다. 물리적 도구와 복잡한 학습을 요구하던 기존의 방식에서 벗어나 간단한 동작만으로 연주 가능한 새로운 방식을 통해 음악에 대한 접근성을 높인다. 특정 조건이나 한계에 구애받지 않고 다양한 사용자가 참여 가능한 새로운 음악 체험 기회를 제시한다.
              </Description>
            </ContentBox>
          </FlexRow>
        </Section>

        <DotsWrapper>
          <AnimatedDots />
        </DotsWrapper>

        <Section>
          <FlexRow>
            <ContentBox>
              <TitleWrapper>
                <Title>
                  <img src="./images/about/Vector1.svg" style={{marginRight: "1.6rem"}} alt="" />
                  About Team
                  <img src="./images/about/Vector2.svg" style={{marginLeft: "1.6rem"}} alt="" />
                </Title>
                <Eyes2 src="./images/about/eyes2.svg" alt="eyes" />
              </TitleWrapper>
              <Description>
              우리 팀의 출발점은 과밴드 다카포이다. 우리 셋은 다카포에서의 가장 첫 학기, 가장 첫 팀을 함께 했고 같은 전공이라는 공통점을 가지고 있다. 우리는 동기이긴 하지만 큰 접점이 없었어서, 사실 다카포가 아니었으면 우리가 이렇게 하나로 모일 수 있었을까 하는 생각이 들기도 해 더욱 각별하기도 하다. 이렇게 우리를 이어준 계기가 된 음악은, 동시에 우리 셋의 공통된 관심사이기도 하다. 우리는 이번 프로젝트 ART( )IST 를 통해 우리가 그랬던 것처럼 음악으로 모두가 관계 맺으며 연결되기를 기대하고 있다. 
              </Description>
            </ContentBox>
            <AllVideo src="./All_final.mov" autoPlay loop muted playsInline />
          </FlexRow>
        </Section>
        
        <DotsWrapper2>
          <AnimatedDots2 />
        </DotsWrapper2>

    
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
                <Eyes3 src="./images/about/eyes3.svg" alt="eyes" />

              </TitleWrapper>

              <MemberInfo>
                <Member>
                  <MemberName>이연재</MemberName>
                  <MemberInsta>@leeyeonzh</MemberInsta>
                </Member>
                <MemberDescription>
                  <span style={{color:"#9F9E9E"}}>프론트엔드</span><br />
                  어디 가고 싶어 다 데려가줄게 뭐가 먹고 싶어 내가 다 사줄게 닭다리를 먹는 네 모습 아름다워 닭 날개를 먹는 네 모습 아름다워 너는 나의 피카츄 볼 때마다 짜릿해 매순간마다심쿵 그래 난 니가 필요해 나는.. 걱정돼... 니가 내 옆에 있으면 천국은 누가 지켜 You are my angel!
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
                  여러분 단체방에 죄송하지만 글 하나만 적겠습니다
안녕 art( )ist야 너를 처음 본 순간부터 좋아했어 지금 이 수많은 사람들 앞에서 오로지 너만 사랑한다고 말하고 싶어서 큰마음 먹고 용기 내어봐 매일매일 너를 볼 때마다 두근댔고 너만 보이고 너 생각만 나 사랑하는 art( )ist 야. 내 여자가 돼줄래? 아니 나만의 태양이 되어줄래? 난 너만의 달님이 될게
                </MemberDescription>
              </MemberInfo>
              <Line />

              <MemberInfo>
                <Member>
                  <MemberName>현지민</MemberName>
                  <MemberInsta>@hyunzimn</MemberInsta>
                </Member>
                <MemberDescription>
                  <span style={{color:"#9F9E9E"}}>디자인</span><br />
                  현지민그는누구인가에버랜드의도시인용인시출신이자용인석성초초당중백현고출신인로컬에버랜드걸순수혈통그자체로중학교시절부터밈배틀로는누구에게도재능이밀리지않는다는키보드워리어그자체이기도했다수시합격으로서강대학교에지명받으며서울걸의탄생을알렸으며데뷔시즌학점*.**을기록하며나처럼깔아주는사람도있어야세상이굴러가지의표본이되었다
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