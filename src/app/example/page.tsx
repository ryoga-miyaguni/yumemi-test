'use client'

import { useState } from 'react'
import { usePrefectures } from '@/lib/hooks/use-prefectures'
import { usePopulation } from '@/lib/hooks/use-population'
import { type PopulationPerYearItem, type Prefecture } from '@/types/api'

export default function Example() {
  const { data: prefectures, error: prefError, isLoading: prefLoading } = usePrefectures()
  const [selectedPrefCode, setSelectedPrefCode] = useState<number | undefined>()

  const { data: population, error: popError, isLoading: popLoading } = usePopulation(selectedPrefCode)

  if (prefLoading || popLoading) return <div>読み込み中...</div>
  if (prefError) return <div>都道府県取得に失敗しました: {prefError.message}</div>
  if (popError) return <div>人口データ取得に失敗しました: {popError.message}</div>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">都道府県一覧</h2>
      <ul className="mb-4 flex flex-wrap gap-2">
        {prefectures?.map((pref: Prefecture) => (
          <li key={pref.prefCode}>
            <button
              className={`px-2 py-1 rounded ${
                selectedPrefCode === pref.prefCode ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setSelectedPrefCode(pref.prefCode)}
            >
              {pref.prefName}
            </button>
          </li>
        ))}
      </ul>

      {selectedPrefCode !== undefined && population && (
        <>
          <h2 className="text-xl font-bold mb-2">人口構成（年別）</h2>
          {population.result.data.map((item: PopulationPerYearItem) => (
            <div className="mb-4" key={item.label}>
              <h3 className="font-semibold">{item.label}</h3>
              <ul className="pl-4 list-disc">
                {item.data.map(d => (
                  <li key={d.year}>
                    {d.year}: {d.value.toLocaleString()} 人
                    {d.rate !== undefined && ` (${d.rate.toFixed(2)}%)`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
