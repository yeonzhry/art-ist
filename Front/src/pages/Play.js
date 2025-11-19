import React, { useState } from "react";
import Name from "../components/Name";
import Before from "../components/Before";
import Record from "../components/Record";
import Score from "../components/Score";
import Archiving from "../components/Archiving";

const Play = () => {
  const [step, setStep] = useState("name"); // name -> before -> record -> score -> archiving
  const [recordedNotes, setRecordedNotes] = useState([]); // 녹음된 노트 저장
  const [userId, setUserId] = useState(() => {
    // localStorage에서 user_id 가져오기
    const storedId = localStorage.getItem("user_id");
    return storedId ? parseInt(storedId) : null;
  });

  // Name → Before 전환 (user_id 저장 후 userId state 업데이트)
  const handleCloseName = () => {
    const storedId = localStorage.getItem("user_id");
    if (storedId) {
      setUserId(parseInt(storedId));
    }
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
  // 주의: Record 컴포넌트에서 이미 DB에 저장이 완료된 후에만 이 함수가 호출됨
  const handleRecordComplete = (notes) => {
    console.log("✅ Record에서 녹음 완료. Score 페이지로 이동합니다.");
    setRecordedNotes(notes);
    setStep("score");
  };

  // Score → Record(재녹음) 전환
  // Record 컴포넌트가 다시 마운트되면 이전 녹음을 자동으로 삭제함
  const handleScorePrev = () => {
    console.log("🔄 재녹음을 위해 Record 페이지로 이동합니다.");
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
        <Name 
          onClose={handleCloseName} 
          onNext={() => {
            // user_id 저장 후 userId state 업데이트
            const storedId = localStorage.getItem("user_id");
            if (storedId) {
              setUserId(parseInt(storedId));
            }
            setStep("before");
          }} 
        />
      )}
      {step === "before" && (
        <Before onPrev={handleBeforePrev} onNext={handleBeforeNext} />
      )}
      {step === "record" && (
        <Record 
          userId={userId}
          onPrev={() => setStep("before")} 
          onComplete={handleRecordComplete}
        />
      )}
      {step === "score" && (
        <Score 
          notes={recordedNotes}
          onClose={handleScorePrev}
          onNext={handleScoreNext}
          userId={userId} 
        />
      )}
      {step === "archiving" && (
        <Archiving 
          onClose={handleArchivingPrev}
          onNext={handleArchivingNext} 
          userId={userId}
        />
      )}
    </>
  );
};

export default Play;