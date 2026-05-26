import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
const COLORS = { positive:'#22c55e', neutral:'#64748b', negative:'#ef4444', not_applicable:'#334155' }
export default function SentimentChart({ data }) {
  const counts = data.reduce((acc, d) => {
    acc[d.visual_sentiment] = (acc[d.visual_sentiment]||0) + 1
    return acc
  }, {})
  const chart = Object.entries(counts).map(([name,value]) => ({ name, value }))
  return (
    <div className="bg-panel border border-slate-800 rounded-xl p-5 h-full">
      <h3 className="font-semibold mb-2">Visual sentiment</h3>
      <p className="text-xs text-slate-400 mb-4">Sentiment detected from images, not just text.</p>
      <div style={{width:'100%', height:240}}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chart} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
              {chart.map((e,i) => <Cell key={i} fill={COLORS[e.name] || '#6366f1'} />)}
            </Pie>
            <Tooltip contentStyle={{background:'#11172b', border:'1px solid #1e293b'}}/>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
