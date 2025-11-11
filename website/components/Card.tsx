import { ReactNode } from "react"

interface CardProps{
    children?: ReactNode,
     className?: string
    }

const Card:React.FC<CardProps> = ({children, className=""}) =>{
    return (
        <div className={className + " w-full p-6 space-y-8 sm:p-8 rounded-lg shadow-xl bg-[var(--A-800)]"}>
            {children}
        </div>
)}

export default Card;