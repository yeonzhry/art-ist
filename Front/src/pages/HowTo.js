import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'; 



const GlobalStyle = createGlobalStyle`
   
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
    color: #121212;
    margin-bottom: 10rem;
  
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

`;

const StepSection = styled.section`
    display: grid;

    grid-template-columns: 1fr 6fr 1.5fr;
    gap: 20px;
    align-items: start;
    margin-bottom: 50px;
    padding: 30px 0;

 
    &.triptych {
      
        grid-template-columns: 1.5fr 10fr 1px 1.2fr;
        align-items: start;
    }

  
    &.withLeftDivider {
        grid-template-columns: 1px 1fr 2fr 1.5fr;
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
    color: #f8f8f8;

    ${StepNumber} & { 
    }
`;

const StepTitle = styled.h2`
    font-size: 2rem;
    line-height: 1.2;
    font-weight: bold;
    margin-top: 0;
    width: 15rem;
  
`;

const StepDetails = styled.div`
  line-height: 1.5;
`;

const TriptychDetails = styled(StepDetails)`
  padding-left: 10rem; 
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
                    <Illustration style={{marginTop: "3rem", marginLeft: "10rem", width: "10rem"}}>
                    <img src='./images/model.png'/>
                    </Illustration>
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
                    <Illustration style={{marginTop: "3rem"}}> 
                        <img src='./images/button.svg'/>
                    </Illustration>
                </StepSection>

                <SectionDivider />

            
                <StepSection className="triptych">
                    <LeftIllustration>
                        <img src='./images/hands.svg'/>
                    </LeftIllustration>
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
                    <LeftIllustration>
                        <img src='./images/lp.svg'/>
                    </LeftIllustration>
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
