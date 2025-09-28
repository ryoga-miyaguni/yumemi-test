'use client'

interface Props {
  activeTab: '年少人口' | '生産年齢人口' | '総人口' | '老年人口'
  setActiveTab: (tab: Props['activeTab']) => void
}

export default function PopulationTabs({ activeTab, setActiveTab }: Props) {
  const tabs: Props['activeTab'][] = ['総人口', '年少人口', '生産年齢人口', '老年人口']

  return (
    <div style={{ marginBottom: '16px', marginTop: '16px' }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{ fontWeight: activeTab === tab ? 'bold' : 'normal', marginRight: '8px' }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
