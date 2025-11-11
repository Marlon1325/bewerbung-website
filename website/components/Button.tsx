
import React, {ReactNode, ButtonHTMLAttributes} from "react"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
    children?: ReactNode | string
    className?: string,
}
const Button:  React.FC<ButtonProps> = ({children="", className="", ...props})=>{
    return (
        <button
            {...props}
            className={className +" cursor-pointer mt-5 text-[var(--A-50)] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 bg-[var(--B-600)] hover:bg-[var(--B-700)] focus:ring-[var(--B-800)]"}
        >
            {children}
        </button>
    )
}

export default Button;
