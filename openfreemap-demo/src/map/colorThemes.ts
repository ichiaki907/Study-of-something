import type { MapLibreMap } from 'maplibre-gl'
import type { ColorThemeKey } from '../types'

/**
 * 背景地図の配色テーマ。
 *
 * OpenFreeMap のスタイルをそのまま使うのではなく、実行時に paint プロパティを
 * 上書きして配色を差し替える。適用前の値はスナップショットに退避しており、
 * 「デフォルト」に戻すとスタイル本来の配色へ復元される。
 *
 * パターンを増やす場合は ColorThemeKey にキーを足し、
 * COLOR_THEMES と THEME_CONFIGS に定義を追加する。
 */

/** 各テーマが持つ色の一式 */
interface Palette {
  land: string
  landSubtle: string
  urban: string
  green: string
  farmland: string
  water: string
  building: string
  buildingTop: string
  road: string
  roadCasing: string
  trunk: string
  trunkCasing: string
  arterial: string
  arterialCasing: string
  motorway: string
  motorwayCasing: string
  rail: string
  path: string
}

interface ThemeConfig {
  palette: Palette
  /** 森林(landcover class=wood)の不透明度 */
  woodOpacity: number
  /** 草地・公園の不透明度の下限 */
  greenMinOpacity: number
  /** 追加する農地レイヤーの不透明度 */
  farmlandOpacity: number
  /** 建物の輪郭色 */
  buildingOutline: string
  /** POI・道路名ラベルの文字色 */
  labelText: string
  /** ラベルの縁取り色 */
  labelHalo: string
  /** ラベルの縁取りの太さ */
  labelHaloWidth: number
}

/** 画面に出す配色テーマの一覧 */
export const COLOR_THEMES: Record<
  ColorThemeKey,
  { label: string; note: string }
> = {
  default: {
    label: 'デフォルト',
    note: 'OpenFreeMap 本来の配色（スタイルをそのまま表示）',
  },
  google: {
    label: 'Google風',
    note: '一般的な地図アプリに寄せた配色',
  },
  contrast: {
    label: '高コントラスト',
    note: '屋外・直射日光下でも判別しやすい強めの配色',
  },
}

/** 起動時に適用する配色テーマ */
export const DEFAULT_COLOR_THEME: ColorThemeKey = 'google'

/**
 * Google マップ風。
 * スクリーンショットの画素値を実測して組み立てている。
 * 街区を明るく・道路を暗くし、道路は3階層で塗り分ける。
 */
const GOOGLE_THEME: ThemeConfig = {
  palette: {
    land: '#f5f5f5',
    landSubtle: '#f0f0f0',
    urban: '#f3f3f3',
    green: '#c3e7cd',
    farmland: '#d5eedb',
    water: '#a0d6ea',
    building: '#e8e6e7',
    buildingTop: '#eeecee',
    road: '#e4e9f0',
    roadCasing: '#d3dae3',
    trunk: '#c9d2de',
    trunkCasing: '#b2bcca',
    arterial: '#d9e0e9',
    arterialCasing: '#c2cad6',
    motorway: '#f9d79f',
    motorwayCasing: '#efb96a',
    rail: '#d6d6d3',
    path: '#dcdcd8',
  },
  woodOpacity: 0.9,
  greenMinOpacity: 0.75,
  farmlandOpacity: 0.85,
  buildingOutline: '#d8d8d4',
  labelText: '#43464a',
  labelHalo: '#ffffff',
  labelHaloWidth: 1.2,
}

/**
 * 高コントラスト。
 *
 * スタンプラリーのように屋外で使う場面を想定し、
 * 直射日光下・低輝度の画面でも要素を判別できるように振っている。
 * Google風より各要素の明度差を大きく取り、彩度も上げる。
 * 陸地を純白にして、その上に乗る道路・緑・水との差を最大化する。
 */
const CONTRAST_THEME: ThemeConfig = {
  palette: {
    land: '#ffffff',
    landSubtle: '#eeeeee',
    urban: '#f7f7f7',
    green: '#a5d9a0',
    farmland: '#cfe9b8',
    water: '#5fb0e5',
    building: '#d5d5d5',
    buildingTop: '#dedede',
    road: '#c9d0da',
    roadCasing: '#98a2b0',
    trunk: '#8496ab',
    trunkCasing: '#5f7188',
    arterial: '#a9b6c6',
    arterialCasing: '#7d8b9d',
    motorway: '#f5a623',
    motorwayCasing: '#c97d10',
    rail: '#9a9a9a',
    path: '#b5b5b5',
  },
  woodOpacity: 1,
  greenMinOpacity: 0.95,
  farmlandOpacity: 0.95,
  buildingOutline: '#b0b0b0',
  labelText: '#111318',
  labelHalo: '#ffffff',
  labelHaloWidth: 2,
}

