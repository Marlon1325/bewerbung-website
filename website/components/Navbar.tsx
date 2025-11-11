"use client";
import React, {ReactNode} from "react";


interface NavbarProps{
    title:string,
    href?: string
    children: ReactNode
}

interface NavbarLinkProps{
    title:string,
    href?: string,
    
}


interface DropdownProps{
    children: ReactNode, 
    title:string
}


function Dropdown( {children, title}: DropdownProps ){
    return (
        <li className="relative group">
                <a href="" className="flex items-center justify-between py-2 px-3 hover:bg-[var(--A-100)] md:hover:bg-transparent md:border-0 md:hover:text-[var(--B-700)]md:p-0 text-[var(--A-50)]">
                  {title}
                  <svg className="w-2.5 h-2.5 ml-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </a>
                <div className="absolute hidden group-hover:block shadow-md rounded-lg w-44 bg-[var(--A-700)]">
                  <ul className="py-2 text-sm text-[var(--A-400)]">
                    {children}
                  </ul>
                </div>
        </li>
    )
    
}

Dropdown.Link = ({title, href}: NavbarLinkProps)=>(
            <li><a href={href} className="block px-4 py-2 text-[var(--A-50)] hover:text-[var(--B-700)]">{title}</a></li>
        )





function Navbar({ title, children, href }:NavbarProps) {
    return (<nav className="bg-[var(--A-900)] fixed w-full z-20 top-0 start-0 border-b border-[var(--A-600)]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="text-[var(--A-50)] text-[22px] md:hidden lg:block">{href ? <a href={href}>{title}</a> : title }</div>
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label htmlFor="menu-toggle" className="md:hidden cursor-pointer p-2 rounded-lg focus:ring-2 text-[var(--A-400)] hover:bg-[var(--A-700)] focus:ring-[var(--A-600)]">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </label>
            <div className="hidden peer-checked:block w-full md:block md:w-auto">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-[var(--A-800)] bg-[var(--A-900)] border-[var(--A-700)]">
                {children}
            </ul>
            </div>
        </div>
        </nav>)
  }

Navbar.Link = ({title, href="/"}:NavbarLinkProps)=>(        
        <li>
            <a href={href} className="block py-2 px-3 hover:bg-[var(--A-100)] md:hover:bg-transparent md:border-0 md:p-0 text-[var(--A-50)] md:hover:text-[var(--B-700)]">
                {title}
            </a>
        </li>
    );

Navbar.Logout = ({title, href="/"}:NavbarLinkProps) =>(
    <li>
        <a href={href} className="block py-2 px-3 hover:bg-[var(--A-100)] md:hover:bg-transparent md:border-0 md:p-0 text-[var(--B-700)] md:hover:text-[var(--A-50)]">
            {title}
        </a>
    </li>
)
Navbar.Dropdown = Dropdown;

export default Navbar;