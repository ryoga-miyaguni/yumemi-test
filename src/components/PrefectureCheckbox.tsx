'use client'
import * as Checkbox from '@radix-ui/react-checkbox'
import { type Prefecture } from '@/types/api'
import { Check } from 'lucide-react'

interface Props {
  color: string
  onChange: (prefCode: number, checked: boolean) => void
  prefecture: Prefecture
  selected: boolean
}

export default function PrefectureCheckbox({ color, onChange, prefecture, selected }: Props) {
  return (
    <label className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${color}`}>
      <Checkbox.Root
        checked={selected}
        className="w-5 h-5 border rounded flex items-center justify-center"
        onCheckedChange={(checked) => onChange(prefecture.prefCode, Boolean(checked))}
      >
        <Checkbox.Indicator>
          <Check className="w-4 h-4 text-blue-800" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span>{prefecture.prefName}</span>
    </label>
  )
}
