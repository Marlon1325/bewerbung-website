"use client";

import React, { useState, useRef } from "react";


type PlacementType = "top" | "bottom" | "left" | "right";
type TriggerType = "hover" | "click";


interface PopoverProps {
placement?: PlacementType;
trigger: React.ReactNode;
title?: string;
children: React.ReactNode;
triggerType?: TriggerType;
}


export default function Popover ({ placement = "top", trigger, title, children, triggerType = "click"}:PopoverProps) {

    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement | null>(null);


    const triggerProps = triggerType === "hover" ? {
                onMouseEnter: () => setIsOpen(true),
                onMouseLeave: () => setIsOpen(false),
                }   : {
                onClick: () => setIsOpen((prev) => !prev),
                };


return (
<div className="inline-block relative" {...(triggerType === "hover" ? triggerProps : {})}>
        <div ref={triggerRef} className="cursor-pointer inline-block" {...(triggerType === "click" ? triggerProps : {})}>
        {trigger}
        </div>


    <div
        role="tooltip"
        className={`absolute z-50 text-sm transition-opacity duration-200 border rounded-lg shadow opacity-0 invisible text-[var(--A-400)] border-[var(--A-600)] bg-[var(--A-800)] ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } ${getPlacementClasses(placement)}`}
    >
        {title && (
        <div className="px-3 py-2 border-b rounded-t-lg border-[var(--A-600)] bg-[var(--A-700)]">
            <h3 className="font-semibold text-[var(--A-50)]">{title}</h3>
        </div>
        )}
        <div className="px-3 py-2">{children}</div>
        <Arrow placement={placement} />
    </div>
</div>
);
};



  const getPlacementClasses = (placement:PlacementType) => {
    switch (placement) {
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      case "top":
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };


function Arrow({ placement }: { placement: PlacementType }) {
  switch (placement) {
    case "top":
      return (
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--A-800)] border-l border-t border-[var(--A-600)] rotate-[225deg]"></div>
      );
    case "bottom":
      return (
        <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--A-800)] border-l border-t border-[var(--A-600)] rotate-45"></div>
      );
    case "left":
      return (
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--A-800)] border-l border-t border-[var(--A-600)] rotate-[135deg]"></div>
      );
    case "right":
      return (
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--A-800)] border-l border-t border-[var(--A-600)] -rotate-45"></div>
      );
    default:
      return null;
  }
}
