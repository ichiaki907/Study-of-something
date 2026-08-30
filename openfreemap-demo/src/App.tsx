import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { CategoryFilter } from './components/CategoryFilter'
import type { CategoryFilterValue } from './components/CategoryFilter'
import { MapPoiCard } from './components/MapPoiCard'
import { SpotDetailCard } from './components/SpotDetailCard'
import { TopBar } from './components/TopBar'
import { SPOTS } from './data/spots'
import { MapView } from './map/MapView'
import { DEFAULT_MAP_STYLE } from './map/mapStyles'
import type { MapPoi, MapStyleKey, Spot } from './types'

function App() {
  const [styleKey, setStyleKey] = useState<MapStyleKey>(DEFAULT_MAP_STYLE)
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterValue>('all')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  // 背景地図(OSM)の施設をタップしたときの選択状態
  const [selectedMapPoi, setSelectedMapPoi] = useState<MapPoi | null>(null)
  // 背景地図の施設(POI)は既定で非表示（保存スポットのマーカーを埋もれさせないため）
  const [showPoi, setShowPoi] = useState(false)
  // 既定で Google マップ風のニュートラルな配色を適用する
  const [googleTheme, setGoogleTheme] = useState(true)
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

  // 背景地図の施設を選んだら、保存スポットのカードは閉じる（同時表示を避ける）
  const handleSelectMapPoi = useCallback((poi: MapPoi | null) => {
    setSelectedMapPoi(poi)
    if (poi) setSelectedSpot(null)
  }, [])

  const handleSelectSpot = useCallback((spot: Spot) => {
    setSelectedSpot(spot)
    setSelectedMapPoi(null)
  }, [])

  return (
    <div className="app">
      <MapView
        styleKey={styleKey}
        spots={filteredSpots}
        selectedSpotId={selectedSpot?.id ?? null}
        onSelectSpot={handleSelectSpot}
        onSelectMapPoi={handleSelectMapPoi}
        showPoi={showPoi}
        googleTheme={googleTheme}
        onError={handleMapError}
      />

      <TopBar
        spotCount={SPOTS.length}
        styleKey={styleKey}
        onChangeStyle={setStyleKey}
        showPoi={showPoi}
        onTogglePoi={setShowPoi}
        googleTheme={googleTheme}
        onToggleGoogleTheme={setGoogleTheme}
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
        {selectedMapPoi && (
          <MapPoiCard
            poi={selectedMapPoi}
            onClose={() => setSelectedMapPoi(null)}
          />
        )}
        <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
      </div>
    </div>
  )
}

export default App
