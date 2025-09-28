'use client'

interface Props {
  activeTab: '年少人口' | '生産年齢人口' | '総人口' | '老年人口'
  setActiveTab: (tab: Props['activeTab']) => void
}

export default function PopulationTabs({ activeTab, setActiveTab }: Props) {
  const tabs: Props['activeTab'][] = ['総人口', '年少人口', '生産年齢人口', '老年人口']

  return (
    <div className="grid grid-cols-2 gap-2 my-4 max-w-md mx-auto sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
      {tabs.map((tab) => (
        <button
          className={`
            px-2 py-1 sm:px-3 sm:py-1.5 text-sm rounded 
            ${activeTab === tab ? 'font-bold text-blue-700 border-b-2 border-blue-700' : 'font-normal text-gray-600'}
            hover:text-blue-500
            transition-colors
          `}
          key={tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
