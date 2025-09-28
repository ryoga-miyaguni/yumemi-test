'use client'

import { useState } from 'react'
import PrefectureList from '@/components/PrefectureList'
import PopulationTabs from '@/components/PopulationTabs'
import PopulationChart from '@/components/PopulationChart'

type ActiveTab = '年少人口' | '生産年齢人口' | '総人口' | '老年人口'

export default function Page() {
  const [selectedCodes, setSelectedCodes] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<ActiveTab>('総人口')

  return (
    <main>
      {/* 都道府県チェックボックス */}
      <PrefectureList onChange={setSelectedCodes} selected={selectedCodes} />

      {/* 人口タブ */}
      <PopulationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 人口データ出力 */}
      <PopulationChart activeTab={activeTab} selectedPrefCodes={selectedCodes} />
    </main>
  )
}
