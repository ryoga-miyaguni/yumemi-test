'use client'

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
  activeTab: string
  series: { data: { value: number; year: number; }[]; pref: { prefCode: number; prefName: string }; }[]
}

export default function PopulationChart({ series }: Props) {
  if (series.length === 0) return null

  // X軸用に全ての年を取得（複数県でも共通にする）
  const years = series[0].data.map((d) => d.year)

  // 複数県のデータを年ごとにまとめる
  const chartData = years.map((year, idx) => {
    const entry: { [key: string]: number; year: number; } = { year }
    for (const s of series) {
      entry[s.pref.prefName] = s.data[idx]?.value ?? 0
    }
    return entry
  })

  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart data={chartData} margin={{ bottom: 5, left: 20, right: 30, top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {series.map((s) => (
          <Line
            dataKey={s.pref.prefName}
            dot={false}
            key={s.pref.prefCode}
            stroke={`#${Math.floor(Math.random() * 16_777_215).toString(16)}`} 
            type="monotone"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
