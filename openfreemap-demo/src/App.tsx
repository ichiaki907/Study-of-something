import { useMemo, useState } from 'react'
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
      />

      <TopBar
        spotCount={SPOTS.length}
        styleKey={styleKey}
        onChangeStyle={setStyleKey}
      />

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
