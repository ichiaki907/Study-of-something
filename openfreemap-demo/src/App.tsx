import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { CategoryFilter } from './components/CategoryFilter'
import type { CategoryFilterValue } from './components/CategoryFilter'
import { SpotDetailCard } from './components/SpotDetailCard'
import { TopBar } from './components/TopBar'
import { SPOTS } from './data/spots'
import { MapView } from './map/MapView'
import { DEFAULT_MAP_STYLE } from './map/mapStyles'
import type { MapStyleKey, Spot } from './types'

function App() {
  const [styleKey, setStyleKey] = useState<MapStyleKey>(DEFAULT_MAP_STYLE)
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterValue>('all')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  // 背景地図の POI は既定で非表示（保存スポットのマーカーを埋もれさせないため）
  const [showPoi, setShowPoi] = useState(false)
  // 地図の読み込みエラーを画面上で確認できるようにする（診断用のバナー表示）
  const [mapErrors, setMapErrors] = useState<string[]>([])
  const handleMapError = useCallback((message: string) => {
    setMapErrors((prev) =>
      prev.includes(message) || prev.length >= 8 ? prev : [...prev, message],
    )
  }, [])

  const filteredSpots = useMemo(
    () =>
      categoryFilter === 'all'
        ? SPOTS
        : SPOTS.filter((spot) => spot.category === categoryFilter),
    [categoryFilter],
  )

  return (
    <div className="app">
      <MapView
        styleKey={styleKey}
        spots={filteredSpots}
        selectedSpotId={selectedSpot?.id ?? null}
        onSelectSpot={setSelectedSpot}
        showPoi={showPoi}
        onError={handleMapError}
      />

      <TopBar
        spotCount={SPOTS.length}
        styleKey={styleKey}
        onChangeStyle={setStyleKey}
        showPoi={showPoi}
        onTogglePoi={setShowPoi}
      />

      {mapErrors.length > 0 && (
        <div className="map-error-banner" role="alert">
          <strong>地図の読み込み状況（診断用）:</strong>
          <ul>
            {mapErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          <button type="button" onClick={() => setMapErrors([])}>
            閉じる
          </button>
        </div>
      )}

      <div className="bottom-area">
        {selectedSpot && (
          <SpotDetailCard
            spot={selectedSpot}
            onClose={() => setSelectedSpot(null)}
          />
        )}
        <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
      </div>
    </div>
  )
}

export default App
