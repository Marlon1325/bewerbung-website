import React from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement>{
    as?: HeadingTag
}

const sizes: Record<HeadingTag, string> = {
  h1: "text-5xl",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
};

const Header: React.FC<HeaderProps> = ({as="h2", className="", children, ...props})=>(
    <div className="my-10">
        <header 
            className={`${className} ${sizes[as]} text-3xl w-[100%] text-[var(--A-700)] text-center p-3 font-bold mb-2`}
            {...props}
        >
                {children}
        </header>
        <hr className="text-[var(--A-700)]"/>
    </div>
)

export default Header;