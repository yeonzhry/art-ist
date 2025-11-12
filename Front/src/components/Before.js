import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

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
  /* animation: ${fadeIn} 1s ease forwards; */
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

const TextBox = styled.div`
  width: 50rem;
  height: 27rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 8rem;
  text-align: center;
`;

const Line = styled.img`
  width: 0.5rem;
  height: auto;
  margin: 0.2rem 0;
`;

const Line2 = styled.img`
  width: 1.1rem;
  height: auto;
  margin: 0.8 0;
`;

const Text = styled.p`
  font-family: "timeline-210", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: var(--background-2);
  margin: 0;
  line-height: 2rem;
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

const Before = ({ onPrev, onNext }) => {
  return (
    <Overlay>
      <Label>( Before You Play )</Label>

      <TextBox>
        <Text>Click <img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.2rem"}}/> to start recording
        <br /><img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.2rem"}}/> 을 클릭하여 기록하기</Text>
        <Line src="/images/line.svg" alt="line" />

        <Text>Recording will automatically stop when 8 measures are filled
        <br />8마디가 채워지면 자동으로 기록 종료
        </Text>
        <Line src="/images/line.svg" alt="line" />

        <Text>After ending the recording, click <img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.2rem"}}/> to play it back
        <br />기록 종료 후 녹음된 악보 확인, <img src="./images/button4.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.2rem"}}/> 을 클릭하여 재생
        </Text>
        <Line src="/images/line.svg" alt="line" />

        <Text>Click <img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> to move to the next step
        <br /><img src="./images/button3.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> 을 클릭하여 다음 단계로 이동하기
        </Text>
        <Line2 src="/images/line2.svg" alt="line2"/>
        <Text>If you want to re-record, click <img src="./images/button1.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/>
        <br />만약 재녹음을 원한다면 <img src="./images/button1.svg" alt="start button" style={{padding: "0 0.5rem", marginBottom: "-0.3rem"}}/> 클릭
        </Text>
      </TextBox>

      <ButtonBg src="/images/buttonBg.svg" alt="Button bg" />
      <ButtonContainer>
        <img
          src="/images/button1.svg"
          alt="Prev"
          onClick={onPrev ? onPrev : () => console.log("Prev clicked")}
          style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
        />
        <img
          src="/images/button2.svg"
          alt="Next"
          onClick={onNext ? onNext : () => console.log("Next clicked")}
          style={{ cursor: "pointer", width: "4rem", height: "auto" }}
        />
        <img
          src="/images/button3.svg"
          alt="Next"
          onClick={onNext ? onNext : () => console.log("Next clicked")}
          style={{ cursor: "pointer", width: "1.87rem", height: "auto" }}
        />
      </ButtonContainer>
    </Overlay>
  );
};

export default Before;
