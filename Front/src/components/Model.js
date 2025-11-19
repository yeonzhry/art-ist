import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

useGLTF.preload("/piano_final_rotate.glb");
useGLTF.preload("/guitar_final.glb");


const Model = ({
  glbPath,
  scale,
  position,
  rotation = [0, 0, 0],
  floatConfig = { amplitudeY: 0.1, amplitudeX: 0.05, speed: 1, upSpeedFactor: 2.0, downSpeedFactor: 2.0 },
  onClick,
}) => {
  const { scene } = useGLTF(glbPath);
  const modelRef = useRef();
  const startPos = [...position];
  const timeRef = useRef(0); 

  useFrame(({ clock }, delta) => {
    if (modelRef.current) {
     
      const upSpeedFactor = floatConfig.upSpeedFactor ?? 2.0;
      const downSpeedFactor = floatConfig.downSpeedFactor ?? 1.0;
      const baseSpeed = floatConfig.speed;
    
      
   
      const t = timeRef.current * baseSpeed;
      const velocityY = Math.cos(t) * baseSpeed * floatConfig.amplitudeY;
      
    
      const speedFactor = velocityY >= 0 ? upSpeedFactor : downSpeedFactor;
      
    
      timeRef.current += delta * speedFactor;
      
     
      const newTime = timeRef.current * baseSpeed;


      modelRef.current.position.y = startPos[1] + Math.sin(newTime) * floatConfig.amplitudeY;
      
    
      modelRef.current.position.x = startPos[0] + Math.cos(newTime / 2) * floatConfig.amplitudeX;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
      onClick={onClick}
    />
  );
};



const InstrumentModel = () => {
  const [selectedModel, setSelectedModel] = useState("piano");
  const navigate = useNavigate();

  const clickSoundRef = useRef(null);


  if (!clickSoundRef.current) {
    clickSoundRef.current = new Audio("/sounds/next.mp3");
    clickSoundRef.current.volume = 0.6;
  }


  const handlePrev = () => {
    const audio = clickSoundRef.current;
    if (!audio) return;
  
    audio.currentTime = 0;  
    audio.play();
  

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 500);
    
    setSelectedModel(prev => prev === "piano" ? "guitar" : "piano");
  };
  
  const handleNext = () => {
    const audio = clickSoundRef.current;
    if (!audio) return;
  
    audio.currentTime = 0; 
    audio.play();
  

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 500); 
    
    setSelectedModel(prev => prev === "piano" ? "guitar" : "piano");
  };
  
  

  const handleModelClick = () => {
    try {
      localStorage.setItem('instrument', selectedModel);
    } catch {}
    navigate('/play');
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 2]} intensity={2} />


        {selectedModel === "piano" && (
    <Model
        key="piano"
        glbPath="/piano_final_rotate.glb"
        scale={0.16}
        position={[-0.2, -0.9, 0]}
        rotation={[-0.1, -0.2, -0.2]}
        floatConfig={{ 
            amplitudeY: 0.2, 
            amplitudeX: 0.01, 
            speed: 2,
            upSpeedFactor: 0.9,   
            downSpeedFactor: 1.4, 
        }}
        onClick={handleModelClick}
    />
)}
        {selectedModel === "guitar" && (
          <Model
            key="guitar"
            glbPath="/guitar_final.glb"
            scale={0.18}
            position={[-0.3, -0.5, 0]}
      
            floatConfig={{ 
              amplitudeY: 0.2, 
              amplitudeX: 0.01, 
              speed: 2,
              upSpeedFactor: 0.8,   
              downSpeedFactor: 1.2, 
          }}
            onClick={handleModelClick}
          />
        )}


        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>


      <img
        src="/images/arrow_left.svg"
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: 200,
          top: "45%",
          cursor: "pointer",
          width: 30,
        }}
        alt="prev"
      />
      <img
        src="/images/arrow_right.svg"
        onClick={handleNext}
        style={{
          position: "absolute",
          right: 200,
          top: "45%",
          cursor: "pointer",
          width: 30,
        }}
        alt="next"
      />
      
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: selectedModel === "piano" ? "30px" : "12px",
            height: "12px",
            borderRadius: "6px",
            backgroundColor: selectedModel === "piano" ? "#000" : "#ccc",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onClick={() => setSelectedModel("piano")}
        />
        <div
          style={{
            width: selectedModel === "guitar" ? "30px" : "12px",
            height: "12px",
            borderRadius: "6px",
            backgroundColor: selectedModel === "guitar" ? "#000" : "#ccc",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onClick={() => setSelectedModel("guitar")}
        />
        </div>
    </div>
  );
};

export default InstrumentModel;
