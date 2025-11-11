

import { ReactNode } from "react";


interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: ReactNode | string
}

const Toggle: React.FC<ToggleProps> = ({className, label, ...props})=>{
    return (
    <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" {...props} />
        <div className="relative w-11 h-6 peer-focus:outline-none
                       peer-focus:ring-2 peer-focus:ring-[var(--B-800)]
                        rounded-full peer bg-[var(--A-700)] peer-checked:after:translate-x-full 
                        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[var(--A-50)] after:content-[''] 
                        after:absolute after:top-[2px] after:start-[2px] after:bg-[var(--A-50)] after:border-[var(--A-300)] after:border 
                        after:rounded-full after:h-5 after:w-5 after:transition-all border-[var(--A-600)] peer-checked:bg-[var(--B-600)]">
        </div>
        <span className="ms-3 text-sm font-medium text-[var(--A-300)]">{label}</span>
</label>
    )
}

export default Toggle;