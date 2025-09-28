'use client'

import PopulationChart from './PopulationChart'
import { usePopulationData } from '@/lib/hooks/use-population-data'

interface Props {
  activeTab: '年少人口' | '生産年齢人口' | '総人口' | '老年人口'
  selectedPrefCodes: number[]
}

export default function PopulationChartWrapper({ activeTab, selectedPrefCodes }: Props) {
  const { error, loading, series } = usePopulationData(selectedPrefCodes, activeTab)

  if (loading) return <p>読み込み中...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (series.length === 0) return <p>データがありません</p>

  return (
    <div className="overflow-x-auto">
      <PopulationChart activeTab={activeTab} series={series} />
    </div>
  )
}
