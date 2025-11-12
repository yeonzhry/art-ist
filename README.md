# SCG 프로젝트

프론트엔드(React)와 백엔드(FastAPI)를 통합 배포하는 프로젝트입니다.

## 프로젝트 구조

```
scg/
├── Front/          # React 프론트엔드
├── Back/           # FastAPI 백엔드
├── Dockerfile      # Docker 이미지 빌드 파일
├── docker-compose.yml  # Docker Compose 설정
└── README.md       # 이 파일
```

## 배포 방법

### 1. Docker를 사용한 배포 (권장)

#### 전제 조건
- Docker 설치
- Docker Compose 설치 (선택사항)

#### 빌드 및 실행

```bash
# 프로젝트 루트 디렉토리에서 실행
docker-compose up --build
```

또는 Docker만 사용:

```bash
# 이미지 빌드
docker build -t scg-app .

# 컨테이너 실행
docker run -p 8000:8000 scg-app
```

#### 접속
- 브라우저에서 `http://localhost:8000` 접속

### 2. 로컬 개발 환경

#### 백엔드 실행

```bash
cd Back
pip install -r requirements.txt
python main.py
```

#### 프론트엔드 실행

```bash
cd Front
npm install
npm start
```

프론트엔드는 `http://localhost:3000`에서 실행되며, 백엔드는 `http://localhost:8000`에서 실행됩니다.

프론트엔드에서 백엔드 API를 사용하려면 환경 변수를 설정하세요:

```bash
# Front/.env 파일 생성
REACT_APP_API_URL=http://localhost:8000/api
```

### 3. 프로덕션 빌드

#### 프론트엔드 빌드

```bash
cd Front
npm install
npm run build
```

빌드된 파일은 `Front/build/` 디렉토리에 생성됩니다.

#### 백엔드 실행 (프론트엔드 포함)

```bash
cd Back
pip install -r requirements.txt
python main.py
```

백엔드가 프론트엔드 빌드 파일을 자동으로 서빙합니다.

## 환경 변수

### 백엔드
데이터베이스 설정은 `Back/main.py`의 `DB_CONFIG`에서 수정할 수 있습니다.

### 프론트엔드
- `REACT_APP_API_URL`: 백엔드 API URL (기본값: `/api`)

## API 엔드포인트

- `POST /api/predict`: 손 동작 예측 API
  - 요청: multipart/form-data로 이미지 파일 전송
  - 응답: `{"prediction": [{"label": "Do", "confidence": 0.95}]}`

## 주의사항

1. **모델 파일**: `Back/keras_model.h5` 파일이 필요합니다.
2. **데이터베이스**: RDS 데이터베이스 연결 정보를 확인하세요.
3. **포트**: 기본 포트는 8000입니다. 다른 포트를 사용하려면 `docker-compose.yml`이나 실행 명령을 수정하세요.

## 문제 해결

### 프론트엔드가 표시되지 않는 경우
- `Front/build/` 디렉토리가 존재하는지 확인
- Docker 빌드 시 프론트엔드가 제대로 빌드되었는지 확인

### API 연결 오류
- CORS 설정 확인
- API URL이 올바른지 확인 (`/api/predict`)
- 백엔드 서버가 실행 중인지 확인

## 배포 플랫폼

### AWS EC2
1. EC2 인스턴스 생성
2. Docker 설치
3. 프로젝트 클론
4. `docker-compose up -d` 실행

### Heroku
1. Heroku CLI 설치
2. `heroku create` 실행
3. `heroku container:push web` 실행
4. `heroku container:release web` 실행

### Railway / Render
1. GitHub에 프로젝트 푸시
2. Railway/Render에서 프로젝트 연결
3. Dockerfile 자동 감지
4. 배포 완료


