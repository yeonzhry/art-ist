import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'; 



const GlobalStyle = createGlobalStyle`
    html {
        scroll-behavior: smooth;
    }
   
    body {
        background-color: #f8f8f8; 
        margin: 0; 
        padding: 0;
        min-height: 100vh;
    }
`;

const HowToContainer = styled.div`
    max-width: 67rem;
    margin: 0 auto;
    padding-top: 80px;
    font-family: "timeline-210", sans-serif;
    color: var(--background-2);
    margin-bottom: 10rem;
    scroll-behavior: smooth;

    @media (min-width: 1920px) and (max-width: 2560px) {
        max-width: 80rem;
        padding-top: clamp(80px, 5vh, 100px);
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media (min-width: 2560px) {
        max-width: 90rem;
        padding-top: clamp(90px, 5.5vh, 120px);
        padding-left: 3rem;
        padding-right: 3rem;
    }

    @media (max-width: 1400px) {
        max-width: 100%;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
`;

const HowToContent = styled.main`
    padding-top: 4.25rem;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 60px;
    font-size: 3rem;
    font-family: "Zen Dots", sans-serif;
    font-weight: 400;

    @media (min-width: 1920px) and (max-width: 2560px) {
        font-size: clamp(2.5rem, 2.5vw, 3.5rem);
        margin-bottom: clamp(50px, 4vh, 70px);
    }

    @media (min-width: 2560px) {
        font-size: clamp(3rem, 3vw, 4rem);
        margin-bottom: clamp(60px, 5vh, 80px);
    }

    @media (max-width: 1400px) {
        font-size: 2.5rem;
        margin-bottom: 40px;
    }
`;

const StepSection = styled.section`
    display: grid;
    grid-template-columns: 1fr 6fr 1.5fr;
    gap: 20px;
    align-items: start;
    margin-bottom: 50px;
    padding: 30px 0;

    @media (min-width: 1920px) and (max-width: 2560px) {
        gap: clamp(20px, 2vw, 30px);
        margin-bottom: clamp(45px, 4vh, 60px);
        padding: clamp(25px, 2.5vh, 40px) 0;
    }

    @media (min-width: 2560px) {
        gap: clamp(25px, 2.5vw, 35px);
        margin-bottom: clamp(50px, 5vh, 70px);
        padding: clamp(30px, 3vh, 50px) 0;
    }

    @media (max-width: 1400px) {
        grid-template-columns: 1fr;
        gap: 15px;
        margin-bottom: 40px;
        padding: 20px 0;
    }
 
    &.triptych {
        grid-template-columns: 1.5fr 10fr 1px 1.2fr;
        align-items: start;

        @media (max-width: 1400px) {
            grid-template-columns: 1fr;
        }
    }

    &.withLeftDivider {
        grid-template-columns: 1px 1fr 2fr 1.5fr;

        @media (max-width: 1400px) {
            grid-template-columns: 1fr;
        }
    }
`;

const StepNumber = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const NumberCircle = styled.span`
    font-size: 1.5em;
    font-family: "Zen Dots", sans-serif;
    font-weight: 400;
    background-color: #121212;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    color: var(background-2);

    ${StepNumber} & { 
    }
`;

const StepTitle = styled.h2`
    font-size: 2rem;
    line-height: 1.2;
    font-weight: bold;
    margin-top: 0;
    width: 15rem;

    @media (min-width: 1920px) and (max-width: 2560px) {
        font-size: clamp(1.8rem, 2vw, 2.5rem);
        width: clamp(14rem, 14vw, 18rem);
    }

    @media (min-width: 2560px) {
        font-size: clamp(2rem, 2.2vw, 2.8rem);
        width: clamp(15rem, 15vw, 20rem);
    }

    @media (max-width: 1400px) {
        width: 100%;
        font-size: 1.8rem;
    }
`;

const StepDetails = styled.div`
  line-height: 1.5;

  @media (min-width: 1920px) and (max-width: 2560px) {
        font-size: clamp(1rem, 1.1vw, 1.2rem);
        line-height: clamp(1.4, 1.6vw, 1.8);
    }

    @media (min-width: 2560px) {
        font-size: clamp(1.1rem, 1.2vw, 1.3rem);
        line-height: clamp(1.5, 1.7vw, 1.9);
    }
`;

const TriptychDetails = styled(StepDetails)`
  padding-left: 10rem;

  @media (min-width: 1920px) and (max-width: 2560px) {
        padding-left: clamp(8rem, 8vw, 12rem);
    }

    @media (min-width: 2560px) {
        padding-left: clamp(10rem, 10vw, 14rem);
    }

    @media (max-width: 1400px) {
        padding-left: 0;
    }
`;

const DetailItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 1rem;
`;

const KoreanText = styled.p`
    font-weight: 500;
    margin-top: 5px;
   
`;

const Icon = styled.span`
    font-weight: bold;

    font-size: 1.2em;
    margin: 0 3px;
    display: inline-block;
`;

const Illustration = styled.div`

    min-height: 100px; 
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const LeftIllustration = styled(Illustration)`
    justify-self: end;
    margin-top: 5rem;
    transform: translateX(5rem); 
`;

