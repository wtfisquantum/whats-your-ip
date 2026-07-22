export default function DataRow({icon, label, value}: {icon: string, label:string, value: string}){
return (
<div className="flex items-start gap-4 py-4 border-b border-zinc-100 last:border-0 group">
<i className={`ph ${icon} text-2xl text-zinc-400 group-hover:text-zinc-700 transition-colors mt-0.5`}></i>
<div className="flex-1">
    <div className="text-xs font-bold text-zinc-00 uppercase tracking-[0.15em] mb-1.5">
        {label}
    </div>
    <div className="text-base font-medium text-zinc-900 break-words pr-4 leading-relaxed">
        {value || <span className="text-zinc-300 italic">N/A</span>}
    </div>
</div>
</div>
)
}