/** default は「何も上書きしない」ため設定を持たない */
const THEME_CONFIGS: Partial<Record<ColorThemeKey, ThemeConfig>> = {
  google: GOOGLE_THEME,
  contrast: CONTRAST_THEME,
}

/** 追加する農地レイヤーの ID（復元時に削除するため固定値で持つ） */
const FARMLAND_LAYER_ID = 'ofm-demo-farmland'

interface ColorRule {
  test: RegExp
  color: string
}

/**
 * 上から順に評価し、最初に一致したルールを適用する（順序が重要）。
 * 例: "highway-path" は道路ルールより先に path ルールへ当てる。
 *
 * レイヤーIDの区切り文字はスタイルによって異なる点に注意。
 * bright/positron はハイフン（tunnel-minor）だが
 * liberty はアンダースコア（tunnel_minor）を使うため、
 * 区切りを含むパターンは [-_] で両方に対応させている。
 */
function rulesFor(p: Palette): ColorRule[] {
  return [
    { test: /^water$|^water[-_]|^waterway/, color: p.water },
    { test: /park|grass|wood|forest/, color: p.green },
    { test: /^building[-_]top$/, color: p.buildingTop },
    { test: /^building/, color: p.building },
    // 高速道路
    { test: /motorway.*casing/, color: p.motorwayCasing },
    { test: /motorway/, color: p.motorway },
    // 国道（trunk / primary）
    { test: /(trunk|primary).*casing/, color: p.trunkCasing },
    { test: /(trunk|primary)/, color: p.trunk },
    // 県道（secondary / tertiary）
    { test: /(secondary|tertiary).*casing/, color: p.arterialCasing },
    { test: /(secondary|tertiary)/, color: p.arterial },
    // 生活道路のケーシング
    { test: /casing/, color: p.roadCasing },
    { test: /rail|cablecar/, color: p.rail },
    { test: /path/, color: p.path },
    {
      test: /highway|street|bridge[-_]|tunnel[-_]|road[-_]|aeroway/,
      color: p.road,
    },
    // 市街地は汎用の landuse ルールより前に評価する
    {
      test: /landuse[-_](residential|suburb|commercial|industrial|retail)/,
      color: p.urban,
    },
    { test: /landuse|landcover/, color: p.landSubtle },
    { test: /^background$/, color: p.land },
  ]
}

/** レイヤー種別ごとの「色を持つ paint プロパティ名」 */
function colorPropertyFor(layerType: string): string | null {
  switch (layerType) {
    case 'background':
      return 'background-color'
    case 'fill':
      return 'fill-color'
    case 'line':
      return 'line-color'
    case 'fill-extrusion':
      return 'fill-extrusion-color'
    default:
      return null
  }
}

/** テーマ適用前の状態を退避しておくためのスナップショット */
export interface ThemeSnapshot {
  /** 変更した paint プロパティの元の値 */
  paints: Map<string, { property: string; value: unknown }>
  /** テーマ適用時に追加したレイヤーの ID */
  addedLayerIds: string[]
}

/** 元の値を退避してから paint プロパティを設定する */
function setPaint(
  map: MapLibreMap,
  layerId: string,
  property: string,
  value: unknown,
  snapshot: ThemeSnapshot,
): void {
  snapshot.paints.set(`${layerId}::${property}`, {
    property,
    value: map.getPaintProperty(layerId, property),
  })
  map.setPaintProperty(layerId, property, value)
}

/**
 * 山地の緑を強調する。
 *
 * OpenFreeMap には森林・農地のデータ（landcover レイヤーの
 * class=wood / farmland）が入っているが、既定のスタイルでは
 * - 森林の不透明度が非常に低い（bright=0.1 / liberty=0.4）
 * - 農地を描くレイヤーがそもそも存在しない（3スタイルとも）
 * ため、山間部がほとんど白いままになる。
 * 森林を濃くし、農地レイヤーを追加して「山の緑」を出す。
 */
