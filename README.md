# Sudoku Game 🧩

웹 브라우저에서 즐길 수 있는 React 기반 스도쿠 게임입니다.

## 🎮 플레이

https://[YOUR_USERNAME].github.io/sudoku-game/

## ✨ 기능

- **4단계 난이도**: 쉬움, 보통, 어려움, 전문가
- **게임 타이머**: 실시간 진행 시간 표시
- **스마트 하이라이트**: 선택한 셀의 행/열/박스 표시
- **충돌 감지**: 잘못된 숫자 입력 시 시각적 피드백
- **키보드 지원**: 방향키 이동, 숫자키 입력
- **반응형 디자인**: 모바일에서도 플레이 가능

## 🚀 로컬 실행

```bash
npm install
npm run dev
```

## 📦 GitHub Pages 배포

```bash
# GitHub 레포지토리 생성 후
git init
git remote add origin https://github.com/[YOUR_USERNAME]/sudoku-game.git
git add .
git commit -m "Initial commit"
git push -u origin main

# 배포
npm run deploy
```

GitHub 레포지토리 Settings → Pages에서 Source를 `gh-pages` 브랜치로 설정하세요.

## 🛠 기술 스택

- React 19
- Vite 7
- Vanilla CSS (glassmorphism 디자인)
