import React, {ReactNode} from "react";


const Paragraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({children, className="", ...props}) =>(
        <p 
          className={className+" text-justify whitespace-normal min-h-2 break-words text-base text-[var(--A-700)] font-normal leading-relaxed my-2"}
          {...props}
        >
          {children}
        </p>
)

export default Paragraph;