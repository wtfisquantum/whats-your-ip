export default function FlatBadge({children, isActive}: {children: any, isActive: boolean}) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider 
            ${isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
            {children}
        </span>
    );
}