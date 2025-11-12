import React, { useEffect } from "react";
import styled from 'styled-components';
import Header from "../components/Header";


const Container = styled.div`
  min-height: 100vh;
  background-color: var(--background-1);
  padding-top: 7rem;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Logo = styled.img`
  width: 19rem;
  height: 19rem;
  margin-top: 8rem;
  display: flex;
 
`;

const ContentBox = styled.div`
  flex: 1;
  margin-left: 5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
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
`;


const Eyes = styled.img`
  width: 6.75rem;
  height: auto;
  align-items: center;
  justify-content: center;
 
`;

const Description = styled.p`
  color: var(--neutral-neutral-09);
  font-size: 1rem;
  font-family: "timeline-210", sans-serif;
  font-weight: 400;
  font-style: normal;;
  line-height: 2rem;
  width: 42.1875rem;
`;

const DividerImage1 = styled.img`
  width: 15rem;
  margin: -5rem 45rem;

`;

const DividerImage2 = styled.img`
  width: 15rem;
  margin: -3rem 35rem;

`;


const PhotoCircleLarge = styled.div`
  flex-shrink: 0;
  width: 20rem;
  height: 20rem;
  background-color: #e5e7eb;
  border-radius: 50%;
`;

const TeamSection = styled.div`
  display: flex;
  gap: 10rem;
`;

const PhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  flex-shrink: 0;
  margin-top: 12rem;
`;

const MemberVideo = styled.video`
  width: 14.1875rem;
  height: 14.1875rem;
  border-radius: 50%;
  object-fit: cover;
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

`;

const Line = styled.div`
  width: 44rem;
  height: 0.18rem;
  background-color: #929292;
  margin: 2rem 0rem;
`;


const BottomSpacing = styled.div`
  height: 4rem;
`;

export default function About() {
  return (
    <>
    <Header />
    <Container>

      <Section>
        <FlexRow>
        <Logo src="./images/about/title.svg" alt="Logo" />
          
          <ContentBox>
            <TitleWrapper>
              <Title><img src="./images/about/Vector1.svg" style={{marginRight: "1.6rem"}}/ > About Work <img src="./images/about/Vector2.svg" style={{marginLeft: "1.6rem"}}/ ></Title>
              <Eyes src="./images/about/eyes1.svg" alt="eyes1" style={{margin: "-2rem -5rem"}}/>
            </TitleWrapper>
            <Description>
            모션 인식을 통해 사운드를 생성하고 이를 악보로 실시간 기록·저장하는 인터랙티브 콘텐츠이다. 궁극적 목표는 단순한 기술적 구현을 넘어서 악기에 대한 진입 장벽을 낮추고 포용적인 음악 환경을 조성하는 데에 있다. 이는 인간의 가장 기본적인 단위인 몸을 활용하는 신체적 언어인 수어를 기반으로 한다. 물리적 도구와 복잡한 학습을 요구하던 기존의 방식에서 벗어나 간단한 동작만으로 연주 가능한 새로운 방식을 통해 음악에 대한 접근성을 높인다. 특정 조건이나 한계에 구애받지 않고 다양한 사용자가 참여 가능한 새로운 음악 체험 기회를 제시한다.
            </Description>
          </ContentBox>
        </FlexRow>
      </Section>

      <DividerImage1 src="./images/about/hands1.svg" alt="hands1" / >
       

  
      <Section>
        <FlexRow>
          <ContentBox>
            <TitleWrapper>
              <Title><img src="./images/about/Vector1.svg" style={{marginRight: "1.6rem"}}/ > About Team <img src="./images/about/Vector2.svg" style={{marginLeft: "1.6rem"}}/ ></Title>
              <Eyes src="./images/about/eyes2.svg" alt="eyes1" style={{margin: "-2rem -34rem"}}/>
            </TitleWrapper>
            <Description>
            저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 
            저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠 저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^ 크흠
            저희 프로젝트는여 어쩌고,, 저쩌고,,, ^.^
            </Description>
          </ContentBox>
          <PhotoCircleLarge />
        </FlexRow>
      </Section>
      
      <DividerImage2 src="./images/about/hands2.svg" alt="hands1" / >
  
      <Section>
        <TeamSection>
          <PhotoColumn>
          <MemberVideo src="./yeonjae.mov" autoPlay loop muted playsInline />
          <MemberVideo src="./mingyeong.mov" autoPlay loop muted playsInline />
          <MemberVideo src="./jimin.mov" autoPlay loop muted playsInline />


        
          </PhotoColumn>
          
          <TeamContent>
            <TitleWrapper>
              <Title><img src="./images/about/Vector1.svg" style={{marginRight: "4rem"}}/ > About Us <img src="./images/about/Vector2.svg" style={{marginLeft: "4rem"}}/ ></Title>
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