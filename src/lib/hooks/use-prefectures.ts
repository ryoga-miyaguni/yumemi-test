'use client'

import useSWR from 'swr'
import { type PrefecturesApiResponse } from '@/types/api'

export function usePrefectures() {
  const { data, error, isLoading } = useSWR<PrefecturesApiResponse>(
    '/api/prefectures',
    fetcher
  )

  return { data: data?.result, error, isLoading }
}

async function fetcher(url: string): Promise<PrefecturesApiResponse> {
  const res = await fetch(url)
  if (!res.ok) throw new Error('都道府県データ取得に失敗しました')
  return res.json()
}
