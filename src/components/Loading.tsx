export default function Loading(){
    return (
        <div className="space-y-8 opacity-50">
                <div className="h-4 bg-zinc-200 rounded-sm w-1/3 animate-pulse"></div>
                <div className="h-12 bg-zinc-100 rounded-sm w-3/4 animate-pulse mb-10"></div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-5 py-2">
                    <div className="w-6 h-6 bg-zinc-100 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-3 mt-1">
                      <div className="h-2 bg-zinc-200 rounded-sm w-1/4 animate-pulse"></div>
                      <div className="h-3 bg-zinc-100 rounded-sm w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
             </div>
    )
}