const SectionDivider = styled.hr`
    border: none;
   
    margin: 40px 0;
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background: #121212;
`;

const RightCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
`;

const Bullet = styled.span`
    display: inline-block;
    margin-right: -1rem;
    font-size: 5rem;
`;


const HowToPlay = () => {
    return (
      <>
      <GlobalStyle /> 
        <HowToContainer>
            <HowToContent>
                <Title>( How to Play? )</Title>

                <StepSection className="withLeftDivider">
                    
                    <StepNumber>
                        <NumberCircle>1</NumberCircle>
                        <StepTitle>Start<br/><span style={{fontSize: "1.5rem"}}>시작하기</span></StepTitle>
                    </StepNumber>
                    <VerticalDivider style={{marginLeft: "16rem"}}/>
                    <StepDetails>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click an instrument to start</p>
                                <KoreanText>악기를 클릭하여 시작하기</KoreanText>
                            </div>
                        </DetailItem>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click <Icon>&nbsp; &lt; &nbsp; </Icon> or <Icon>&nbsp; &gt; &nbsp;</Icon> to change instruments</p>
                                <KoreanText><Icon>&nbsp; &lt; &nbsp; </Icon> 혹은 <Icon>&nbsp; &gt; &nbsp; </Icon>을 클릭하여 악기 변경</KoreanText>
                            </div>
                        </DetailItem>
                    </StepDetails>
                    <Illustration src='./images/model.png' style={{marginTop: "3rem", marginLeft: "10rem", width: "10rem"}} alt="model"/>
        
                </StepSection>

                <SectionDivider />

                <StepSection className="withLeftDivider">
          
                    <StepNumber>
                        <NumberCircle>2</NumberCircle>
                        <StepTitle>Controls<br/><span style={{fontSize: "1.5rem"}}>조작법</span></StepTitle>
                    </StepNumber>
                    <VerticalDivider style={{marginLeft: "16rem"}}/>
                    <StepDetails>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click <img src="./images/button1.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> to go back</p>
                                <KoreanText><img src="./images/button1.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/>을 클릭하여 뒤로 가기</KoreanText>
                            </div>
                        </DetailItem>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click <img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem", width: "2.5rem"}}/> or <img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> to proceed</p>
                                <KoreanText><img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem", width: "2.5rem"}}/> 혹은 <img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> 을 클릭하여 진행하기</KoreanText>
                            </div>
                        </DetailItem>
                    </StepDetails>
                    <Illustration src='./images/button.svg' style={{marginTop: "3rem"}} alt="button"/> 
                </StepSection>

                <SectionDivider />

            
                <StepSection className="triptych">
                    <LeftIllustration src='./images/hands.svg' alt="hands"/>
                    
                    <TriptychDetails>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click <img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem", width: "2.5rem"}}/> to start recording</p>
                                <KoreanText><img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem", width: "2.5rem"}}/> 을 클릭하여 기록하기</KoreanText>
                            </div>
                        </DetailItem>
                        <DetailItem >
                            <Bullet>•</Bullet>
                            <div>
                                <p style={{lineHeight: "2rem"}}>Recording will automatically stop when 8 measures are filled</p>
                                <KoreanText>8마디가 채워지면 기록 완료</KoreanText>
                            </div>
                        </DetailItem>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click <img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> to move to the next step</p>
                                <KoreanText><img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> 을 클릭하여 다음 단계로 이동하기</KoreanText>
                            </div>
                        </DetailItem>
                    </TriptychDetails>
                    <VerticalDivider />
                    <RightCol>
                        <NumberCircle>3</NumberCircle>
                        <StepTitle style={{textAlign: 'right'}}>Recording<br/><span style={{fontSize: '1.5rem'}}>기록하기</span></StepTitle>
                    </RightCol>
                </StepSection>

                <SectionDivider />

         
                <StepSection className="triptych">
                    <LeftIllustration src='./images/lp.svg' alt="lp"/>
                    <TriptychDetails>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Customize your own LP</p>
                                <KoreanText>나만의 LP를 꾸미기</KoreanText>
                            </div>
                        </DetailItem>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>Click <img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> to finish your customizing</p>
                                <KoreanText><img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> 을 클릭하여 꾸미기 완료</KoreanText>
                            </div>
                        </DetailItem>
                        <DetailItem>
                            <Bullet>•</Bullet>
                            <div>
                                <p>You can check your music in the Archive page</p>
                                <KoreanText>Archive 페이지에서 본인의 악보 확인 가능</KoreanText>
                            </div>
                        </DetailItem>
                    </TriptychDetails>
                    <VerticalDivider />

                    <RightCol>
                        <NumberCircle>4</NumberCircle>
                        <StepTitle style={{textAlign: 'right'}}>Archiving<br/><span style={{fontSize: '1.5rem'}}>아카이빙</span></StepTitle>
                    </RightCol>
                </StepSection>

            </HowToContent>
         </HowToContainer>

         </>
    );
};

export default HowToPlay;
