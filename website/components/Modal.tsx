"use client";

import React, {ReactNode, useState} from "react"

interface AccordionProps{
    children?: ReactNode,
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}



const Modal: React.FC<AccordionProps> = ({ children = <></>, isOpen, setIsOpen }) => {


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00000033] bg-opacity-50">
      <div className="bg-[var(--A-800)] rounded-lg shadow-lg w-[90%] max-w-2xl">
        <div className="flex justify-between items-center px-4 py-2 text-xs uppercase bg-[var(--A-700)] text-[var(--A-400)]">
           
          <button // close
            onClick={()=>setIsOpen(false)}
            className="font-medium text-[var(--B-500)] hover:underline"
          >
            <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
            </svg>
          </button>
        </div>

        <div className="p-4 text-[var(--A-50)]">{children}</div>
      </div>
    </div>
  );
};


export default Modal;