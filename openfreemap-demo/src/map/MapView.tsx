import {
  GeolocateControl,
  MapLibreMap,
  Marker,
  NavigationControl,
} from 'maplibre-gl'
// maplibre-gl.css は main.tsx の先頭で読み込み、App.css で
// .map-container 等のレイアウト上書きが確実に効くようにしている
import { useEffect, useRef } from 'react'
import { CATEGORY_STYLE } from './categoryStyle'
import { MAP_STYLES } from './mapStyles'
import type { MapStyleKey, Spot } from '../types'

/**
 * このデモにおける「地図まわりの処理」をすべて集約したコンポーネント。
 *
 * MapLibre GL JS / OpenFreeMap への依存はこのファイルに閉じ込めてあり、
 * 呼び出し側（App.tsx）は Spot の配列とコールバックだけを渡す。
 * 将来的に地図ライブラリやタイル配信元（PMTiles 等）を差し替える場合も
 * 影響範囲はこのファイル周辺に収まる想定。
 */

// 初期表示地点: 大阪駅・梅田周辺
const INITIAL_CENTER: [number, number] = [135.4959, 34.7025]
const INITIAL_ZOOM = 14

interface MapViewProps {
  styleKey: MapStyleKey
  spots: Spot[]
  selectedSpotId: string | null
  onSelectSpot: (spot: Spot) => void
  /** スタイル・タイル読み込みなど地図まわりのエラーを呼び出し側へ通知する（診断用） */
  onError?: (message: string) => void
}

export function MapView({
  styleKey,
  spots,
  selectedSpotId,
  onSelectSpot,
  onError,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef(new Map<string, Marker>())
  // 最新の onSelectSpot / onError をイベントハンドラから参照するための ref
  // （マーカー自体はスポット一覧が変わった時だけ作り直すため、クロージャが古くならないようにする）
  const onSelectSpotRef = useRef(onSelectSpot)
  onSelectSpotRef.current = onSelectSpot
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  // 地図の初期化（マウント時に一度だけ）
  useEffect(() => {
    if (!containerRef.current) return

    const map = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLES[styleKey].url,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      attributionControl: { compact: true },
    })
    mapRef.current = map

    map.addControl(new NavigationControl(), 'top-right')

    const geolocate = new GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserLocation: true,
    })
    map.addControl(geolocate, 'top-right')
    // 位置情報が拒否・取得失敗しても例外にせず、コンソールに残すだけにする
    geolocate.on('error', (event: GeolocationPositionError) => {
      console.warn('現在地を取得できませんでした:', event.message)
    })

    // スタイル/タイル取得失敗などを画面上で確認できるようにする（診断用）
    map.on('error', (event) => {
      const message = event.error?.message ?? '不明な地図エラー'
      console.error('MapLibre error:', message)
      onErrorRef.current?.(`[error] ${message}`)
    })

    // 背景色だけが描画され、道路や地名などのデータレイヤーが出ない状態を
    // 検知するための保険。描画が落ち着いた時点でフィーチャが1件も無ければ
    // 診断情報を出す（正常に描画できている場合は何も表示しない）。
    map.on('idle', () => {
      try {
        if (map.queryRenderedFeatures().length > 0) return
        const style = map.getStyle()
        const sourceCount = Object.keys(style?.sources ?? {}).length
        const layerCount = style?.layers?.length ?? 0
        onErrorRef.current?.(
          `[診断] 地図データが描画されていません（sources=${sourceCount} layers=${layerCount}）`,
        )
      } catch (e) {
        onErrorRef.current?.(
          `[診断] 状態取得に失敗: ${e instanceof Error ? e.message : String(e)}`,
        )
      }
    })

    // MapLibre 自身のエラーイベント経由で拾えない例外（Web Worker生成失敗など）
    // を捕捉するための保険（診断用）
    const handleWindowError = (event: ErrorEvent) => {
      onErrorRef.current?.(`[window.onerror] ${event.message}`)
    }
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message =
        reason instanceof Error ? reason.message : String(reason)
      onErrorRef.current?.(`[unhandledrejection] ${message}`)
    }
    window.addEventListener('error', handleWindowError)
    window.addEventListener('unhandledrejection', handleRejection)

    const markers = markersRef.current
    return () => {
      window.removeEventListener('error', handleWindowError)
      window.removeEventListener('unhandledrejection', handleRejection)
      markers.forEach((marker) => marker.remove())
      markers.clear()
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 初期化は一度だけ行う
  }, [])

  // スタイル切り替え（Liberty / Positron / Bright）
  // マーカーは DOM 要素として地図に重ねているだけなので setStyle の影響を受けず残り続ける
  useEffect(() => {
    mapRef.current?.setStyle(MAP_STYLES[styleKey].url)
  }, [styleKey])

  // 表示中スポット（フィルター適用後）に合わせてマーカーを同期する
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers = markersRef.current
    const nextIds = new Set(spots.map((spot) => spot.id))

    // フィルターで消えたスポットのマーカーを削除
    for (const [id, marker] of markers) {
      if (!nextIds.has(id)) {
        marker.remove()
        markers.delete(id)
      }
    }

    // 新規スポットのマーカーを追加
    for (const spot of spots) {
      if (markers.has(spot.id)) continue

      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'spot-marker'
      el.style.setProperty(
        '--marker-color',
        CATEGORY_STYLE[spot.category].color,
      )
      el.setAttribute('aria-label', spot.name)

      const iconEl = document.createElement('span')
      iconEl.className = 'spot-marker__icon'
      iconEl.textContent = CATEGORY_STYLE[spot.category].icon
      el.appendChild(iconEl)
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        onSelectSpotRef.current(spot)
      })

      const marker = new Marker({ element: el, anchor: 'bottom' })
        .setLngLat([spot.longitude, spot.latitude])
        .addTo(map)

      markers.set(spot.id, marker)
    }
  }, [spots])

  // 選択中スポットのマーカーに選択状態のスタイルを付与
  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      marker
        .getElement()
        .classList.toggle('spot-marker--selected', id === selectedSpotId)
    }
  }, [selectedSpotId, spots])

  return <div ref={containerRef} className="map-container" />
}
