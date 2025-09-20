'use client'

import useSWR from 'swr'
import { type PopulationApiResponse } from '@/types/api'

// カスタムフック本体
export function usePopulation(prefCode?: number) {
  const shouldFetch = prefCode !== undefined

  const { data, error, isLoading } = useSWR<PopulationApiResponse>(
    shouldFetch ? `/api/population/${prefCode}` : undefined,
    fetcher
  )

  return {
    data,
    error,
    isLoading,
  }
}

async function fetcher(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('人口データ取得に失敗しました')
  }
  return res.json()
}
