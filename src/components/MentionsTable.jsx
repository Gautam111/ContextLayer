import React from 'react'
const Badge = ({tone, children}) => {
  const tones = {
    positive:'bg-green-500/15 text-green-300 border-green-500/30',
    negative:'bg-red-500/15 text-red-300 border-red-500/30',
    neutral: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    ironic:  'bg-amber-500/15 text-amber-300 border-amber-500/30',
    logo:    'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  }
  return <span className={`text-[10px] px-2 py-0.5 rounded border ${tones[tone]||tones.neutral}`}>{children}</span>
}
export default function MentionsTable({ data }) {
  return (
    <div className="bg-panel border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-semibold">Classified mentions</h3>
        <span className="text-xs text-slate-400">{data.length} rows</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-slate-400 bg-slate-900/40">
            <tr>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Signals</th>
              <th className="px-4 py-3 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id} className="border-t border-slate-800/60 hover:bg-slate-800/20">
                <td className="px-4 py-3 text-slate-400">{d.source}</td>
                <td className="px-4 py-3 font-medium">{d.brand || '—'}</td>
                <td className="px-4 py-3 max-w-md truncate text-slate-300">{d.text}</td>
                <td className="px-4 py-3 space-x-1">
                  {d.logo_in_image && <Badge tone="logo">logo</Badge>}
                  <Badge tone={d.visual_sentiment}>visual: {d.visual_sentiment}</Badge>
                  <Badge tone={d.text_sentiment}>text: {d.text_sentiment}</Badge>
                  {d.ironic && <Badge tone="ironic">ironic</Badge>}
                </td>
                <td className="px-4 py-3 text-right font-mono">{d.mention_score.toFixed(2)}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">No mentions match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
