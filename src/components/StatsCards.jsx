import React from 'react'
const Card = ({label, value, hint}) => (
  <div className="bg-panel border border-slate-800 rounded-xl p-5">
    <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
    <div className="text-3xl font-semibold mt-2">{value}</div>
    {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
  </div>
)
export default function StatsCards({ data }) {
  const total = data.length
  const withLogo = data.filter(d => d.logo_in_image).length
  const ironic = data.filter(d => d.ironic).length
  const avgScore = total ? (data.reduce((s,d)=>s+d.mention_score,0)/total).toFixed(2) : '—'
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card label="Total mentions" value={total} />
      <Card label="With brand logo" value={withLogo} hint={total?`${Math.round(withLogo/total*100)}% of total`:''} />
      <Card label="Ironic / sarcastic" value={ironic} hint="missed by text-only tools" />
      <Card label="Avg mention score" value={avgScore} />
    </div>
  )
}
