#!/bin/bash

# 아카이브 전용 배포 스크립트

echo "📦 아카이브 전용 배포를 시작합니다..."

# 1. 원본 App.js 백업
if [ ! -f "src/App.full.js" ]; then
    echo "📋 원본 App.js를 백업합니다..."
    cp src/App.js src/App.full.js
fi

# 2. Archive 전용 App.js로 교체
echo "🔄 Archive 전용 App.js로 교체합니다..."
cp src/App.archive.js src/App.js

# 3. 빌드
echo "🏗️  빌드를 시작합니다..."
npm run build

# 4. 원본 App.js 복구
echo "↩️  원본 App.js를 복구합니다..."
cp src/App.full.js src/App.js

echo "✅ 배포 준비가 완료되었습니다!"
echo "📁 build/ 폴더의 내용을 배포하세요."

