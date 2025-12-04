import { ReactNode, DetailedHTMLProps,HTMLAttributes } from "react"

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children?: ReactNode,
     className?: string
    }

const Card:React.FC<CardProps> = ({children, className="", ...props}) =>{
    return (
        <div className={className + " w-full p-6 space-y-8 sm:p-8 rounded-lg shadow-xl bg-[var(--A-800)]"} {...props}>
            {children}
        </div>
)}

export default Card;