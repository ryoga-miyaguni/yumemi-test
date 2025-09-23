'use client'
import PrefectureCheckbox from './PrefectureCheckbox'
import { useState } from 'react'
import { usePrefectures } from '@/lib/hooks/use-prefectures'

export default function PrefectureList() {
  const { data: prefectures, error, isLoading } = usePrefectures()
  const [selectedCodes, setSelectedCodes] = useState<number[]>([])

  function handleChange(prefCode: number, checked: boolean) {
  setSelectedCodes(prev =>
    checked ? [...prev, prefCode] : prev.filter(code => code !== prefCode)
  )
  }


  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>都道府県の取得に失敗しました</p>

  if (!prefectures) return
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {prefectures.map(pref => (
        <PrefectureCheckbox
          key={pref.prefCode}
          onChange={handleChange}
          prefecture={pref}
          selected={selectedCodes.includes(pref.prefCode)}
        />
      ))}
    </div>
  )
}
