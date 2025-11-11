import React,{ useId } from "react";


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    label?:string
}


const Select:React.FC<SelectProps> = ({children, label, id, ...props}) =>{
        const generated_ID = useId();
        const ID = id ?? generated_ID;
        return(
            <div>
            {
                label &&    <label htmlFor={ID} className="block mb-2 text-sm font-medium text-[var(--A-50)]">{label}</label>
            }
                <select {...props} id={ID} className="text-[var(--A-50)] border text-sm rounded-lg block w-full p-2.5 bg-[var(--A-700)] border-[var(--A-600)] placeholder-[var(--A-400)] text-bg-[--B-50] focus:ring-[var(--B-500)] focus:border-[var(--B-500)]">
                {children}
              </select>
            </div>)

    }

    export default Select;