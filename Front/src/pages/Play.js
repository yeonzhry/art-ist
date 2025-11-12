import React, { useState } from "react";
import Header from "../components/Header";
import Name from "../components/Name";
import Before from "../components/Before";
import Record from "../components/Record";
import Score from "../components/Score";
import Archiving from "../components/Archiving";

const Play = () => {
  const [step, setStep] = useState("name"); // name -> before -> record -> score -> archiving
  const [recordedNotes, setRecordedNotes] = useState([]); // 녹음된 노트 저장

  // Name → Before 전환
  const handleCloseName = () => {
    setStep("before");
  };

  // Before → Name(뒤로) 전환
  const handleBeforePrev = () => {
    setStep("name");
  };

  // Before → Record 전환
  const handleBeforeNext = () => {
    setStep("record");
  };

  // Record에서 녹음 완료 후 Score로 전환
  const handleRecordComplete = (notes) => {
    setRecordedNotes(notes);
    setStep("score");
  };

  // Score → Record(재녹음) 전환
  const handleScorePrev = () => {
    setStep("record");
  };

  // Score → Archiving 전환
  const handleScoreNext = () => {
    setStep("archiving");
  };

  // Archiving → Score(뒤로) 전환
  const handleArchivingPrev = () => {
    setStep("score");
  };

  // Archiving → 다음 단계 (필요 시 추가)
  const handleArchivingNext = () => {
    // 다음 단계가 필요하면 여기에 추가
    console.log("Archiving next");
  };

  return (
    <>
      {step === "name" && (
        <Name onClose={handleCloseName} onNext={() => setStep("before")} />
      )}
      {step === "before" && (
        <Before onPrev={handleBeforePrev} onNext={handleBeforeNext} />
      )}
      {step === "record" && (
        <Record 
          onPrev={() => setStep("before")} 
          onComplete={handleRecordComplete}
        />
      )}
      {step === "score" && (
        <Score 
          notes={recordedNotes}
          onClose={handleScorePrev}
          onNext={handleScoreNext}
        />
      )}
      {step === "archiving" && (
        <Archiving 
          onClose={handleArchivingPrev}
          onNext={handleArchivingNext} 
        />
      )}
    </>
  );
};

export default Play;