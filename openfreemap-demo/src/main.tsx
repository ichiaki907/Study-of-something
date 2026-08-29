import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// MapLibre のベース CSS は先に読み込み、index.css / App.css 側の
// レイアウト指定（.map-container の position 等）で確実に上書きできるようにする
import 'maplibre-gl/dist/maplibre-gl.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
