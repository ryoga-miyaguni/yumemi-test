'use client'

import PrefectureCheckbox from './PrefectureCheckbox'
import { usePrefectures } from '@/lib/hooks/use-prefectures'
import { getRegionColor } from '@/lib/regions'

interface Props {
  onChange: (selected: number[]) => void
  selected: number[]
}

export default function PrefectureList({ onChange, selected }: Props) {
  const { data: prefectures, error, isLoading } = usePrefectures()

  function handleChange(prefCode: number, checked: boolean) {
    onChange(checked ? [...selected, prefCode] : selected.filter(c => c !== prefCode))
  }

  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>都道府県の取得に失敗しました</p>
  if (!prefectures) return null

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
      {prefectures.map(pref => (
        <PrefectureCheckbox
          color={getRegionColor(pref.prefName)}
          key={pref.prefCode}
          onChange={handleChange}
          prefecture={pref}
          selected={selected.includes(pref.prefCode)}
        />
      ))}
    </div>
  )
}
