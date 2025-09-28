'use client'

import { useEffect, useState } from 'react'
import { usePrefectures } from '@/lib/hooks/use-prefectures'
import type { PopulationPerYearData, PopulationPerYearItem, Prefecture } from '@/types/api'

export function usePopulationContainer(selectedPrefCodes: number[], activeTab: string) {
  const { data: prefectures } = usePrefectures()
  const [series, setSeries] = useState<{ data: PopulationPerYearData[]; pref: Prefecture }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    if (!prefectures) return
    if (selectedPrefCodes.length === 0) {
      setSeries([])
      return
    }

    let cancelled = false

    async function fetchAll() {
      setLoading(true)
      setError(null)

      try {
        const promises = selectedPrefCodes.map(async (prefCode) => {
          const res = await fetch(`/api/population/${prefCode}`, { cache: 'no-store' })
          if (!res.ok) {
            const text = await res.text().catch(() => '')
            throw new Error(`pref ${prefCode} fetch failed: ${res.status} ${text}`)
          }
          const json = await res.json()
          return { data: json.result?.data ?? [], prefCode }
        })

        const results = await Promise.allSettled(promises)

        const newSeries = results.map((r, idx) => {
          const prefCode = selectedPrefCodes[idx]
          const pref = prefectures?.find((p) => p.prefCode === prefCode) ?? { prefCode, prefName: '不明' }

          if (r.status === 'fulfilled') {
            const { data } = r.value
            const filtered = (data as PopulationPerYearItem[]).find((item) => item.label === activeTab)
            return { data: filtered?.data ?? [], pref }
          } else {
            console.error(r.reason)
            return { data: [], pref }
          }
        })

        if (!cancelled) {
          setSeries(newSeries)
          if (results.some((r) => r.status === 'rejected')) {
            setError('一部の都道府県の取得に失敗しました（詳細はコンソール）')
          }
        }
      } catch (error_) {
        console.error(error_)
        if (!cancelled) {
          setError('人口データの取得に失敗しました')
          setSeries([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, [selectedPrefCodes, activeTab, prefectures])

  return { error, loading, prefectures, series }
}
