import React, { useEffect, useMemo, useState } from 'react'
import StatsCards from './components/StatsCards.jsx'
import SentimentChart from './components/SentimentChart.jsx'
import MentionsTable from './components/MentionsTable.jsx'
import FilterBar from './components/FilterBar.jsx'

const SAMPLE_URL = '/sample_data/mentions.json'

export default function App() {
  const [data, setData] = useState([])
  const [brand, setBrand] = useState('all')
  const [source, setSource] = useState('all')

  useEffect(() => {
    // Try fetching local sample data; fall back to inline.
    fetch(SAMPLE_URL).then(r => r.ok ? r.json() : Promise.reject()).then(setData).catch(() => {
      import('./fallback.js').then(m => setData(m.default))
    })
  }, [])

  const filtered = useMemo(() => data.filter(d =>
    (brand === 'all' || d.brand === brand) &&
    (source === 'all' || d.source === source)
  ), [data, brand, source])

  const brands  = useMemo(() => ['all', ...new Set(data.map(d => d.brand).filter(Boolean))], [data])
  const sources = useMemo(() => ['all', ...new Set(data.map(d => d.source).filter(Boolean))], [data])

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-panel/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent2" />
            <div>
              <h1 className="text-lg font-semibold">ContextLayer</h1>
              <p className="text-xs text-slate-400">Multi-modal social listening · Images + Text</p>
            </div>
          </div>
          <div className="text-xs text-slate-400">Claude 3.5 Sonnet · Make.com · Airtable</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <StatsCards data={filtered} />
        <FilterBar brand={brand} setBrand={setBrand} source={source} setSource={setSource} brands={brands} sources={sources} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1"><SentimentChart data={filtered} /></div>
          <div className="lg:col-span-2"><MentionsTable data={filtered} /></div>
        </div>
        <footer className="text-xs text-slate-500 pt-6 border-t border-slate-800">
          ContextLayer captures ~30% more brand mentions than text-only listening by analyzing image content, logos, and ironic context.
        </footer>
      </main>
    </div>
  )
}
