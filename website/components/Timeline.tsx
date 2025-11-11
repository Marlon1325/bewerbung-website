import React, { ReactNode } from "react"

interface Children{
    children: ReactNode
}

interface Entry {
    title?: ReactNode,
    subtitle?: ReactNode | null,
    date?: ReactNode
}


function Timeline({children}:Children){
    return (
            <ol className="relative border-s border-[var(--A-200)]">
                 {children} 
            </ol>
        ) 
}



Timeline.Entry =  ({title, subtitle, date}:Entry)=>(
        <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-[var(--A-50)] bg-[var(--A-200)]"></div>
                <time className="mb-1 text-sm font-normal leading-none text-[var(--A-400)]">
                     {date}
                </time>
                <h3 className="text-lg font-semibold text-[var(--A-50)] w-full md:w-4/5 lg:w-full">{ title}</h3>
                 <div className="text-base font-normal text-[var(--A-400)]">{subtitle}</div>

        </li>
    )




export default Timeline;
