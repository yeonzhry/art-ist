# 아카이브 전용 배포 가이드

이 가이드는 프로젝트의 아카이브(Archive) 기능만 독립적으로 배포하는 방법을 설명합니다.

## 📋 필요한 파일들

### 필수 컴포넌트
- `src/pages/Archive.js` - 아카이브 메인 페이지
- `src/components/RecordingDetailModal.js` - 녹음 상세 모달
- `src/components/Header.js` - 헤더 (선택적, 간소화 가능)
- `src/supabase.js` - Supabase 설정

### 필수 스타일
- `src/styles/GlobalStyle.js` - 전역 스타일
- `src/styles/font.css` - 폰트 설정

### 필수 리소스
- `public/images/LP_Blue.svg`
- `public/images/LP_Green.svg`
- `public/images/LP_Red.svg`
- `public/images/notes/` (모든 알파벳 이미지)
- `public/images/notes_b/` (모든 알파벳 이미지)
- `public/images/logo.svg`
- `public/sounds/hover4.mp3` (선택적)
- `public/sounds/click2.mp3` (선택적)

## 🚀 배포 방법

### 방법 1: App.archive.js 사용 (권장)

1. `src/App.js`를 백업:
```bash
cp src/App.js src/App.full.js
```

2. `App.archive.js`를 `App.js`로 복사:
```bash
cp src/App.archive.js src/App.js
```

3. 빌드 및 배포:
```bash
npm run build
```

### 방법 2: 환경 변수로 분기

`App.js`를 수정하여 환경 변수로 아카이브만 표시하도록 설정할 수 있습니다.

## 📦 최소 패키지 의존성

아카이브만 배포하려면 다음 패키지만 필요합니다:
- react
- react-dom
- react-router-dom
- styled-components
- @supabase/supabase-js

## ⚙️ 설정

### Supabase 설정 확인
`src/supabase.js`에서 Supabase URL과 키가 올바르게 설정되어 있는지 확인하세요.

### 라우팅
아카이브 전용 앱은 다음 라우트만 제공합니다:
- `/` - 아카이브 메인 페이지
- `/archive` - 아카이브 메인 페이지 (동일)

## 🔧 Header 간소화 (선택)

아카이브만 배포하는 경우 Header를 간소화할 수 있습니다:
- 로고만 표시
- 네비게이션 메뉴 제거 또는 최소화

## 📝 주의사항

1. **이미지 리소스**: 모든 notes 이미지가 필요합니다
2. **Supabase 연결**: 데이터베이스 연결이 필수입니다
3. **CORS 설정**: Supabase에서 CORS 설정이 올바른지 확인하세요

## 🌐 배포 플랫폼

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### Railway
`railway.json` 파일을 수정하여 프론트엔드만 배포하도록 설정

## 🔄 원래 앱으로 복구

```bash
cp src/App.full.js src/App.js
```

