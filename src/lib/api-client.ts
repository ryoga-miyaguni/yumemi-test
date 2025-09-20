import { type PopulationApiResponse, type PrefecturesApiResponse } from '@/types/api'

// .env.local から読み込む
const BASE_URL = process.env.API_BASE_URL
const API_KEY = process.env.X_API_KEY

if (!BASE_URL || !API_KEY) {
  throw new Error('APIの環境変数が設定されていません')
}

// 共通ヘッダー
const headers = {
  'Content-Type': 'application/json',
  'X-API-KEY': API_KEY,
}

// 人口構成データ取得（年単位）
export async function getPopulation(prefCode: number): Promise<PopulationApiResponse> {
  const res = await fetch(
    `${BASE_URL}/v1/population/composition/perYear?prefCode=${prefCode}`,
    { headers }
  )
  if (!res.ok) {
    throw new Error(`人口データの取得に失敗しました: ${prefCode}`)
  }

  const json: PopulationApiResponse = await res.json()
  if (!json.result) {
    json.result = { boundaryYear: 0, data: [] }
  }

  return json
}

// 都道府県一覧取得
export async function getPrefectures(): Promise<PrefecturesApiResponse> {
  const res = await fetch(`${BASE_URL}/v1/prefectures`, { headers })
  if (!res.ok) {
    throw new Error('都道府県データの取得に失敗しました')
  }
  return res.json()
}
