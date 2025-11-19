const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// 프린터 설정
const PRINTER_CONFIG = {
  width: 576,        // 영수증 프린터 너비 (px)
  dithering: true    // 디더링 활성화 (더 나은 흑백 변환)
};

app.post("/print-image", async (req, res) => {
  const { imageUrl } = req.body;
  
  if (!imageUrl) {
    return res.status(400).json({ error: "imageUrl is required" });
  }

  console.log("📥 Received print request:", imageUrl);

  try {
    // 1) Supabase 이미지 다운로드
    console.log("⬇️  Downloading image...");
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    console.log("✅ Image downloaded");

    // 2) 영수증 프린터에 맞게 이미지 처리
    console.log("🔄 Processing image for receipt printer...");
    
    let processed = sharp(buffer)
      .resize(PRINTER_CONFIG.width, null, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      });
    
    // 흑백 변환 (디더링 옵션)
    if (PRINTER_CONFIG.dithering) {
      processed = processed
        .grayscale()
        .normalise()
        .sharpen();  // 선명도 향상
    } else {
      processed = processed.grayscale();
    }
    
    const resized = await processed.png().toBuffer();
    console.log("✅ Image processed");

    // 3) PNG를 임시 파일로 저장
    const tempPath = path.join(__dirname, "temp_print.png");
    fs.writeFileSync(tempPath, resized);
    console.log("✅ Temporary file saved:", tempPath);

    // 4) 시스템 프린터로 인쇄
    console.log("🖨️  Sending to system printer...");
    
    exec(`lpr "${tempPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Print failed:", error.message);
        
        // 임시 파일 삭제
        try {
          fs.unlinkSync(tempPath);
        } catch (e) {
          console.warn("⚠️  Failed to delete temp file");
        }
        
        return res.status(500).json({ 
          error: "Print failed", 
          details: error.message,
          hint: "Make sure a printer is set up in System Preferences > Printers & Scanners"
        });
      }
      
      console.log("✅ Print job sent to system printer");
      
      // 임시 파일 삭제
      try {
        fs.unlinkSync(tempPath);
        console.log("✅ Temporary file deleted");
      } catch (e) {
        console.warn("⚠️  Failed to delete temp file");
      }
      
      return res.json({ 
        success: true, 
        message: "Print sent to system printer successfully" 
      });
    });

  } catch (err) {
    console.error("❌ Error:", err);
    
    // 임시 파일 정리
    const tempPath = path.join(__dirname, "temp_print.png");
    if (fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch (e) {
        console.warn("⚠️  Failed to delete temp file");
      }
    }
    
    return res.status(500).json({ 
      error: "Failed to process image", 
      details: err.message 
    });
  }
});

// 헬스체크 엔드포인트
app.get("/health", (req, res) => {
  exec("lpstat -p -d", (error, stdout) => {
    const printerStatus = error ? "No printer configured" : stdout;
    res.json({ 
      status: "ok",
      printer: printerStatus
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🖨️  Print server running on port ${PORT}`);
  console.log(`📍 Using system printer (lpr command)`);
  
  // 프린터 상태 확인
  exec("lpstat -p -d", (error, stdout) => {
    if (error) {
      console.log("\n⚠️  No system printer found");
      console.log("💡 Add a printer in: System Preferences > Printers & Scanners\n");
    } else {
      console.log("\n✅ System printer status:");
      console.log(stdout);
    }
  });
  
  console.log("💡 Endpoints:");
  console.log(`   POST http://localhost:${PORT}/print-image`);
  console.log(`   GET  http://localhost:${PORT}/health\n`);
});