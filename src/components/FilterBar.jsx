import React from 'react'
const Select = ({value, onChange, options, label}) => (
  <label className="flex items-center gap-2 text-sm">
    <span className="text-slate-400">{label}</span>
    <select value={value} onChange={e=>onChange(e.target.value)}
      className="bg-panel border border-slate-700 rounded-md px-3 py-1.5 text-sm">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
)
export default function FilterBar({brand,setBrand,source,setSource,brands,sources}) {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-panel/60 border border-slate-800 rounded-xl px-4 py-3">
      <Select label="Brand" value={brand} onChange={setBrand} options={brands} />
      <Select label="Source" value={source} onChange={setSource} options={sources} />
    </div>
  )
}
