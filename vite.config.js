import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sudoku-game/', // GitHub 레포지토리 이름에 맞게 수정
})
