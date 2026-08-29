import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { CategoryFilter } from './components/CategoryFilter'
import type { CategoryFilterValue } from './components/CategoryFilter'
import { MapPoiCard } from './components/MapPoiCard'
import { SpotDetailCard } from './components/SpotDetailCard'
import { TopBar } from './components/TopBar'
import { SPOTS } from './data/spots'
import { MapView } from './map/MapView'
import { categoryForPoiClass } from './map/poiQuery'
import { DEFAULT_MAP_STYLE } from './map/mapStyles'
import type { MapPoi, MapStyleKey, Spot } from './types'

function App() {
  const [styleKey, setStyleKey] = useState<MapStyleKey>(DEFAULT_MAP_STYLE)
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterValue>('all')
  // 保存スポット。初期値は固定データで、地図上の施設から追加できる
  // （将来的にはこの配列を D1 等のバックエンドに置き換える想定）
  const [spots, setSpots] = useState<Spot[]>(SPOTS)
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
        ? spots
        : spots.filter((spot) => spot.category === categoryFilter),
    [categoryFilter, spots],
  )

  // 地図上の施設を保存スポットへ追加する
  const handleSaveMapPoi = useCallback((poi: MapPoi) => {
    setSpots((prev) => {
      if (prev.some((spot) => spot.id === poi.id)) return prev
      return [
        ...prev,
        {
          id: poi.id,
          name: poi.name,
          category: categoryForPoiClass(poi.poiClass),
          latitude: poi.latitude,
          longitude: poi.longitude,
          description: '地図上の施設から追加したスポット。',
        },
      ]
    })
    setSelectedMapPoi(null)
  }, [])

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
        spotCount={spots.length}
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
            saved={spots.some((spot) => spot.id === selectedMapPoi.id)}
            onSave={handleSaveMapPoi}
            onClose={() => setSelectedMapPoi(null)}
          />
        )}
        <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
      </div>
    </div>
  )
}

export default App
