'use client'

import { usePopulationContainer } from './PopulationContainer'

interface Props {
  activeTab: '年少人口' | '生産年齢人口' | '総人口' | '老年人口'
  selectedPrefCodes: number[]
}

export default function PopulationChart({ activeTab, selectedPrefCodes }: Props) {
  const { error, loading, series } = usePopulationContainer(selectedPrefCodes, activeTab)

  if (loading) return <p>読み込み中...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      {series.map(({ data, pref }) => (
        <div key={pref.prefCode} style={{ marginBottom: '16px' }}>
          <h3>{pref.prefName} ({activeTab})</h3>
          <ul>
            {data.map(d => (
              <li key={d.year}>{d.year}: {d.value.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
