'use client'

import { useEffect, useState } from 'react'
import { usePrefectures } from '@/lib/hooks/use-prefectures'
import type { PopulationPerYearData, PopulationPerYearItem, Prefecture } from '@/types/api'

export function usePopulationData(selectedPrefCodes: number[], activeTab: string) {
  const { data: prefectures } = usePrefectures()
  const [series, setSeries] = useState<{ data: PopulationPerYearData[]; pref: Prefecture; }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    if (!prefectures || selectedPrefCodes.length === 0) {
      setSeries([])
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    async function fetchAll() {
      try {
        const results = await Promise.all(
          selectedPrefCodes.map(async (prefCode) => {
            const res = await fetch(`/api/population/${prefCode}`, { cache: 'no-store' })
            if (!res.ok) throw new Error(`pref ${prefCode} fetch failed`)
            const json = await res.json()
            const data = (json.result?.data ?? []).find((item: PopulationPerYearItem) => item.label === activeTab)
            const pref = (prefectures?.find((p) => p.prefCode === prefCode)) ?? { prefCode, prefName: '不明' }
            return { data: data?.data ?? [], pref }
          })
        )

        if (!cancelled) setSeries(results)
      } catch (error_) {
        console.error(error_)
        if (!cancelled) setError('人口データの取得に失敗しました')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, [selectedPrefCodes, activeTab, prefectures])

  return { error, loading, series }
}
