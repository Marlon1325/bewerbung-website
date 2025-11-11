import React, { InputHTMLAttributes, useId} from "react";
import Icon from "./Icon";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string,
  label?: string,
  error?: any
}

  const Input: React.FC<InputProps> = ({
    type,
    className="",
    id,
    icon,
    label,
    error,
    value,
    ...props
  }) => {
      
    const generated_ID = useId();
    id = id ?? generated_ID;


    
    return (
      <div className="my-2">
        {
          label ? <label htmlFor={id} className="block mb-2 text-sm font-medium text-[var(--A-50)]">{label}</label> : <></>
        }
        <div className="relative">
          { icon &&
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Icon type={icon} width={16} widths={16}/>
              </div>
          }
          <input
            id={id}
            type={type}
            value={value !== undefined ? String(value) : ""}
            className={
              className+
              " bg-[var(--A-700)] border text-sm rounded-lg block w-full p-2.5 "
               + (icon ? "ps-10":"")
               + (error ? 
                  " text-red-500 placeholder-red-500 border-red-500 focus:ring-red-500 focus:border-red-500"
                     :
                  " border-[var(--A-600)] text-[var(--A-50)] placeholder-[var(--A-400)] focus:ring-[var(--B-500)] focus:border-[var(--B-500)]"
                )

            }
            {...props}
          />

          { 
              error ?   <p className="mt-2 text-sm text-red-500">{error} </p> : <></>
          }
        </div>
        </div>
    );
  };
  
export default Input;



