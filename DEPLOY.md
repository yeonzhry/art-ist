# 배포 가이드

## 🚀 Railway를 사용한 배포 (가장 쉬움, 추천!)

Railway는 Vercel과 비슷하게 GitHub와 연동해서 자동 배포할 수 있습니다.

### 1단계: GitHub에 프로젝트 업로드

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub에 새 레포지토리 만들고
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### 2단계: Railway에 가입 및 프로젝트 연결

1. **Railway 가입**: https://railway.app 접속 → "Login" → GitHub로 가입
2. **새 프로젝트 생성**: "New Project" 클릭
3. **GitHub 레포 연결**: "Deploy from GitHub repo" 선택 → 본인의 레포지토리 선택
4. **자동 배포**: Railway가 Dockerfile을 자동으로 감지하고 배포 시작!

### 3단계: 환경 변수 설정 (선택사항)

Railway 대시보드에서:
- Settings → Variables
- 필요하면 환경 변수 추가 (현재는 필요 없음)

### 4단계: 도메인 설정

1. Railway 대시보드 → Settings → Domains
2. "Generate Domain" 클릭하면 `your-app.railway.app` 같은 URL 제공
3. 또는 커스텀 도메인 연결 가능

### 완료! 🎉

배포가 완료되면 제공된 URL로 접속하면 됩니다.

---

## 🎨 Render를 사용한 배포

### 1단계: GitHub에 프로젝트 업로드 (위와 동일)

### 2단계: Render에 배포

1. **Render 가입**: https://render.com → "Get Started for Free" → GitHub로 가입
2. **새 Web Service 생성**: "New +" → "Web Service"
3. **레포지토리 연결**: GitHub 레포지토리 선택
4. **설정**:
   - **Name**: 원하는 이름 (예: scg-app)
   - **Region**: Singapore (한국에서 가장 가까움)
   - **Branch**: main
   - **Root Directory**: (비워두기 - 루트에 Dockerfile이 있으므로)
   - **Runtime**: Docker (자동 감지됨)
   - **Instance Type**: Free (무료 티어)

5. **고급 설정**:
   - **Dockerfile Path**: `Dockerfile` (자동 감지됨)
   - **Docker Context**: `.` (루트 디렉토리)

6. **생성 및 배포**: "Create Web Service" 클릭 → 자동 배포 시작!

### 3단계: 도메인 확인

배포 완료 후 `your-app.onrender.com` 같은 URL이 제공됩니다.

---

## 🔀 분리 배포: Vercel (프론트) + Railway/Render (백엔드)

Vercel에 익숙하다면 이 방법도 가능합니다.

### 백엔드 배포 (Railway 또는 Render)

위의 Railway/Render 가이드를 따라 백엔드만 배포:
- 백엔드 URL 예: `https://scg-backend.railway.app`

### 프론트엔드 배포 (Vercel)

1. **Vercel에 프로젝트 연결**: 
   - https://vercel.com → "Add New Project"
   - GitHub 레포지토리 선택
   - **Root Directory**: `Front`로 설정

2. **환경 변수 설정**:
   - `REACT_APP_API_URL`: 백엔드 URL + `/api`
   - 예: `https://scg-backend.railway.app/api`

3. **배포**: "Deploy" 클릭

4. **프론트엔드 코드 수정 필요**:
   - `Front/src/components/Record.js`에서 환경 변수를 사용하도록 이미 수정되어 있음 ✅

---

## ⚠️ 주의사항

### 모델 파일 크기
- `keras_model.h5` 파일이 클 수 있음 (7250 lines)
- Railway/Render 무료 티어는 파일 크기 제한이 있을 수 있음
- 문제가 있으면 모델 파일을 외부 저장소(S3 등)에 올리고 코드에서 다운로드하도록 수정 필요

### 데이터베이스
- 현재 RDS를 사용 중이므로 별도 설정 불필요
- 백엔드 코드의 `DB_CONFIG`가 올바른지 확인

### 빌드 시간
- TensorFlow, OpenCV 등 큰 패키지 설치로 인해 첫 빌드는 10-20분 걸릴 수 있음
- 인내심을 가지세요! 😊

---

## 🐛 문제 해결

### 빌드 실패 시
1. Railway/Render 로그 확인
2. `requirements.txt`에 모든 패키지가 있는지 확인
3. Dockerfile이 올바른지 확인

### API 연결 안 될 때
1. 백엔드 URL이 올바른지 확인
2. CORS 설정 확인 (이미 `*`로 설정되어 있음)
3. 프론트엔드 환경 변수 확인

### 모델 파일 에러
- 파일이 너무 크면: 모델을 외부 저장소에 올리고 다운로드하도록 수정 필요

---

## 💡 추천: Railway 사용!

가장 간단하고 빠른 방법은 **Railway**입니다:
- ✅ Docker 자동 감지
- ✅ GitHub 연동 (자동 배포)
- ✅ 무료 티어 제공
- ✅ 쉬운 설정
- ✅ Vercel과 비슷한 사용자 경험

