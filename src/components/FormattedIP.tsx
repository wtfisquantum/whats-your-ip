import React from "react";
export default function FormattedIP({ip} : {ip:string}){
    if(!ip) return null;
    const octets = ip.split('.');
    return (
        <div className="flex items-end gap-3 my-8">
            {octets.map((octet, index)=> (
                <React.Fragment key={index}>
                    <span className="text-4xl md:text-5xl font-medium text-zinc-900 tracking-light leading-none">
                        {octet}
                    </span>
                <div className="h-[3px] w-full bg-zinc-300 mt-3 rounded-full"></div>
               {index < 3 && (
                   <span className="text-3xl text-zinc-300 font-bold mb-3">.</span>
               )}
               </React.Fragment>
            ))}
        </div>
    )
}