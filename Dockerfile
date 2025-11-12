# 멀티 스테이지 빌드
# Stage 1: 프론트엔드 빌드
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# 프론트엔드 의존성 설치
COPY Front/package.json Front/package-lock.json ./
RUN npm ci

# 프론트엔드 소스 복사 및 빌드
COPY Front/ ./
# 프론트엔드 빌드 시 API URL 환경 변수 설정
ENV REACT_APP_API_URL=/api
RUN npm run build

# Stage 2: 백엔드 실행
FROM python:3.10-slim

WORKDIR /app

# 시스템 의존성 설치 (OpenCV 등에 필요)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# 백엔드 의존성 설치
COPY Back/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 백엔드 소스 및 모델 파일 복사
COPY Back/ ./

# 시작 스크립트 복사
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 프론트엔드 빌드 파일 복사
COPY --from=frontend-builder /app/frontend/build ./../Front/build

# 포트 노출 (Railway, Render 등은 동적 포트 사용)
EXPOSE 8000

# 애플리케이션 실행
CMD ["/start.sh"]

