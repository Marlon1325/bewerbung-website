"use client";

import React, {ReactNode, useState} from "react"

interface AccordionProps{
    title: ReactNode,
    children?: ReactNode,
    open?: boolean,
    className?: string
    titleClassName?: string,
    lineColor?:string | null
}



const Accordion: React.FC<AccordionProps> =({title, children, open=false,className="", titleClassName="text-[var(--A-500)]", lineColor="var(--A-700)"}) =>{

    const [isOpen, setIsOpen] = useState(open);
    return (
        
<div id="accordion-flush" className={"px-2 "+className}>
      <h2 id="accordion-flush-heading-1">
        <div
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b  text-[var(--A-400)] gap-3"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="accordion-flush-body-1"
          style={lineColor? {borderColor: lineColor} : {border: "none"}}
        >
          <div className={titleClassName}>{title}</div>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform ${isOpen ? '' : 'rotate-180'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </div>
      </h2>
        <div id="accordion-flush-body-1" className={"py-5 border-[var(--A-700)] " + (isOpen ? "": "hidden")}>
          {children}
        </div>
    </div>

    )
}


export default Accordion;