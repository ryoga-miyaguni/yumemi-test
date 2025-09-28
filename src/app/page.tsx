'use client'

import { useState } from 'react'
import PrefectureList from '@/components/PrefectureList'
import PopulationTabs from '@/components/PopulationTabs'
import PopulationChartWrapper from '@/components/PopulationChartWrapper'

type ActiveTab = '年少人口' | '生産年齢人口' | '総人口' | '老年人口'

export default function Page() {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<ActiveTab>('総人口')

  return (
    <main>
      {/* 都道府県チェックボックス */}
      <PrefectureList
        onChange={setSelectedPrefCodes}
        selected={selectedPrefCodes}
      />

      {/* 人口タブ */}
      <PopulationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 人口チャート */}
      <PopulationChartWrapper
        activeTab={activeTab}
        selectedPrefCodes={selectedPrefCodes}
      />
    </main>
  )
}
