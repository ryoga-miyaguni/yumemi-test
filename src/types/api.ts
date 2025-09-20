// src/types/api.ts

// --- 人口構成 API レスポンス ---
export interface PopulationApiResponse {
  message: null | string
  result: {
    boundaryYear: number
    data: PopulationPerYearItem[]
  }
}

// --- 単純な人口データ（都道府県別） ---
export interface PopulationData {
  value: number
  year: number
}

// --- 年齢構成データ ---
export interface PopulationPerYearData {
  rate: number
  value: number
  year: number
}

export interface PopulationPerYearItem {
  data: PopulationPerYearData[]
  label: string
}

// --- 都道府県 ---
export interface Prefecture {
  prefCode: number
  prefName: string
}

// --- 都道府県 API レスポンス ---
export interface PrefecturesApiResponse {
  message: null | string
  result: Prefecture[]
}
