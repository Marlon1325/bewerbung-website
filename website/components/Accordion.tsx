"use client";

import React, {ReactNode, useState} from "react"

interface AccordionProps{
    title: string,
    children?: ReactNode,
    open?: boolean,
    className?: string
    titleClassName?: string
}



const Accordion: React.FC<AccordionProps> =({title, children, open=false,className="", titleClassName="text-[var(--A-500)]"}) =>{

    const [isOpen, setIsOpen] = useState(open);
    return (
        
<div id="accordion-flush" className={"px-2 "+className}>
      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-[var(--A-700)] text-[var(--A-400)] gap-3"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="accordion-flush-body-1"
        >
          <span className={titleClassName}>{title}</span>
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
        </button>
      </h2>
        <div id="accordion-flush-body-1 text-justify" className={"py-5 border-[var(--A-700)] " + (isOpen ? "": "hidden")}>
          {children}
        </div>
    </div>

    )
}


export default Accordion;