function emphasizeLandcover(
  map: MapLibreMap,
  theme: ThemeConfig,
  snapshot: ThemeSnapshot,
): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  // 森林レイヤー（bright はハイフン、liberty/positron はアンダースコア）
  const woodLayer = layers.find((l) => /^landcover[-_]wood$/.test(l.id))
  if (woodLayer) {
    setPaint(map, woodLayer.id, 'fill-opacity', theme.woodOpacity, snapshot)
  }

  // 草地・公園も既定の不透明度が低く色が飛ぶため底上げする。
  // ズームで変化する式が入っている場合は数値比較できないので、
  // 数値で指定されていて十分濃いときだけそのまま残す。
  for (const layer of layers) {
    if (!/^park$|^landcover[-_]grass/.test(layer.id)) continue

    const current = map.getPaintProperty(layer.id, 'fill-opacity')
    if (typeof current === 'number' && current >= theme.greenMinOpacity) continue

    setPaint(map, layer.id, 'fill-opacity', theme.greenMinOpacity, snapshot)
  }

  // 農地レイヤーを追加する。データ(class=farmland)は存在するのに
  // どのスタイルも描画していないため、自前で足す。
  if (!map.getLayer(FARMLAND_LAYER_ID) && map.getSource('openmaptiles')) {
    // 道路やラベルより下に入れる。森林レイヤーの直前が最も自然。
    const beforeId =
      woodLayer?.id ??
      layers.find((l) => /^water/.test(l.id))?.id ??
      layers.find((l) => l.type === 'symbol')?.id

    // 適切な挿入位置が見つからない場合は、道路の上に乗ってしまうので追加しない
    if (beforeId) {
      map.addLayer(
        {
          id: FARMLAND_LAYER_ID,
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landcover',
          filter: ['==', ['get', 'class'], 'farmland'],
          paint: {
            'fill-color': theme.palette.farmland,
            'fill-opacity': theme.farmlandOpacity,
          },
        },
        beforeId,
      )
      snapshot.addedLayerIds.push(FARMLAND_LAYER_ID)
    }
  }
}

/**
 * ラベルの視認性を上げる。
 *
 * OpenFreeMap 既定では POI と道路名の文字色が #666 と薄く、
 * さらに道路名は text-halo-color が未指定で白フチが付かないため、
 * 道路の上に重なると読みにくい。文字を濃くし、白フチを付ける。
 * 町名・都市名は元から #333 / #000 なので触らない。
 */
function strengthenLabelContrast(
  map: MapLibreMap,
  theme: ThemeConfig,
  snapshot: ThemeSnapshot,
): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  for (const layer of layers) {
    if (layer.type !== 'symbol') continue
    if (!/^poi|highway[-_]name/.test(layer.id)) continue

    setPaint(map, layer.id, 'text-color', theme.labelText, snapshot)
    setPaint(map, layer.id, 'text-halo-color', theme.labelHalo, snapshot)
    setPaint(map, layer.id, 'text-halo-width', theme.labelHaloWidth, snapshot)
  }
}

/**
 * 配色テーマを適用し、元の状態を復元するためのスナップショットを返す。
 * default（上書きしないテーマ）の場合は null を返す。
 */
export function applyColorTheme(
  map: MapLibreMap,
  themeKey: ColorThemeKey,
): ThemeSnapshot | null {
  const theme = THEME_CONFIGS[themeKey]
  if (!theme) return null

  const snapshot: ThemeSnapshot = { paints: new Map(), addedLayerIds: [] }
  const layers = map.getStyle()?.layers
  if (!layers) return snapshot

  const rules = rulesFor(theme.palette)

  for (const layer of layers) {
    const property = colorPropertyFor(layer.type)
    if (!property) continue

    const rule = rules.find((r) => r.test.test(layer.id))
    if (!rule) continue

    setPaint(map, layer.id, property, rule.color, snapshot)

    // 建物は塗りだけだと輪郭が潰れるので、うっすら枠線を足す
    if (layer.type === 'fill' && /^building/.test(layer.id)) {
      setPaint(
        map,
        layer.id,
        'fill-outline-color',
        theme.buildingOutline,
        snapshot,
      )
    }
  }

  // 山地の緑（森林・農地）を強調する
  emphasizeLandcover(map, theme, snapshot)

  // POI・道路名ラベルの視認性を上げる
  strengthenLabelContrast(map, theme, snapshot)

  return snapshot
}

/** applyColorTheme で退避した元の状態へ戻す */
export function restoreTheme(map: MapLibreMap, snapshot: ThemeSnapshot): void {
  // 追加したレイヤーを取り除く
  for (const layerId of snapshot.addedLayerIds) {
    if (map.getLayer(layerId)) map.removeLayer(layerId)
  }

  // paint プロパティを元に戻す
  for (const [key, { property, value }] of snapshot.paints) {
    const layerId = key.slice(0, key.lastIndexOf('::'))
    if (!map.getLayer(layerId)) continue
    map.setPaintProperty(layerId, property, value)
  }
}
