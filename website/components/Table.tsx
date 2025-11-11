"use client";

import React, { ReactNode } from "react"

interface children{
    children: ReactNode | string,
    className?: string,
    
}


class Table extends React.Component<children>{
    render(){
    const {children} = this.props;
    return ( 
    <table className="w-full table-fixed text-left rtl:text-right text-[var(--A-50)] text-sm">
        {children}
    </table>
    )
}

static Head: React.FC<children> = ({children, className=""}) =>{
    return (
        <thead className={className+" text-xs uppercase bg-[var(--A-700)]"}>
            <tr>
                {children}
            </tr>

      </thead>
    )
}

static HEntry :React.FC<children> = ({children, className=""}) =>(
    <th scope="col" className={
        className +" px-4 py-3 whitespace-normal break-words"}
    >
        {children}
    </th>
)


static Body: React.FC<children> = ({children, className=""}) =>(
    <tbody className={className}>{children}</tbody>
)

static Row:  React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({children, className="", ...props}) =>(
    <tr className={className+" border-b bg-[var(--A-800)] border-[var(--A-700)]"} {...props}>
        {children}
    </tr>
)

static Entry: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({children, className="", ...props}) =>(
    <td className={
        className +" px-4 py-4 whitespace-normal break-words"
        
    }
    {...props}>
        {children}
    </td>
)
} 


export default Table;